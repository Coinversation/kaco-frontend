import tokens, { ChainId } from './tokens';
import { PoolConfig, PoolCategory } from './types';

const pools: PoolConfig[] = [
  {
    sousId: 1,
    stakingToken: tokens.kaco,
    earningToken: tokens.KacSdn,
    contractAddress: {
      [ChainId.TESTNET]: '0xffe8a2d1b7c69d69bd93880cA55b0e8222bE789a',
      [ChainId.MAINNET]: '0xffe8a2d1b7c69d69bd93880cA55b0e8222bE789a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.02',
    sortOrder: 1,
    isFinished: false,
  },
];

export default pools;
