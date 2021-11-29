import React, { FC } from 'react';
import styled from 'styled-components';
import { LogoutIcon, useMatchBreakpoints, useTooltip } from '@kaco/uikit';
import UncollapsedSvg from './imgs/icon_sq.svg';
import PolkadotAccounts from './Modals/PolkadotAccounts';
import SwitchChain from './Modals/SwitchChain';
import AccountInfo from './Modals/AccountInfo';
// import ClaimModal from './Modals/ClaimModal';
export enum ThemeChoice {
  Dark,
  White,
}

const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  const { isXs, isSm } = useMatchBreakpoints();

  const {
    targetRef: targetRef_P,
    tooltip: tooltip_P,
    tooltipVisible: tooltipVisible_P,
  } = useTooltip(PolkadotAccounts, {
    trigger: 'click',
    tootipStyle: { background: '#1F252A', padding: '20px 30px' },
    placement: 'top-end',
    hideArrow: true,
    tooltipOffset: [20, 10],
  });

  // const [onPresentClaim] = useModal(<ClaimModal />);
  return (
    <div className={className}>
      {(isXs || isSm) && <img src={UncollapsedSvg} alt="" onClick={() => setCollapsed(!collapsed)} />}
      <div className="right">
        <SwitchChain />
        <AccountInfo />
      </div>
    </div>
  );
};

export default styled(Header)`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  position: absolute;
  top: 0px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-end;
  }
  > img {
    width: 20px;
    height: 20px;
  }

  > .right {
    display: flex;
    align-items: center;
    > .icons {
      display: flex;
      align-items: center;
      > a {
        margin-right: 16px;
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        &:hover {
          svg {
            width: 24px;
            fill: #00dbde;
          }
        }
      }
    }

    > .theme-choice {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      width: 36px;
      height: 36px;
      background: #1f252a;
      border-radius: 12px;
      > img {
        width: 20px;
        height: 20px;
      }
    }
    .claim_kac {
      padding: 0px 30px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(90deg, #1bd3d5, #d755d9, #ec9b5a);
      border-radius: 12px;
      font-weight: bold;
      margin-right: 12px;
      cursor: pointer;
    }
    > .account {
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
      border: 1px solid #2f363b;
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
  }
`;
