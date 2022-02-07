import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ButtonMenu, ButtonMenuItem } from '@kaco/uikit';

const StyledNav = styled.nav`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  > div {
    background-color: #122124;
  }
`;

const getActiveIndex = (pathname: string): number => {
  if (pathname.includes('/stake')) {
    return 0;
  }
  return 1;
};

const DappstakeSubNav = () => {
  const location = useLocation();
  const activeIndex = getActiveIndex(location.pathname);
  return (
    <StyledNav>
      <ButtonMenu py="6px" activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem
          style={activeIndex === 0 ? { color: '#1BD3D5', background: '#1F373B' } : { color: 'white' }}
          width="112px"
          height="44px"
          id="Stake-nav-link"
          to="/dappstake/stake"
          as={Link}
        >
          Stake
        </ButtonMenuItem>
        {/* <ButtonMenuItem
          style={activeIndex === 1 ? { color: '#1BD3D5', background: '#1F373B' } : { color: 'white' }}
          height="44px"
          width="112px"
          id="Unstake-nav-link"
          to="/dappstake/unstake"
          as={Link}
        >
          Unstake
        </ButtonMenuItem> */}
        <ButtonMenuItem
          style={activeIndex === 1 ? { color: '#1BD3D5', background: '#1F373B' } : { color: 'white' }}
          height="44px"
          width="112px"
          id="Unstake-nav-link"
          to="/dappstake/unbind"
          as={Link}
        >
          Unbind
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  );
};

export default DappstakeSubNav;
