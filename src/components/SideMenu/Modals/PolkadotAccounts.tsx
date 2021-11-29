import React from 'react';
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import { Flex } from '@kaco/uikit';
import SelectedSvg from '../imgs/icon_select.svg';
const PolkadotAccounts = () => {
  const { logout } = useAuth();
  const { account } = useWeb3React();
  return (
    <div>
      <Flex justifyContent="space-between" background="#272E32">
        <h2>{account}</h2>
        <img src={SelectedSvg} width="36px" alt="" onClick={logout} />
      </Flex>
    </div>
  );
};
export default PolkadotAccounts;
