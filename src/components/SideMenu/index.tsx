import React, { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import LogoPng from './imgs/logo.svg';
import BgPng from './imgs/bg.png';
// import FarmSvg from './imgs/icon_Farm_D.svg';
// import HomeSvg from './imgs/icon_home_D.svg';
import UncollapsedSvg from './imgs/icon_zk.svg';
import CollapsedSvg from './imgs/icon_sq.svg';
// import InfoSvg from './imgs/icon_Info_D.svg';
// import InfoNSvg from './imgs/icon_Info_N.svg';
import collapseSvg from './imgs/collapse.svg';
// import MintSvg from './imgs/icon_Mint_D.svg';
// import MintNSvg from './imgs/icon_Mint_N.svg';
// import PoolsSvg from './imgs/icon_Pools_D.svg';
// import PoolsNSvg from './imgs/icon_Pools_N.svg';
// import TradeSvg from './imgs/icon_trade_D.svg';
import CertikSvg from './imgs/certik.svg';
import GalaxySvg from './imgs/galaxy.svg';
import TradeSvg from '../svg/Trade';
// import FarmSvg from '../svg/Farm';
// import NftSvg from '../svg/Nft';
// import HomeSvg from '../svg/Home';
// import PoolsSvg from '../svg/PoolsSvg';
// import InfoSvg from '../svg/InfoSvg';
// import LogoSvg from './imgs/icon_logo.svg';
import Header from './Header';
import { useEffect } from 'react';
import { Flex, Text, useMatchBreakpoints } from '@kaco/uikit';
import TwitterIcon from '../svg/Twitter';
import TelegramIcon from '../svg/Telegram';
import DocLink from './imgs/DocLink';
// import { useKacoPrice } from 'hooks/useKacoPrice';

const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  ${(props) => (props.active === 't' ? 'color: #1bd3d5;' : '  color: #ffffff;')}
  height: 48px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  font-weight: bolder;
  &:last-child {
    margin-bottom: 0px;
  }
  svg {
    fill: white;
  }
  > .text {
    flex: 1;
    justify-content: space-between;
    padding-right: 37px;
    align-items: center;

    > span {
      margin-left: 12px;
    }
  }
  > .icon-holder {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    svg {
      ${(props) => (props.active === 't' ? 'fill: #1bd3d5;' : '')}
    }
  }
`;

const Wrapper = styled.div<{ collapsed: boolean }>`
  background: #1f252a;
  flex: 1;
  display: flex;
  flex-direction: column;
  > .body-container {
    display: flex;
    flex-direction: column;
    background-image: url(${BgPng});
    background-repeat: no-repeat;
    background-size: cover;
    ${({ theme }) => theme.mediaQueries.xs} {
      padding-left: 0px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 64px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 200px;
    }
    flex: 1;
    transition: 0.15s padding;
    > .content {
      position: relative;
      padding-top: 72px;
      flex: 1;
    }
  }

  > .side {
    overflow: hidden;
    z-index: 10;
    flex-direction: column;
    transition: 0.15s width;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    background: #11171b;
    ${({ theme }) => theme.mediaQueries.md} {
      /* background: linear-gradient(0deg, #114228, #40f2f4);
      */
      background: linear-gradient(0deg, #11171b, #142a2f);
    }

    > img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      position: absolute;
      left: 20px;
      top: 27px;
    }
    > .logo > img {
      visibility: ${(props) => (props.collapsed ? 'hidden' : 'visiable')};
      height: 30px;
      margin-left: 54px;
      margin-top: 22px;
      margin-bottom: 20px;
    }
    > .nav {
      flex: 1;
      margin-top: 20px;

      .sub-menu {
        background-color: #12171a;
        padding-left: 60px;
        > a:hover {
          background: none;
          color: #1bd3d5;
        }
      }
    }

    > .account-info {
      border-top: 1px solid #272e32;
      height: 212px;
      padding: ${(props) => (props.collapsed ? '0px 18px' : '0px 20px')};

      > .balance {
        height: 56px;
        > img {
          width: 28px;
          height: 28px;
        }
      }
      > .links {
        position: relative;
        left: -6px;
        padding-top: 16px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        > a {
          margin-right: ${(props) => (props.collapsed ? '0px' : '16px')};
          &:last-child {
            margin-right: 0px;
          }
        }
        svg {
          fill: white;
          &:hover {
            fill: #1bd3d5;
          }
        }
        > div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgb(32, 49, 74);

          > a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          &:hover {
            svg {
              fill: #1bd3d5;
            }
            background: none;
          }
        }
      }
      > .links-collapsed {
        svg {
          fill: white;
          &:hover {
            fill: #1bd3d5;
          }
        }
      }
      > .links {
        padding-top: 16px;
        display: flex;
        align-items: center;
        svg {
          fill: white;
          &:hover {
            fill: #1bd3d5;
          }
          /* width: 28px;
          height: 28px;
          &:last-child {
            max-width: 14px;
            max-height: 14px;
          } */
        }
        > div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: rgb(32, 49, 74);

          > a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          &:hover {
            svg {
              fill: #1bd3d5;
            }
            background: none;
          }
        }
      }
    }
  }
`;

const SideMenu: FC<{ className?: string }> = ({ className, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const kacoPrice = useKacoPrice();
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
    // {
    //   text: 'Home',
    //   img: HomeSvg,
    //   link: '/',
    // },
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
    // {
    //   text: 'Farm',
    //   img: FarmSvg,
    //   link: '/farms',
    // },
    // {
    //   text: 'Pools',
    //   img: PoolsSvg,
    //   link: '/pools',
    // },
    // {
    //   text: 'NFT',
    //   img: NftSvg,
    //   collapsed: false,
    //   link: '/nft/pools/',
    //   children: [
    //     { text: 'Markets', link: '/nft/pools' },
    //     { text: 'My Wallet', link: '/nft/wallet' },
    //   ],
    // },
    // {
    //   text: 'Pools',
    //   imgs: [PoolsSvg, PoolsNSvg],
    //   link: '/pools',
    // },
    // {
    //   text: 'Info',
    //   imgs: [InfoSvg, InfoNSvg],
    //   link: '/info',
    // },
  ]);

  const sideCollapsedWidth = useMemo(() => {
    if ([isXs, isSm].some(Boolean)) {
      return '0px';
    }
    return '64px';
  }, [isXs, isSm]);

  useEffect(() => {
    if ([isXs, isSm, isMd].some(Boolean)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isXs, isSm, isMd]);

  return (
    <Wrapper className={className} collapsed={collapsed}>
      <div className="side" style={{ width: collapsed ? sideCollapsedWidth : '200px' }}>
        <img src={collapsed ? CollapsedSvg : UncollapsedSvg} alt="" onClick={() => setCollapsed((old) => !old)} />
        <div className="logo">
          <img src={LogoPng} alt="" />
        </div>
        <div className="nav">
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
                  [isXs, isSm, isMd].some(Boolean) && !item.children && !item.children?.length && setCollapsed(true);

                  if (item.children?.length) {
                    setMenuItems([
                      ...menuItems.slice(0, index),
                      { ...item, collapsed: !item.collapsed },
                      ...menuItems.slice(index + 1),
                    ]);
                  }
                }}
              >
                <div className="icon-holder">{item.img()}</div>
                {!collapsed && (
                  <Flex className="text">
                    {<span>{item.text}</span>}
                    {item.children?.length && (
                      <img style={{ transform: item.collapsed ? '' : 'scaleY(-1)' }} src={collapseSvg} alt="" />
                    )}
                  </Flex>
                )}
              </NavLink>
              {!collapsed && item.children?.length && !item.collapsed && (
                <div className="sub-menu">
                  {item.children.map((menu) => (
                    <NavLink
                      active={
                        (
                          menu.link === '/'
                            ? pathname === menu.link
                            : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                            ? menu.link === '/swap'
                            : pathname.startsWith(menu.link)
                        )
                          ? 't'
                          : 'f'
                      }
                      to={menu.link}
                      key={menu.link}
                      onClick={() => {
                        [isXs, isSm, isMd].some(Boolean) && setCollapsed(true);
                      }}
                    >
                      {menu.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="account-info">
          {/* <Flex className="balance" alignItems="center">
            <img src={LogoSvg} alt="" />
            {!collapsed && (
              <Text color="#1BD3D5" bold fontSize="16px" ml="10px">
                ${kacoPrice.isNaN() ? '0' : kacoPrice.toFixed(2)}
              </Text>
            )}
          </Flex> */}
          {!collapsed && (
            <div className="links">
              <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
                <TwitterIcon
                  style={{ position: 'relative', top: '-2px', right: '-2.5px', height: '24px', width: '24px' }}
                />
              </a>
              <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
                <TelegramIcon style={{ height: '22px', width: '22px' }} />
              </a>
              <a target="_blank" rel="noreferrer" href="https://coinversationprotocol.gitbook.io/kaco-doc/">
                <DocLink style={{ height: '16px', width: '16px' }} />
              </a>
            </div>
          )}
          {collapsed && (
            <div
              className="links-collapsed"
              style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <a
                style={{ position: 'relative', left: '-1px' }}
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/KACOFinance"
              >
                <TwitterIcon style={{ height: '24px', width: '24px' }} />
              </a>
              <a
                style={{ marginTop: '12px' }}
                target="_blank"
                rel="noreferrer"
                href="https://t.me/coinversationofficial"
              >
                <TelegramIcon style={{ height: '22px', width: '22px' }} />
              </a>
              <a
                style={{ marginTop: '18px' }}
                target="_blank"
                rel="noreferrer"
                href="https://coinversationprotocol.gitbook.io/kaco-doc/"
              >
                <DocLink style={{ height: '16px', width: '16px' }} />
              </a>
            </div>
          )}
          {!collapsed && (
            <>
              <Flex alignItems="center" mt="21px">
                <a target="_blank" rel="noreferrer" href="https://galaxy.eco/KACO">
                  <Text fontSize="12px" mr="14px">
                    Receive NFT
                  </Text>
                </a>
                <a target="_blank" rel="noreferrer" href="https://galaxy.eco/KACO">
                  <img src={GalaxySvg} alt="" />
                </a>
              </Flex>
              <Flex alignItems="center" mt="21px">
                <a target="_blank" rel="noreferrer" href="https://www.certik.org/projects/coinversation">
                  <Text fontSize="12px" mr="14px">
                    Audited By
                  </Text>
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.certik.org/projects/coinversation">
                  <img src={CertikSvg} alt="" />
                </a>
              </Flex>
            </>
          )}
        </div>
      </div>
      <div
        className="body-container"
        style={{ paddingLeft: [isXs, isSm, isMd].some(Boolean) ? '0px' : collapsed ? '64px' : '200px' }}
      >
        <div className="content">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <div className="bg-holder">{children}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SideMenu;
