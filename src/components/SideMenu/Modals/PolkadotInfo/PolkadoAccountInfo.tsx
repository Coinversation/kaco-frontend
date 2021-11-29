import React, { FC, useState } from 'react';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import styled from 'styled-components';
import { setup } from './utils/task';
import OkSvg from './img/icon_ok.svg';
import WarnSvg from './img/icon_warn.svg';
import { polkadotSignMessage } from './utils/accountUtils';
const PolkadoAccountInfo_TSX: FC<{ className?: string }> = ({ className }) => {
  const [injectedAccounts, setInjectedAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [waiting, setWaiting] = useState(false);
  // 链接钱包
  React.useEffect(() => {
    setup(setWaiting, null).then((r) => {
      if (r.kind === 'ok') {
        setInjectedAccounts(r.injectedAccounts);
      }
    });
  }, []);
  return (
    <div className={className}>
      {waiting ? 'waiting' : null}
      {injectedAccounts && injectedAccounts.length ? (
        <ul>
          {injectedAccounts.map((v: InjectedAccountWithMeta, index: number) => (
            <li key={index}>
              <h3>
                {v.address.slice(0, 7)}...{v.address.slice(v.address.length - 4, v.address.length)}
              </h3>
              <p onClick={() => polkadotSignMessage(v.address)}>sign</p>
            </li>
          ))}
          <li>
            <h3>dddd</h3>
            <img src={OkSvg} alt="" />
          </li>
          <li>
            <h3>ddddddsdfdd</h3>
            <img className="warn" src={WarnSvg} alt="" />
          </li>
        </ul>
      ) : null}
    </div>
  );
};

const PolkadoAccountInfo = styled(PolkadoAccountInfo_TSX)`
  padding: 0 20px 0 20px;
  ul {
    list-style: none;
    li {
      background-color: #272e32;
      border-radius: 16px;
      padding: 10px 20px;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      h3 {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
      p {
        cursor: pointer;
        border: 1px solid #1bd3d5;
        border-radius: 12px;
        color: #1bd3d5;
        font-weight: bold;
        font-size: 14px;
        line-height: 34px;
        padding: 0 20px;
      }
      .warn {
        cursor: pointer;
      }
      img {
        width: 20px;
        margin-right: 24px;
      }
    }
  }
`;
export default PolkadoAccountInfo;
