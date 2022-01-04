import { Token } from '@kaco/sdk';

export enum ChainId {
  MAINNET = 336,
  TESTNET = 81,
}

export const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const tokens = {
  sdn: {
    symbol: 'SDN',
    projectLink: 'https://shiden.astar.network/',
  },
  bnb: {
    symbol: 'BNB',
    projectLink: 'https://www.binance.com/',
  },
  dot: {
    symbol: 'DOT',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      [ChainId.MAINNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kkac: {
    symbol: 'KKAC',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kalpaca: {
    symbol: 'KALPACA',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kcake: {
    symbol: 'SYRUP',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  safemoon: {
    symbol: 'safemoon',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  bondly: {
    symbol: 'bondly',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  alpaca: {
    symbol: 'ALPACA',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  ksm: {
    symbol: 'KSM',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kalm: {
    symbol: 'KALM',
    address: {
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kaco: {
    symbol: 'KAC',
    address: {
      [ChainId.MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://kaco.finance/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      [ChainId.MAINNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 6,
    projectLink: 'https://www.centre.io/usdc',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      [ChainId.MAINNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      [ChainId.MAINNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.makerdao.com/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      [ChainId.MAINNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  wbtc: {
    symbol: 'WBTC',
    address: {
      [ChainId.MAINNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://bitcoin.org/',
  },
  wbnb: {
    symbol: 'WSDN',
    address: {
      [ChainId.MAINNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.TESTNET]: '0x321F318e7C276c93Cf3094fd3a9d7c4362fd19FB',
    },
    decimals: 18,
    projectLink: 'https://shiden.astar.network/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      [ChainId.MAINNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
  kwik: {
    symbol: 'KWIK',
    address: {
      [ChainId.MAINNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  pkex: {
    symbol: 'PKEX',
    address: {
      [ChainId.MAINNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  jpyc: {
    symbol: 'JPYC',
    address: {
      [ChainId.MAINNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://jpyc.jp/',
  },
};

export const WBNB = new Token(chainId, tokens.wbnb.address[chainId], 18, 'WSDN', 'Wrapped SDN');

export const Kaco: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    18,
    'KAC',
    'Kaco Token',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    18,
    'KAC',
    'Kaco Token',
  ),
};

export const BUSD: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
    18,
    'BUSD',
    'Binance USD',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
    18,
    'BUSD',
    'Binance USD',
  ),
};

export const DOT: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    18,
    'DOT',
    'DOT Token',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'DOT',
    'FAKE DOT',
  ),
};

export const KSM: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x2aa69e8d25c045b659787bc1f03ce47a388db6e8',
    18,
    'KSM',
    'KSM Token',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'KSM',
    'FAKE KSM',
  ),
};

export const DAI = new Token(
  ChainId.MAINNET as any,
  '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
  18,
  'DAI',
  'Dai Stablecoin',
);
export const USDT = new Token(
  ChainId.MAINNET as any,
  '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
  18,
  'USDT',
  'Tether USD',
);

export const BTCB: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTCB',
    'Binance BTC',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0x6ce8da28e2f864420840cf74474eff5fd80e65b8',
    18,
    'BTCB',
    'Binance BTC',
  ),
};

export const UST = new Token(
  ChainId.MAINNET as any,
  '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  18,
  'UST',
  'Wrapped UST Token',
);

export const ETH = new Token(
  ChainId.MAINNET as any,
  '0x765277eebeca2e31912c9946eae1021199b39c61',
  18,
  'ETH',
  'Binance-Peg Ethereum Token',
);
export const USDC = new Token(
  ChainId.MAINNET as any,
  '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
  6,
  'USDC',
  'USD Coin',
);

export const JPYC = new Token(ChainId.MAINNET as any, '0x735abe48e8782948a37c7765ecb76b98cde97b0f', 6, 'JPYC', 'JPYC');

export default tokens;
