import React, { FC, useCallback, useState, SetStateAction, Dispatch } from 'react';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { decodeAddress } from '@polkadot/util-crypto';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { u8aToHex } from '@polkadot/util';
import { setup, getSignStatus, postSignStatus } from './utils/task';
import OkSvg from './img/icon_ok.svg';
import { polkadotSignMessage } from './utils/accountUtils';
import WarnInfo from './warnInfo';
type Signed = 0 | 1 | 2;
interface mInjectedAccountWithMeta extends InjectedAccountWithMeta {
  signed?: Signed;
  publickey?: string;
  evmAddress?: string;
}
const getAddressStatus = (
  waiting: boolean,
  setWaiting: (b: boolean) => void,
  account: string,
  setInjectedAccounts: Dispatch<SetStateAction<mInjectedAccountWithMeta[]>>,
  arr: mInjectedAccountWithMeta[],
) => {
  if (waiting) {
    return;
  }
  getSignStatus(
    setWaiting,
    arr.map((v) => v.publickey),
  ).then((v) => {
    if (v) {
      const _a = [];
      // 0 未签名   1 已签名  2 签名不是当前EVM用户
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (v[item.publickey]) {
          if (v[item.publickey] === account) {
            _a.push({ ...item, signed: 1, evmAddress: v[item.publickey] });
          } else {
            _a.push({ ...item, signed: 2, evmAddress: v[item.publickey] });
          }
        } else {
          _a.push({ ...item, signed: 0 });
        }
      }
      setInjectedAccounts(_a);
    } else {
      setInjectedAccounts(arr);
    }
  });
};
const PolkadoAccountInfo_TSX: FC<{ className?: string }> = ({ className }) => {
  const [injectedAccounts, setInjectedAccounts] = useState<mInjectedAccountWithMeta[]>([]);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState('');
  const { account } = useWeb3React();

  // 链接钱包
  React.useEffect(() => {
    setup(setWaiting, null).then((r) => {
      if (r.kind === 'ok') {
        // 获取publicKey
        const _arr = r.injectedAccounts.map((v) => {
          const publickey = u8aToHex(decodeAddress(v.address, true));
          return {
            ...v,
            publickey,
          };
        });
        getAddressStatus(waiting, setWaiting, account, setInjectedAccounts, _arr);
      } else {
        setMessage(r.message || '');
      }
    });
    // eslint-disable-next-line
  }, []);
  const signAddress = useCallback(
    async (v: mInjectedAccountWithMeta) => {
      const ret = await polkadotSignMessage(v.address);
      const sigInfos = {
        polkadotKey: v.publickey,
        evmAddress: account,
        signature: ret,
      };
      postSignStatus(setWaiting, [sigInfos]).then((res) => {
        console.log(res);
        if (res) {
          getAddressStatus(waiting, setWaiting, account, setInjectedAccounts, injectedAccounts);
        }
      });
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={className}>
      {waiting ? (
        <h4>
          <i>waiting</i>
        </h4>
      ) : null}
      {injectedAccounts && injectedAccounts.length ? (
        <ul>
          {injectedAccounts.map((v: mInjectedAccountWithMeta, index: number) => (
            <li key={index}>
              <h3>
                {v.address.slice(0, 7)}...{v.address.slice(v.address.length - 4, v.address.length)}
              </h3>
              {v.signed === 1 ? (
                <img src={OkSvg} alt="" />
              ) : v.signed === 2 ? (
                <WarnInfo text={`binded to another address: ${v?.evmAddress ?? ''}`} />
              ) : (
                <p onClick={() => signAddress(v)}>sign</p>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {message ? <h4>{message}</h4> : null}
    </div>
  );
};

const PolkadoAccountInfo = styled(PolkadoAccountInfo_TSX)`
  padding: 0 20px 0 20px;
  h4 {
    padding: 10px 20px;
    color: #ad3d3d;
    font-weight: bold;
    font-size: 12px;
    background-color: #272e32;
    border-radius: 16px;
    margin-bottom: 12px;
    i {
      color: #f1842c;
      font-style: normal;
    }
  }
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
