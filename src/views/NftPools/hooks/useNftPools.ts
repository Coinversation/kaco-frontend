import { useEffect, useState } from 'react';
import type { BigNumber } from '@ethersproject/bignumber';
import NFT100FactoryAbi from 'config/abi/NFT100Factory.json';
import { NFT_FACTORY, NFT_TYPE, NFT_PAIRS } from 'config/constants/nft';
import multicall from 'utils/multicall';
import { useContract } from 'hooks/useContract';
import _ from 'lodash';
import { chainId } from 'config/constants/tokens';

export interface NftPair {
  pairAddress: string;
  nftAddress: string;
  type: NFT_TYPE;
  name: string;
  symbol: string;
  supply: number;
}

const fetchNftPairs = async (count: number): Promise<NftPair[]> => {
  const calls = new Array(count).fill(true).map((_, index) => ({
    address: NFT_FACTORY[chainId],
    name: 'getPairByIndex',
    params: [index],
  }));

  const infos = (await multicall(NFT100FactoryAbi, calls, 'aooeeq')) as [
    string,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
  ][];

  return infos.map((info) => ({
    pairAddress: info[0],
    nftAddress: info[1],
    type: info[2].toNumber(),
    name: info[3],
    symbol: info[4],
    supply: info[5].toNumber(),
  }));
};

const fetchNftPair = async (index: number): Promise<NftPair> => {
  const calls = [
    {
      address: NFT_FACTORY[chainId],
      name: 'getPairByIndex',
      params: [index],
    },
  ];

  const [info] = (await multicall(NFT100FactoryAbi, calls, 'hhhsssee')) as [
    string,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
  ][];

  return {
    pairAddress: info[0],
    nftAddress: info[1],
    type: info[2].toNumber(),
    name: info[3],
    symbol: info[4],
    supply: info[5].toNumber(),
  };
};

export const useNftPairs = () => {
  const [pairs, setPairs] = useState<NftPair[]>([]);
  const contract = useContract(NFT_FACTORY[chainId], NFT100FactoryAbi);

  useEffect(() => {
    contract.counter().then(async (counter) => {
      let pairs = await fetchNftPairs(counter.toNumber());

      pairs = pairs.filter((pair) =>
        NFT_PAIRS.find((_pair) => _pair.address.toLowerCase() === pair.pairAddress.toLowerCase()),
      );

      setPairs((oldPairs) => (_.isEqual(oldPairs, pairs) ? oldPairs : pairs));
    }, console.error);
  }, [contract]);

  return pairs;
};

export const useNftPair = (index: number): NftPair => {
  const [pair, setPair] = useState<NftPair>();

  useEffect(() => {
    fetchNftPair(index).then(setPair);
  }, [index]);

  return pair;
};
