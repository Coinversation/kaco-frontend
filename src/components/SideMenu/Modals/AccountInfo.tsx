import React, { FC } from 'react';
import { LogoutIcon, useMatchBreakpoints, useTooltip } from '@kaco/uikit';
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import ConnectWalletButton from '../../ConnectWalletButton';
const AccountInfo = () => {
  const { account } = useWeb3React();
  const { logout } = useAuth();
  return (
    <>
      {account ? (
        <div className="account">
          <span>{account}</span>
          <LogoutIcon onClick={logout} />
        </div>
      ) : (
        <ConnectWalletButton scale="sm" />
      )}
    </>
  );
};
export default AccountInfo;
