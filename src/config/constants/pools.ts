import { ChainId } from '@kaco/sdk';
import tokens from './tokens';
import { PoolConfig, PoolCategory } from './types';

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.kaco,
    earningToken: tokens.kaco,
    contractAddress: {
      [ChainId.BSC_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.BSC_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.02',
    sortOrder: 1,
    isFinished: false,
  },
];

export default pools;
