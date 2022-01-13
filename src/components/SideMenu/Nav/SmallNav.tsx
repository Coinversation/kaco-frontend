import React, { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { useTooltip } from '@kaco/uikitv2';
import { IMenu } from '../config';
import CollapseSvg from '../imgs/collapse';
import IconClose from '../imgs/iconClose';
import IconMenu from '../imgs/iconMenu';
import { NftContentIn } from './NftContent';
import { MoreContentInSmall } from './MoreContent';
const SmallNavTooltip: FC<{ _menuItems: IMenu[]; setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>> }> =
  ({ _menuItems, setTooltipVisible }) => {
    const { pathname } = useLocation();
    const [menuItems, setMenuItems] = useState(_menuItems);
    const [showMore, setShowMore] = useState(false);
    return (
      <NavWrap>
        {menuItems.map((item, index) => (
          <div key={index}>
            <NavLink
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
              to={item.link}
              key={item.link}
              onClick={() => {
                setTooltipVisible(false);
                if (item.link.indexOf('https://') > -1) {
                  window.open(item.link);
                  return;
                }
                setMenuItems([...menuItems.map((v) => (v.children ? { ...v, collapsed: true } : v))]);
                if (item.children?.length) {
                  setMenuItems([
                    ...menuItems.slice(0, index),
                    { ...item, collapsed: !item.collapsed },
                    ...menuItems.slice(index + 1),
                  ]);
                }
              }}
            >
              {item.text}
              {item.children?.length && <CollapseSvg />}
            </NavLink>
            {((item.children?.length && !item.collapsed) || pathname.startsWith('/nft')) && (
              <div className="sub-menu">{item.text === 'NFT' ? <NftContentIn /> : null}</div>
            )}
          </div>
        ))}
        <NavLinkStyle active={showMore}>
          <h3
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            More <CollapseSvg />
          </h3>
          {showMore ? (
            <div className="sub-menu">
              <MoreContentInSmall setTooltipVisible={setTooltipVisible} />
            </div>
          ) : null}
        </NavLinkStyle>
      </NavWrap>
    );
  };

const SmallNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { theme } = useTheme();
  const setMoreTooltipVisible = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
  const {
    targetRef: MenuTargetRef,
    tooltip: MenuTooltip,
    tooltipVisible: MenuTooltipVisible,
    setTooltipVisible,
  } = useTooltip(
    <>
      <SmallNavTooltip _menuItems={menuItems} setTooltipVisible={setMoreTooltipVisible.current} />
    </>,
    {
      trigger: 'click',
      tootipStyle: {
        border: 'none',
        backgroundColor: theme.colors.background,
        width: '100vw',
        padding: 0,
        left: 0,
        borderRadius: 0,
      },
      placement: 'top-start',
      hideArrow: true,
    },
  );
  useEffect(() => {
    setMoreTooltipVisible.current = setTooltipVisible;
  }, [setTooltipVisible]);
  useEffect(() => {
    if (MenuTooltipVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [MenuTooltipVisible]);

  return (
    <>
      {MenuTooltipVisible && MenuTooltip}
      <MenuBtn ref={MenuTargetRef}>{MenuTooltipVisible ? <IconClose /> : <IconMenu />}</MenuBtn>
    </>
  );
};
const NavWrap = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 40px;
  height: calc(100vh - 84px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .sub-menu {
    margin: 10px 0 20px;
  }
`;
const NavLinkStyle = styled.div<{ active: boolean }>`
  flex-direction: column;
  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.textSubtle};
    svg {
      width: 36px;
      fill: ${({ theme }) => theme.colors.textSubtle};
      transform: ${({ active }) => (active ? '' : 'scaleY(-1)')};
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  height: 60px;
  line-height: 60px;
  transition: all 0.3s ease;
  font-weight: 600;
  justify-content: space-between;
  svg {
    width: 36px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? 'none' : 'scaleY(-1)')};
  }
`;
const MenuBtn = styled.div`
  position: fixed;
  // top: (72-40)/2;
  top: 16px;
  right: 16px;
  cursor: pointer;
  & > svg {
    width: 40px;
    fill: ${({ theme }) => theme.colors.text};
  }
`;
export default SmallNav;
