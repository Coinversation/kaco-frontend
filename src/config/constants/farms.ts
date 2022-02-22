import { BIG_ZERO } from 'utils/bigNumber';
import tokens, { ChainId } from './tokens';
import { FarmConfig } from './types';
export const KACO_LP_PID = 0;
export const KACO_BNB_LP_PID = 1;
// export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = tokens.dot.symbol;

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: KACO_LP_PID,
    lpSymbol: 'KAC',
    lpAddresses: {
      [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
      [ChainId.MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'KAC-SDN LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
      [ChainId.MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
    },
    token: tokens.kaco,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'SDN-USDC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
    },
    token: tokens.wbnb,
    quoteToken: tokens.usdc,
  },
  {
    pid: 6,
    lpSymbol: 'SDN-JPYC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0x1Ba530cf929ea5bc7f1Af241495C97331Ddb4f70',
    },
    token: tokens.jpyc,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'ETH-SDN LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0xeb2C6d3F1bbe9DA50A0272E80fAA89354630DE88',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0xcfb0e95a3A68E3574C73a3C6985D56B7c03b6348',
    },
    token: tokens.eth,
    quoteToken: tokens.usdc,
  },
  {
    pid: 7,
    lpSymbol: 'JPYC-USDC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0xe2c19eb0f91c80275cc254f90ed0f18f26650ec5',
      [ChainId.MAINNET]: '0xe2c19eb0f91c80275cc254f90ed0f18f26650ec5',
    },
    token: tokens.jpyc,
    quoteToken: tokens.usdc,
  },
  {
    pid: 5,
    lpSymbol: 'BUSD-USDC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0x8644e9AC84273cA0609F2A2B09b2ED2A5aD2e9DD',
    },
    token: tokens.busd,
    quoteToken: tokens.usdc,
  },
];

export default farms;
