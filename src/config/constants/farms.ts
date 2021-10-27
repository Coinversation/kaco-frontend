import tokens, { ChainId } from './tokens';
import { FarmConfig } from './types';
export const KACO_LP_PID = 0;
export const KACO_BNB_LP_PID = 1;
export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = tokens.sdn.symbol;

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
    quoteToken: tokens.sdn,
  },
  {
    pid: KACO_BNB_LP_PID,
    lpSymbol: 'KAC-SDN LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x4d6F0B03AEbFa48E185Ec4d6f7118994F0EedCD0',
      [ChainId.MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
    },
    token: tokens.kaco,
    quoteToken: tokens.sdn,
  },
  {
    pid: BUSD_BNB_LP_PID,
    lpSymbol: 'SDN-USDC LP',
    lpAddresses: {
      [ChainId.TESTNET]: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      [ChainId.MAINNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
    },
    token: tokens.sdn,
    quoteToken: tokens.usdc,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
];

export default farms;
