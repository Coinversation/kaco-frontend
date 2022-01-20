import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useTooltip } from '@kaco/uikit';
import PolkadotAccounts from './PolkadotAccounts';

const PolkadotInfo = () => {
  const {
    targetRef: targetRef_P,
    tooltip: tooltip_P,
    tooltipVisible: tooltipVisible_P,
  } = useTooltip(PolkadotAccounts, {
    trigger: 'click',
    tootipStyle: { background: '#1F252A', padding: '0', overflow: 'hidden' },
    placement: 'top-end',
    hideArrow: true,
    tooltipOffset: [20, 10],
  });
  const { account } = useWeb3React();
  return (
    <>
      {tooltipVisible_P && tooltip_P}
      <div
        ref={targetRef_P}
        className="account"
        style={{
          border: `1.4px solid ${tooltipVisible_P ? '#1BD3D5' : '#238485'}`,
        }}
      >
        <span className="account">{account}</span>
        {/* <LogoutIcon onClick={logout} /> */}
      </div>
    </>
  );
};
export default styled(PolkadotInfo)`
  .account {
    > svg {
      &:hover {
        cursor: pointer;
        fill: #1fc7d4;
      }
    }
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    height: 36px;
    background: #1f252a;
    border-radius: 12px;
    padding: 0px 16px;
    max-width: 150px;
    > span {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    > img {
      margin-left: 14px;
    }
  }
`;
