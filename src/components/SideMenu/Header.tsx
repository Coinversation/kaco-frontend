import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from '../ConnectWalletButton';
// import { LogoutIcon, useMatchBreakpoints, useModal } from '@kaco/uikit';
import { LogoutIcon, useMatchBreakpoints, useModal } from '@kaco/uikit';
import UncollapsedSvg from './imgs/icon_sq.svg';
import useAuth from 'hooks/useAuth';
import ClaimModal from './Modals/ClaimModal';
// import { useKarsierContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import SwitchChain from './Modals/SwitchChain';
export enum ThemeChoice {
  Dark,
  White,
}

const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  const { account } = useWeb3React();
  const { isXs, isSm } = useMatchBreakpoints();
  const { logout } = useAuth();
  // const karsierContract = useKarsierContract();
  const karsierContract = null;
  // const [karsierNfts, setKarsierNfts] = useState([]);
  const [karsierNft, setKarsierNft] = useState('');

  useEffect(() => {
    (async () => {
      if (account && karsierContract && karsierContract.walletOfOwner) {
        const _arr = await karsierContract.walletOfOwner(account);
        if (_arr.length) {
          const _kArr = _arr.map((v: BigNumber) => v.toNumber());
          // setKarsierNfts(_kArr);
          const uri = await karsierContract.tokenURI(_kArr[0]);
          const res = await fetch(uri);
          const info = await res.json();

          setKarsierNft(info.image || '');
        }
      }
    })();
  }, [account, karsierContract]);

  const [onPresentClaim] = useModal(<ClaimModal />);
  return (
    <div className={className}>
      {(isXs || isSm) && <img src={UncollapsedSvg} alt="" onClick={() => setCollapsed(!collapsed)} />}
      <div className="right">
        <div
          className="auction_event"
          onClick={() => {
            window.open('https://www.coinversation.io/joinus');
          }}
        >
          Auction Event
        </div>
        {account ? (
          <div className="claim_kac" onClick={onPresentClaim}>
            {isXs || isSm ? 'Claim' : '  Claim Kac  '}
          </div>
        ) : null}
        {/* <div className="icons">
          <a target="_blank" rel="noreferrer" href="https://twitter.com/KACOFinance">
            <TwitterIcon height="28px" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/coinversationofficial">
            <TelegramIcon height="28px" />
          </a>
        </div> */}
        <SwitchChain />

        {account ? (
          <div className="account">
            <span>{account}</span>
            {/* add kaco header img */}
            {karsierNft.length > 0 ? (
              <img className="head_icon" src={karsierNft} alt={karsierNft} onClick={logout} />
            ) : (
              <LogoutIcon onClick={logout} />
            )}
          </div>
        ) : (
          <ConnectWalletButton scale="sm" />
        )}
      </div>
    </div>
  );
};

export default styled(Header)`
  padding-left: 10px;
  padding-right: 10px;
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
    width: 25px;
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
      padding: 0px 10px;
      overflow: hidden;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, #d755d9, #ec9b5a);
      border-radius: 12px;
      font-weight: bold;
      margin-right: 8px;
      cursor: pointer;
      ${({ theme }) => theme.mediaQueries.xs} {
        margin-right: 8px;
        padding: 0px 10px;
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-right: 16px;
        padding: 0px 16px;
      }
    }
    .auction_event {
      padding: 0px 10px;
      overflow: hidden;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      background: linear-gradient(90deg, #fc00ff, #00dbde);
      border-radius: 12px;
      font-weight: bold;
      margin-right: 8px;
      cursor: pointer;
      ${({ theme }) => theme.mediaQueries.xs} {
        margin-right: 8px;
        padding: 0px 10px;
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-right: 16px;
        padding: 0px 16px;
      }
    }
    > .account {
      > svg {
        &:hover {
          cursor: pointer;
          fill: #1fc7d4;
        }
      }
      .head_icon {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        padding: 2px;
      }
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      height: 38px;
      background: #1f252a;
      border: 1px solid #2f363b;
      border-radius: 12px;
      padding: 2px 10px;
      max-width: 80px;
      ${({ theme }) => theme.mediaQueries.xs} {
        padding: 2px 16px;
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        padding: 2px 16px;
        max-width: 150px;
      }
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
