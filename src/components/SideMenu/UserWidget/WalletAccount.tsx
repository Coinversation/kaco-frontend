import React from 'react';
import styled from 'styled-components';
import { Flex, useTooltip } from '@kaco/uikitv2';
import { chainKey } from '../config';
import ConnectWalletButton from '../../ConnectWalletButton';
import PolkadotAccounts from './WalletAccountInfo/PolkadotAccounts';
import BscAccountInfo from './WalletAccountInfo/BscAccountInfo';
import { useAccountInfo } from './hooks/useAccountInfo';
const WalletAccountInfo = () => {
  const [accountSort, karsierNft] = useAccountInfo();
  const {
    targetRef: targetRef_P,
    tooltip: tooltip_P,
    tooltipVisible: tooltipVisible_P,
    // @ts-ignore
  } = useTooltip(chainKey === 'SDN' ? PolkadotAccounts : BscAccountInfo, {
    trigger: 'hover',
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
  });

  return (
    <>
      {tooltipVisible_P && tooltip_P}
      {accountSort ? (
        <WalletAccount ref={targetRef_P}>
          <img className="head_icon" src={karsierNft} alt="header_default" />
          <span>{accountSort}</span>
          {/* add kaco header img */}
        </WalletAccount>
      ) : (
        <ConnectWalletButton scale="sm" />
      )}
    </>
  );
};
const WalletAccount = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.btnTextColor};
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  width: 140px;
  padding: 0 12px;
  cursor: pointer;
  .head_icon {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;
export default WalletAccountInfo;
