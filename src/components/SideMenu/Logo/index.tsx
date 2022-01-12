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
  ${({ theme }) => theme.mediaQueries.md} {
    height: 26px;
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
