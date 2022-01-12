import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMenu } from '../config';
import { Flex, useTooltip } from '@kaco/uikitv2';
import CollapseSvg from '../imgs/collapse';
import NftContent from './NftContent';
import MoreContent from './MoreContent';
import IconMore from '../imgs/iconMore';
const BigNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { pathname } = useLocation();
  const {
    targetRef: NftTargetRef,
    tooltip: NftTooltip,
    tooltipVisible: NftTooltipVisible,
  } = useTooltip(NftContent, {
    trigger: 'hover',
    tootipStyle: { padding: '10px 20px 20px' },
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
  });
  const {
    targetRef: MoreTargetRef,
    tooltip: MoreTooltip,
    tooltipVisible: MoreTooltipVisible,
  } = useTooltip(MoreContent, {
    trigger: 'hover',
    tootipStyle: { padding: '0', minWidth: '620px' },
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
  });

  return (
    <>
      {NftTooltipVisible && NftTooltip}
      {MoreTooltipVisible && MoreTooltip}
      <NavWrap>
        {menuItems.map((item: IMenu, index) => (
          <NavLink
            to={item.link}
            key={index}
            ref={item.text === 'NFT' ? NftTargetRef : undefined}
            onClick={() => {
              if (item.link.indexOf('https://') > -1) {
                window.open(item.link);
                return;
              }
            }}
            active={
              (
                item.link === '/'
                  ? pathname === item.link
                  : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                  ? item.link === '/swap'
                  : ['/nft/pools', '/nft/wallet/mint', '/nft/wallet/burn'].find((p) => pathname.startsWith(p))
                  ? item.link === '/nft/pools/'
                  : pathname.startsWith(item.link)
              )
                ? 't'
                : 'f'
            }
          >
            {item.text}
            {item.children?.length && <CollapseSvg />}
          </NavLink>
        ))}
        <IconMoreStyle ref={MoreTargetRef}>
          <IconMore />
        </IconMoreStyle>
      </NavWrap>
    </>
  );
};
const IconMoreStyle = styled.div`
  margin: 0;
  padding: 0;
  height: 40px;
  svg {
    width: 24px;
    height: 40px;
    display: block;
    fill: ${({ theme }) => theme.colors.textSubtle};
    &:hover {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;
const NavWrap = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  a:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  height: 40px;
  transition: all 0.3s ease;
  font-weight: bolder;
  margin-right: 34px;
  svg {
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  }
`;

export default BigNav;
