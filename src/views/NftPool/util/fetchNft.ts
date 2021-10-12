import { NFT_PAIRS } from 'config/constants/nft';
import { NFT } from '../components/GoodsInPool';
import multicall from 'utils/multicall';

interface BounceItem {
  contract_addr: string;
  contract_name: string;
  token_type: number;
  token_id: number;
  owner_addr: string;
  balance: number;
  token_uri: string;
  name: string;
  description: string;
  image: string;
}

interface BounceData {
  nfts1155: BounceItem[];
  nfts721: BounceItem[];
  total1155: number;
  total721: number;
}

export async function fetchNfts(nftAddress: string, pairAddress: string) {
  const items = await fetchAllTokens(pairAddress);
  const nfts: NFT[] = await filterNft(items, nftAddress);

  return nfts;
}

export async function fetchAllTokens(account: string) {
  const apiUrl = `https://nftview.bounce.finance/v2/bsc/nft?user_address=${account}`;

  const data = await fetch(apiUrl);

  const rawData: {
    code: number;
    data: BounceData;
    msg: string;
  } = await data.json();

  if (!rawData.data || rawData.msg !== 'ok') {
    return;
  }

  rawData.data.nfts1155.push(...rawData.data.nfts721);

  return rawData.data.nfts1155;
}

export async function filterNft(items: BounceItem[], nftAddress: string) {
  const flawItems = items.filter(
    (token) =>
      token.contract_addr.toLocaleLowerCase() === nftAddress.toLocaleLowerCase() &&
      token.balance > 0 &&
      (!token.image || token.image.length === 0),
  );
  console.log('flawItems: ', flawItems);
  const promises = flawItems.map(async (item) => {
    const temp = fetchNftInfo(nftAddress, item.token_id, item.owner_addr);
    console.log('fetch result: ', temp);
    return temp;
  });
  const results = await Promise.all(promises);
  console.log('results: ', results);

  results.push(
    ...items
      .filter(
        (token) =>
          token.contract_addr.toLocaleLowerCase() === nftAddress.toLocaleLowerCase() &&
          token.balance > 0 &&
          token.image,
      )
      // .reduce((nfts, curr) => nfts.concat(curr.nft_data), [])
      .map((nft) => ({
        id: nft.token_id,
        balance: nft.balance,
        uri: nft.token_uri,
        image: nft.image,
        name: nft.name,
      })),
  );
  return results;
}

export async function fetchNftInfo(nftAddress: string, id: number, owner: string): Promise<NFT | undefined> {
  const pairConfig = NFT_PAIRS.find((pair) => pair.nftAddress.toLowerCase() === nftAddress.toLowerCase());

  if ([0, 2].findIndex((pid) => pairConfig.pid === pid) > -1) {
    return await fetchPid0(pairConfig.nftAddress, id, owner, pairConfig.nftAbi);
  } else {
    return await fetchPid1(pairConfig.nftAddress, id, owner, pairConfig.nftAbi);
  }
}

interface NftMeta {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  background_color: string;
  external_link: string;
  owner: string;
}

// kaco
async function fetchPid0(nftAddress: string, id: number, owner: string, abi: any): Promise<NFT | undefined> {
  const calls = [
    { address: nftAddress, name: 'balanceOf', params: [owner, id] },
    { address: nftAddress, name: 'uri', params: [id] },
  ];

  const [[balance], [uri]] = await multicall(abi, calls);

  try {
    const res = await fetch(uri);
    const info: NftMeta = await res.json();

    if (!res.ok || !info) {
      return;
    }

    return {
      id,
      balance: balance.toNumber(),
      uri,
      image: info.image,
      name: info.name,
    };
  } catch (e) {
    console.log('nft metadata error', e);
  }
}

// kaco
async function fetchPid1(nftAddress: string, id: number, owner: string, abi: any): Promise<NFT | undefined> {
  const calls = [
    { address: nftAddress, name: 'balanceOf', params: [owner] },
    { address: nftAddress, name: 'tokenURI', params: [id] },
  ];

  const [[balance], [uri]] = await multicall(abi, calls);

  const u = toUri(uri);

  try {
    const res = await fetch(u);
    const info: NftMeta = await res.json();

    if (!res.ok || !info) {
      return;
    }
    return {
      id,
      balance: balance.toNumber(),
      uri: u,
      image: toUri(info.image),
      name: info.name,
    };
  } catch (e) {
    console.log('fetch nft metadata error', e);
  }
}

// ipfs://QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/dollop.png
function toUri(uri: string) {
  return 'https://ipfs.io/ipfs/' + uri.slice('ipfs://'.length);
}
