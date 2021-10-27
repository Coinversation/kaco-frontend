import tokens, { ChainId } from './tokens';
import { FarmConfig } from './types';
export const KACO_LP_PID = 3;
export const KACO_BNB_LP_PID = 1;
export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = tokens.dot.symbol;

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'KAC-SDN LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
      [ChainId.MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
    },
    token: tokens.kaco,
    quoteToken: tokens.sdn,
  },
  // {
  //   pid: KACO_LP_PID,
  //   lpSymbol: 'KAC',
  //   lpAddresses: {
  //     [ChainId.TESTNET]: '0x0bA819e30016Cf682C7795b44859148C65e62292',
  //     [ChainId.MAINNET]: '0xf96429A7aE52dA7d07E60BE95A3ece8B042016fB',
  //   },
  //   token: tokens.syrup,
  //   quoteToken: tokens.dot,
  // },
  // {
  //   pid: KACO_BNB_LP_PID,
  //   lpSymbol: 'KAC-DOT LP',
  //   lpAddresses: {
  //     [ChainId.TESTNET]: '0x4d6F0B03AEbFa48E185Ec4d6f7118994F0EedCD0',
  //     [ChainId.MAINNET]: '0x315f25cea80ac6c039b86e79ffc46ae6b2e30922',
  //   },
  //   token: tokens.kaco,
  //   quoteToken: tokens.dot,
  // },
  // {
  //   pid: BUSD_BNB_LP_PID,
  //   lpSymbol: 'DOT-BUSD LP',
  //   lpAddresses: {
  //     [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
  //     [ChainId.MAINNET]: '0xa0f19146914e3C160897059ef8695BcD9fcf98b2',
  //   },
  //   token: tokens.dot,
  //   quoteToken: tokens.busd,
  // },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
];

export default farms;
