import { ChainId, Token } from '@kaco/sdk';

export const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const tokens = {
  sdn: {
    symbol: 'SDN',
    name: 'SDN Token',
    projectLink: 'https://shiden.astar.network/',
  },
  bnb: {
    symbol: 'BNB',
    name: 'BNB Token',
    projectLink: 'https://www.binance.com/',
  },
  dot: {
    symbol: 'DOT',
    name: 'DOT Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  syrup: {
    symbol: 'SYRUP',
    name: 'SYRUP Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.SDN_TESTNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.ASTR_MAINNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.ASTR_TESTNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.MAINNET]: '0x808764026aDddb9E7dFAAEA846977cCe6425D593',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kkac: {
    symbol: 'KKAC',
    name: 'KKAC Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kalpaca: {
    symbol: 'KALPACA',
    name: 'KALPACA Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kcake: {
    symbol: 'SYRUP',
    name: 'SYRUP Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  cake: {
    symbol: 'CAKE',
    name: 'CAKE Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  safemoon: {
    symbol: 'safemoon',
    name: 'safemoon Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  bondly: {
    symbol: 'bondly',
    name: 'bondly Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  alpaca: {
    symbol: 'ALPACA',
    name: 'ALPACA Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  ksm: {
    symbol: 'KSM',
    name: 'KSM Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kalm: {
    symbol: 'KALM',
    name: 'KALM Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.SDN_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ASTR_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.MAINNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  kaco: {
    symbol: 'KAC',
    name: 'KAC Token',
    address: {
      [ChainId.SDN_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.SDN_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.ASTR_MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.ASTR_TESTNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.MAINNET]: '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://kaco.finance/',
  },
  usdc: {
    symbol: 'USDC',
    name: 'USDC Token',
    address: {
      [ChainId.SDN_MAINNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.SDN_TESTNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.ASTR_MAINNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.ASTR_TESTNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.MAINNET]: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 6,
    projectLink: 'https://www.centre.io/usdc',
  },
  usdt: {
    symbol: 'USDT',
    name: 'USDT Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.SDN_TESTNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.ASTR_MAINNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.ASTR_TESTNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.MAINNET]: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  dai: {
    symbol: 'DAI',
    name: 'DAI Token',
    address: {
      [ChainId.SDN_MAINNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.SDN_TESTNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.ASTR_MAINNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.ASTR_TESTNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.MAINNET]: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.makerdao.com/',
  },
  eth: {
    symbol: 'ETH',
    name: 'ETH Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.SDN_TESTNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.ASTR_MAINNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.ASTR_TESTNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.MAINNET]: '0x765277eebeca2e31912c9946eae1021199b39c61',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  wbtc: {
    symbol: 'WBTC',
    name: 'WBTC Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.SDN_TESTNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.ASTR_MAINNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.ASTR_TESTNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.MAINNET]: '0x922d641a426dcffaef11680e5358f34d97d112e1',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://bitcoin.org/',
  },
  wbnb: {
    symbol: 'WSDN',
    name: 'WSDN Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.SDN_TESTNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.ASTR_MAINNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.ASTR_TESTNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.MAINNET]: '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
      [ChainId.TESTNET]: '0x321F318e7C276c93Cf3094fd3a9d7c4362fd19FB',
    },
    decimals: 18,
    projectLink: 'https://shiden.astar.network/',
  },
  busd: {
    symbol: 'BUSD',
    name: 'BUSD Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.SDN_TESTNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.ASTR_MAINNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.ASTR_TESTNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.MAINNET]: '0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
  kwik: {
    symbol: 'KWIK',
    name: 'KWIK Token',
    address: {
      [ChainId.SDN_MAINNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.SDN_TESTNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.ASTR_MAINNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.ASTR_TESTNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.MAINNET]: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  pkex: {
    symbol: 'PKEX',
    name: 'PKEX Token',
    address: {
      [ChainId.SDN_MAINNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.SDN_TESTNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.ASTR_MAINNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.ASTR_TESTNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.MAINNET]: '0xdc42728b0ea910349ed3c6e1c9dc06b5fb591f98',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://www.kaco.finance/',
  },
  jpyc: {
    symbol: 'JPYC',
    name: 'JPYC Token',
    address: {
      [ChainId.SDN_MAINNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.SDN_TESTNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.ASTR_MAINNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.ASTR_TESTNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.MAINNET]: '0x735abe48e8782948a37c7765ecb76b98cde97b0f',
      [ChainId.TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    },
    decimals: 18,
    projectLink: 'https://jpyc.jp/',
  },
};

export const WBNB = new Token(chainId, tokens.wbnb.address[chainId], 18, 'WBNB', 'Wrapped BNB');

export const Kaco: Token = new Token(chainId, tokens.kaco.address[chainId], 18, tokens.kaco.symbol, tokens.kaco.name);

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
export const ALPACA: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F',
    18,
    'ALPACA',
    'Alpaca',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0x8F0528cE5eF7B51152A59745bEfDD91D97091d2F',
    18,
    'ALPACA',
    'Alpaca',
  ),
};
export default tokens;

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'CAKE',
    'PancakeSwap Token',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
    18,
    'CAKE',
    'PancakeSwap Token',
  ),
};
