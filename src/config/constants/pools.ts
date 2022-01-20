import { ChainId } from '@kaco/sdk';
import { main_tokens } from './tokens';
import { PoolConfig, PoolCategory } from './types';

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: main_tokens.kaco,
    earningToken: main_tokens.kaco,
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.ASTR_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',

      [ChainId.SDN_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.SDN_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',

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
