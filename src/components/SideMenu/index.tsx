import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import TradeSvg from '../svg/Trade';
import FarmSvg from '../svg/Farm';
import NftSvg from '../svg/Nft';
import HomeSvg from '../svg/Home';
import PoolsSvg from '../svg/PoolsSvg';
import KarsierSvg from '../svg/KarsierSvg';
import { useEffect } from 'react';
import { useMatchBreakpoints } from '@kaco/uikitv2';
import { useKacoPrice } from 'hooks/useKacoPrice';
import Header from './Header';
const Wrapper = styled.div<{ collapsed: boolean }>`
  background: #1f252a;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const BodyContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  transition: 0.15s padding;
  > .content {
    position: relative;
    padding-top: 72px;
    flex: 1;
  }
`;
const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  const { pathname } = useLocation();
  const [menuItems, setMenuItems] = useState<
    {
      text: string;
      img: any;
      link?: string;
      collapsed?: boolean;
      children?: { text: string; link: string }[] | undefined;
    }[]
  >([
    {
      text: 'Home',
      img: HomeSvg,
      link: '/',
    },
    {
      text: 'Trade',
      img: TradeSvg,
      link: '/swap',
    },
    // {
    //   text: 'Mint',
    //   imgs: [MintSvg, MintNSvg],
    //   link: '/mint',
    // },
    {
      text: 'Farm',
      img: FarmSvg,
      link: '/farms',
    },
    {
      text: 'Pools',
      img: PoolsSvg,
      link: '/pools',
    },
    {
      text: 'NFT',
      img: NftSvg,
      collapsed: true,
      link: '/nft/pools/',
      children: [
        { text: 'Markets', link: '/nft/pools' },
        { text: 'My Wallet', link: '/nft/wallet' },
      ],
    },
    {
      text: 'Karsier',
      img: KarsierSvg,
      link: 'https://karsier.kaco.finance/',
    },
  ]);

  useEffect(() => {
    if ([isXs, isSm, isMd].some(Boolean)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isXs, isSm, isMd]);

  return (
    <Wrapper className={className} collapsed={collapsed}>
      <Header setCollapsed={setCollapsed} collapsed={collapsed} />
      <BodyContainer collapsed={collapsed}>
        <div className="content">
          <div className="bg-holder">{children}</div>
        </div>
      </BodyContainer>
    </Wrapper>
  );
};

export default SideMenu;
