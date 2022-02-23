import tokens, { ChainId } from './tokens';
import { PoolConfig, PoolCategory, PoolFarmConfig, FarmConfig } from './types';

interface IPools {
  farmList: PoolFarmConfig[];
  specialPool: PoolConfig[];
  poolList: PoolConfig[];
}
const KAC_SDN_LP: FarmConfig = {
  pid: 2,
  lpSymbol: 'SDN-USDC LP',
  lpAddresses: {
    [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
    [ChainId.MAINNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
  },
  token: tokens.wbnb,
  quoteToken: tokens.usdc,
};
const KAC_SDN_LP02: FarmConfig = {
  pid: 6,
  lpSymbol: 'SDN-JPYC LP',
  lpAddresses: {
    [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
    [ChainId.MAINNET]: '0x1Ba530cf929ea5bc7f1Af241495C97331Ddb4f70',
  },
  token: tokens.jpyc,
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
