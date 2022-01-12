import React, { FC } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMenu } from '../config';
const BigNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { pathname } = useLocation();
  return (
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
            onClick={() => {}}
          ></NavLink>
        </div>
      ))}
    </div>
  );
};
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

export default BigNav;
