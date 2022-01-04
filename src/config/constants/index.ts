import { JSBI, Percent, Token, WETH } from '@kaco/sdk';
import { BUSD, DAI, USDT, BTCB, Kaco, CAKE, WBNB, ALPACA, ETH, DOT, KSM, ChainId } from './tokens';

export const ROUTER_ADDRESS = '0xB44A8AEb4805a5404a8d20A1294a61C95Ae6F256';

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [
    WETH[ChainId.MAINNET],
    Kaco[ChainId.MAINNET],
    DOT[ChainId.MAINNET],
    KSM[ChainId.MAINNET],
    BUSD[ChainId.MAINNET],
    USDT,
    ALPACA[ChainId.MAINNET],
    // BTCB[ChainId.MAINNET],
    // UST,
    ETH,
    // USDC,
  ],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET], Kaco[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
};

/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
const Pancake = new Token(
  ChainId.MAINNET,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'Cake',
  'PancakeSwap Token',
);
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    // '0xBd6D17123Ec731adFf1cE2F9f7Af1aBC26E5EBfd': [ALPACA],
    // KCake
    '0xa70c4580F1e00C1d7A9D0280832c0D513a6D530F': [Pancake],
  },
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
};

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MAINNET]: [BUSD[ChainId.MAINNET], Kaco[ChainId.MAINNET], BTCB[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET], Kaco[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: [
    // WETH[ChainId.MAINNET],
    // DAI,
    ALPACA[ChainId.MAINNET],
    CAKE[ChainId.MAINNET],
    Kaco[ChainId.MAINNET],
    DOT[ChainId.MAINNET],
    BUSD[ChainId.MAINNET],
    USDT,
  ],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET], Kaco[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
};

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [Kaco[ChainId.MAINNET], WBNB],
    [BUSD[ChainId.MAINNET], USDT],
    [DAI, USDT],
  ],
};

export const NetworkContextName = 'NETWORK';

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50;
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

export const BIG_INT_ZERO = JSBI.BigInt(0);

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
export const BIPS_BASE = JSBI.BigInt(10000);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000));

export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
];
export const FACTORY_ADDRESS = {
  [ChainId.TESTNET]: '0xd95D56A112D62DFc1e6F9bC2432d12b8e1B25d60',
  [ChainId.MAINNET]: '0xa5e48a6E56e164907263e901B98D9b11CCB46C47',
};

export { default as farmsConfig } from './farms';
export { default as poolsConfig } from './pools';
export { default as ifosConfig } from './ifo';
