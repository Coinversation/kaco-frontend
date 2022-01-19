import { ChainId } from '@kaco/sdk';
import PancakeNftAbi from '../abi/pancake-nft.json';
import KacoNftAbi from '../abi/kaco-nft.json';
import KacoLogo from '../../components/svg/kaco-nft.png';
import PancakeLogo from '../../components/svg/pancake-nft.png';
import AlpacaLogo from '../../components/svg/alpaca-nft.png';

export enum NFT_TYPE {
  NFT721 = 721,
  NFT1155 = 1155,
}

export interface NftPairConfig {
  address: string;
  nftAddress: string;
  name: string;
  symbol: string;
  pid: number;
  type: NFT_TYPE;
  nftAbi: any;
  logo: string;
}

export const NFT_PAIRS: NftPairConfig[] = [
  {
    address: '0x65aDc52BfD0E3d9Df80Be6E36F330E757862e2Bd',
    nftAddress: '0x46F36F9FE211600417D9d24c014a154052ABC960',
    name: 'KACO NFT',
    symbol: 'KKACO',
    pid: 0,
    type: NFT_TYPE.NFT1155,
    nftAbi: KacoNftAbi,
    logo: KacoLogo,
  },
  {
    address: '0xa70c4580F1e00C1d7A9D0280832c0D513a6D530F',
    nftAddress: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
    name: 'PANCAKE NFT',
    symbol: 'KCAKE',
    pid: 1,
    type: NFT_TYPE.NFT721,
    nftAbi: PancakeNftAbi,
    logo: PancakeLogo,
  },
  {
    address: '0xBd6D17123Ec731adFf1cE2F9f7Af1aBC26E5EBfd',
    nftAddress: '0xe85d7b8f4c0c13806e158a1c9d7dcb33140cdc46',
    name: 'ALPACA NFT',
    symbol: 'KALPACA',
    pid: 2,
    type: NFT_TYPE.NFT1155,
    nftAbi: KacoNftAbi,
    logo: AlpacaLogo,
  },
];

export const BLOCK_INTERVAL = 3;

// export const NFT_PAIRS: NftPairConfig[] = [
//   {
//     address: '0xb1a91CDF684f321419A6D7F3AFEaDde984dB60AC',
//     nftAddress: '0x5bbA2c99ff918f030D316ea4fD77EC166DDe0aFf',
//     name: 'ALPACA NFT100',
//     symbol: ' K-ALPACA',
//     pid: 0,
//     type: NFT_TYPE.NFT1155,
//   },
//   {
//     address: '0x2839956D80fbB701Aaf718BB0Eab80561595Da71',
//     nftAddress: '0xDD7698b02213eb713C183E03e82fF1A66AF6c17E',
//     name: 'KACO NFT100',
//     symbol: 'K-KACO',
//     pid: 1,
//     type: NFT_TYPE.NFT721,
//   },
// ];

export const NFT_FACTORY = {
  [ChainId.MAINNET]: '0x7bce4113838bC9609A0A96149c61B0ae811421b2',
  [ChainId.TESTNET]: '0x7C3343Ddb7Fd5cD2C8A421C5C22C44c396AD50B2',
};
