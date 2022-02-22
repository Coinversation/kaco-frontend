import tokens, { ChainId } from './tokens';
import { PoolConfig, PoolCategory, PoolFarmConfig, FarmConfig } from './types';

interface IPools {
  farmList: PoolFarmConfig[];
  specialPool: PoolConfig[];
  poolList: PoolConfig[];
}
const KAC_SDN_LP: FarmConfig = {
  pid: 6,
  lpSymbol: 'KAC-SDN LP',
  lpAddresses: {
    [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
    [ChainId.MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
  },
  token: tokens.kaco,
  quoteToken: tokens.wbnb,
};
const KAC_SDN_LP02: FarmConfig = {
  pid: 9,
  lpSymbol: 'KAC-SDN LP',
  lpAddresses: {
    [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
    [ChainId.MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
  },
  token: tokens.kaco,
  quoteToken: tokens.wbnb,
};
const pools: IPools = {
  // at farm contract but single Lp
  farmList: [
    {
      ...KAC_SDN_LP,
      sousId: KAC_SDN_LP.pid,
      stakingToken: KAC_SDN_LP.token,
      earningToken: KAC_SDN_LP.quoteToken,
      contractAddress: {
        [ChainId.TESTNET]: KAC_SDN_LP.quoteToken[ChainId.TESTNET],
        [ChainId.MAINNET]: KAC_SDN_LP.quoteToken[ChainId.MAINNET],
      },
      poolCategory: PoolCategory.AUTO,
      harvest: true,
      tokenPerBlock: '0.02',
      sortOrder: 1,
      isFinished: false,
    },
    {
      ...KAC_SDN_LP02,
      sousId: KAC_SDN_LP02.pid,
      stakingToken: KAC_SDN_LP02.token,
      earningToken: KAC_SDN_LP02.quoteToken,
      contractAddress: {
        [ChainId.TESTNET]: KAC_SDN_LP02.quoteToken[ChainId.TESTNET],
        [ChainId.MAINNET]: KAC_SDN_LP02.quoteToken[ChainId.MAINNET],
      },
      poolCategory: PoolCategory.AUTO,
      harvest: true,
      tokenPerBlock: '0.02',
      sortOrder: 1,
      isFinished: false,
    },
  ],
  // special Pool
  specialPool: [],
  poolList: [
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
    {
      sousId: 2,
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
  ],
};

export default pools;
