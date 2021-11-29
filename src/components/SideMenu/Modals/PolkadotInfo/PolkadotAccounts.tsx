import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import AccountEVM from './AccountEVM';
import PolkadotNoAccount from './PolkadotNoAccount';
import PolkadoAccountInfo from './PolkadoAccountInfo';
import PolkadotLearnMore from './PolkadotLearnMore';
type Phase = 'none' | 'setup' | 'shop' | 'battle' | 'result';

const PolkadotAccount_TSX: FC<{ className?: string }> = ({ className }) => {
  const [phase, setPhase] = useState<Phase>('setup');
  const connectWallet = useCallback(() => {
    setPhase('setup');
  }, []);
  switch (phase) {
    case 'setup':
      // React.useEffect(() => {
      //   console.log(33333);
      //   // setup().then((r) => {
      //   //   if (r.kind === 'ok') {
      //   //     setInjectedAccounts(r.injectedAccounts);
      //   //   }
      //   // });
      // }, []);
      return (
        <div className={className}>
          <p className="text">Polkadot Wallet</p>
          <PolkadoAccountInfo />
        </div>
      );
  }
  return (
    <div className={className}>
      <p className="text">Polkadot Wallet</p>
      <PolkadotNoAccount connectWallet={connectWallet} />
    </div>
  );
};
const PolkadotAccount = styled(PolkadotAccount_TSX)`
  .text {
    font-size: 14px;
    font-weight: bold;
    color: #9da6a6;
    margin-bottom: 12px;
    margin-top: 20px;
    padding: 0 30px;
  }
`;

const PolkadotAccounts: React.ReactNode = (
  <>
    <AccountEVM />
    <PolkadotAccount />
    <PolkadotLearnMore />
  </>
);

export default PolkadotAccounts;
