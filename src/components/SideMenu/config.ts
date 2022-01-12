import IconMarkets from './imgs/iconMarkets';
import IconMyWallet from './imgs/iconMyWallet';

export const chainKey = 'BSC';

export interface IMenu {
  text: string;
  link?: string;
  collapsed?: boolean;
  children?: IMenuDetail[] | undefined;
}
export interface IMenuDetail {
  text: string;
  link: string;
  img: any;
  detail: string;
}
export const NFTPathConfig: IMenuDetail[] = [
  {
    text: 'Markets',
    img: IconMarkets,
    link: '/nft/pools',
    detail: 'You can buy and sell your NFT at our KACO platform',
  },
  {
    text: 'My Wallet',
    img: IconMyWallet,
    link: '/nft/wallet',
    detail: 'All of your NFT assets are in your KACO wallet',
  },
];
export const MorePathConfig: IMenuDetail[] = [
  {
    text: 'Audited By Certik',
    img: IconMarkets,
    link: 'https://www.certik.com/projects/coinversation',
    detail: 'The KACO platform has been officially audited by Certik',
  },
  {
    text: 'Receive NFT in Galaxy',
    img: IconMyWallet,
    link: 'https://galaxy.eco/KACO',
    detail: 'All KACO NFT works can be freely traded on the Galaxy platform at the same time',
  },
];
const bscMenuItems: IMenu[] = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Trade',
    link: '/swap',
  },
  {
    text: 'Farm',
    link: '/farms',
  },
  {
    text: 'Pools',
    link: '/pools',
  },
  {
    text: 'NFT',
    collapsed: true,
    link: '/nft/pools/',
    children: NFTPathConfig,
  },
];

const shidenMenuItems: IMenu[] = [
  {
    text: 'Home',
    link: '/home',
  },
  {
    text: 'Trade',
    link: '/swap',
  },
  {
    text: 'Farm',
    link: '/farms',
  },
  {
    text: 'Pools',
    link: '/pools',
  },
];
// @ts-ignore
export const menuItemsDefault = chainKey === 'SDN' ? shidenMenuItems : bscMenuItems;
