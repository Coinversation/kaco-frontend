import React from 'react';
import { LogoutIcon } from '@kaco/uikit';
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import ConnectWalletButton from '../../ConnectWalletButton';
import PolkadotInfo from './PolkadotInfo/index';
import { chainKey } from 'config';
import { CHAINKEY } from '@kaco/sdkv2';
const AccountInfo = () => {
  const { account } = useWeb3React();
  const { logout } = useAuth();
  return (
    <>
      {account ? (
        chainKey === CHAINKEY.SDN ? (
          <PolkadotInfo />
        ) : (
          <div className="account">
            <span>{account}</span>
            <LogoutIcon onClick={logout} />
          </div>
        )
      ) : (
        <ConnectWalletButton scale="sm" />
      )}
    </>
  );
};
export default AccountInfo;
