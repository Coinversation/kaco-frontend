import React from 'react';
import { Button, useWalletModal, useMatchBreakpoints } from '@kaco/uikit';
import useAuth from 'hooks/useAuth';

const ConnectWalletButton = (props) => {
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { isXs, isSm } = useMatchBreakpoints();

  return (
    <Button style={{ height: '34px' }} onClick={onPresentConnectModal} {...props}>
      {isXs || isSm ? 'Connect' : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWalletButton;
