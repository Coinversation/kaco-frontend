import factoryAbi from 'config/abi/factory.json';
import { getAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { FACTORY_ADDRESS } from 'config/constants';

const fetchPairsAddress = async (length: number): Promise<string[]> => {
  const factory = getAddress(FACTORY_ADDRESS);
  const calls = new Array(length).fill(1).map((_, index) => ({
    address: factory,
    name: 'allPairs',
    params: [index],
  }));

  const addresses = (await multicall(factoryAbi, calls)) as string[][];

  return addresses.map((t) => t[0]);
};

export default fetchPairsAddress;
