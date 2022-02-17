// import { ChainId } from '@kaco/sdkv2';
// import { chainKey } from 'config';
// import tokens, { chainId, DOT } from './tokens';

// import { ChainId } from '@kaco/sdkv2';
// import { chainKey } from 'config';
import { ChainId, CHAINKEY } from '@kaco/sdkv2';
import { chainKey } from 'config';
import tokens, { chainId, DOT } from './tokens';

import { FarmConfig } from './types';
export const KACO_LP_PID = 0;
export const KACO_BNB_LP_PID = 1;
// export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = DOT[chainId].symbol;

const farms: FarmConfig[] =
  chainKey === CHAINKEY.ASTR
    ? [
        // /**
        //  * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
        //  */
        {
          pid: 0,
          lpSymbol: 'Kac-WASTR kacoLP',
          lpAddresses: {
            [ChainId.ASTR_MAINNET]: '0x965F5127cBA2217F86d469f255c8ee08023AeCF5',
            [ChainId.ASTR_MAINNET]: '0x965F5127cBA2217F86d469f255c8ee08023AeCF5',
          },
          token: tokens[chainKey].kaco,
          quoteToken: tokens[chainKey].wastr,
        },
        {
          pid: 1,
          lpSymbol: 'USDC-WASTR kacoLP',
          lpAddresses: {
            [ChainId.ASTR_MAINNET]: '0x8F48e253bC729c9FaC448a7De9033AAff77ad221',
            [ChainId.ASTR_MAINNET]: '0x8F48e253bC729c9FaC448a7De9033AAff77ad221',
          },
          token: tokens[chainKey].usdc,
          quoteToken: tokens[chainKey].wastr,
        },
        // {
        //   pid: 1,
        //   lpSymbol: 'KAC-SDN LP',
        //   lpAddresses: {
        //     [ChainId.SDN_SDN_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
        //     [ChainId.SDN_MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
        //   },
        //   token: tokens[chainKey].kaco,
        //   quoteToken: main_tokens[chainKey].sdn,
        // },
      ]
    : chainKey === CHAINKEY.SDN
    ? [
        /**
         * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
         */
        {
          pid: KACO_LP_PID,
          lpSymbol: 'KAC',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
            [ChainId.SDN_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          token: tokens[chainKey].syrup,
          quoteToken: tokens[chainKey].wbnb,
        },
        {
          pid: 1,
          lpSymbol: 'KAC-SDN LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
            [ChainId.SDN_MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          },
          token: tokens[chainKey].kaco,
          quoteToken: tokens[chainKey].wbnb,
        },
        {
          pid: 2,
          lpSymbol: 'SDN-USDC LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
            [ChainId.SDN_MAINNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
          },
          token: tokens[chainKey].wbnb,
          quoteToken: tokens[chainKey].usdc,
        },
        {
          pid: 6,
          lpSymbol: 'SDN-JPYC LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
            [ChainId.SDN_MAINNET]: '0x1Ba530cf929ea5bc7f1Af241495C97331Ddb4f70',
          },
          token: tokens[chainKey].jpyc,
          quoteToken: tokens[chainKey].wbnb,
        },
        {
          pid: 3,
          lpSymbol: 'ETH-SDN LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
            [ChainId.SDN_MAINNET]: '0xeb2C6d3F1bbe9DA50A0272E80fAA89354630DE88',
          },
          token: tokens[chainKey].eth,
          quoteToken: tokens[chainKey].wbnb,
        },
        {
          pid: 4,
          lpSymbol: 'ETH-USDC LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
            [ChainId.SDN_MAINNET]: '0xcfb0e95a3A68E3574C73a3C6985D56B7c03b6348',
          },
          token: tokens[chainKey].eth,
          quoteToken: tokens[chainKey].usdc,
        },
        {
          pid: 7,
          lpSymbol: 'JPYC-USDC LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0xe2c19eb0f91c80275cc254f90ed0f18f26650ec5',
            [ChainId.SDN_MAINNET]: '0xe2c19eb0f91c80275cc254f90ed0f18f26650ec5',
          },
          token: tokens[chainKey].jpyc,
          quoteToken: tokens[chainKey].usdc,
        },
        {
          pid: 5,
          lpSymbol: 'BUSD-USDC LP',
          lpAddresses: {
            [ChainId.SDN_TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
            [ChainId.SDN_MAINNET]: '0x8644e9AC84273cA0609F2A2B09b2ED2A5aD2e9DD',
          },
          token: tokens[chainKey].busd,
          quoteToken: tokens[chainKey].usdc,
        },
      ]
    : [];

export default farms;
