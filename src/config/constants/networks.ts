import { ChainId } from '@kaco/sdkv2';

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: 'https://bsc-dataseed1.defibit.io',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',

  [ChainId.SDN_MAINNET]: 'https://rpc.shiden.astar.network:8545',
  [ChainId.SDN_TESTNET]: 'https://rpc.shiden.astar.network:8545',

  [ChainId.ASTR_MAINNET]: 'https://rpc.astar.network:8545',
  [ChainId.ASTR_TESTNET]: 'https://rpc.astar.network:8545',
};

export default NETWORK_URLS;
