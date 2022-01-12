import React from 'react';
import { Button, useWalletModal } from '@kaco/uikitv2';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';

const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <Button onClick={onPresentConnectModal} width="140px" {...props}>
      {t('Connect Wallet')}
    </Button>
  );
};

export default ConnectWalletButton;
