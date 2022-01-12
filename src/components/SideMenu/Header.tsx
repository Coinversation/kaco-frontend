import React, { FC } from 'react';
import styled from 'styled-components';
import UserWidget from './UserWidget';
import Logo from './Logo';
import Nav from './Nav';
import { Flex } from '@kaco/uikitv2';
const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  return (
    <div className={className}>
      <FlFlex>
        <Logo collapsed={collapsed} />
        <Nav collapsed={collapsed} />
      </FlFlex>
      <div className="right">
        <UserWidget />
      </div>
    </div>
  );
};
const FlFlex = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
`;
export default styled(Header)`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.header};
  background-color: ${({ theme }) => theme.colors.background};

  > img {
    width: 25px;
    height: 20px;
  }

  > .right {
    display: flex;
    align-items: center;
  }
`;
