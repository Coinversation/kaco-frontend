import React, { FC } from 'react';
import styled from 'styled-components';
import UserWidget from './UserWidget';

const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  return (
    <div className={className}>
      <div className="right">
        <UserWidget />
      </div>
    </div>
  );
};

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
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-end;
  }
  > img {
    width: 25px;
    height: 20px;
  }

  > .right {
    display: flex;
    align-items: center;
  }
`;
