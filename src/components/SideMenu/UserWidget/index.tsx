import React from 'react';
import styled from 'styled-components';
import { Flex } from '@kaco/uikitv2';
import SwitchChain from './SwitchChain';
import WalletAccountInfo from './WalletAccount';
const UserWidget = () => {
  return (
    <User>
      <SwitchChain />
      <WalletAccountInfo />
    </User>
  );
};
const User = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
`;

export default UserWidget;
