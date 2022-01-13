import React, { FC } from 'react';
import styled from 'styled-components';
import LogoPng from '../imgs/logo.svg';
import LogoSmallPng from '../imgs/logo_small.svg';
const Logo: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <LogoStyle>
      <img src={collapsed ? LogoSmallPng : LogoPng} alt="" />
    </LogoStyle>
  );
};
const LogoStyle = styled.div`
  height: 40px;
  margin-right: 0;
  margin-top: -10px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 26px;
    margin-top: 0;
    margin-right: 48px;
  }
  img {
    display: block;
    height: 50px;
    max-width: none;
    ${({ theme }) => theme.mediaQueries.md} {
      height: 26px;
    }
  }
`;
export default Logo;
