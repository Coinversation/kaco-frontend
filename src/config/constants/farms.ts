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
          pid: 1,
          lpSymbol: 'Kac-WASTR kacoLP',
          lpAddresses: {
            [ChainId.ASTR_MAINNET]: '0x965F5127cBA2217F86d469f255c8ee08023AeCF5',
            [ChainId.ASTR_MAINNET]: '0x965F5127cBA2217F86d469f255c8ee08023AeCF5',
          },
          token: tokens[chainKey].kaco,
          quoteToken: tokens[chainKey].wastr,
        },
        {
          pid: 2,
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
        //     [ChainId.SDN_TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
        //     [ChainId.SDN_MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
        //   },
        //   token: tokens[chainKey].kaco,
        //   quoteToken: main_tokens.sdn,
        // },
      ]
    : [];

export default farms;
