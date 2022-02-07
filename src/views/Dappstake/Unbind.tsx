import React, { useState, useCallback } from 'react';
import { Button, Flex } from '@kaco/uikit';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton } from './style/DappstakeStyle';
import Balance from './components/StakeTableBalance';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import UnbindList from './components/UnbindList';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate, IDappPoolDataInterface } from './hooks/getPoolUpdate';
import useStakeWrap from './hooks/useStakeWrap';
import { getReceiveNum } from './hooks/getReceiveNum';
import { UseUnbindDApp } from './hooks/useUnbindDApp';
import { UseStakeDApp } from './hooks/useStakeDApp';
import { GetUserList } from './hooks/getUserList';
import { IWithdrawRecordItem } from 'utils/types';
const Unbind = () => {
  const contract = useDAppStackingContract();
  const pool: IDappPoolDataInterface = GetPoolUpdate(contract);
  const {
    balance,
    isBalanceZero,
    decimals,
    fullBalance,
    account,
  }: {
    balance: BigNumber;
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
    account: string;
  } = useStakeWrap();
  const list: IWithdrawRecordItem[] = GetUserList(contract, pool.recordsIndex, account);
  const { toastSuccess, toastError } = useToast();
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <PageLayout style={{ paddingTop: '80px' }}>
      <Flex justifyContent="center" alignContent="center" flexWrap="wrap">
        <DappstakePage contract={contract} pool={pool}>
          <Balance balance={balance} decimals={decimals} symbol="KSDN" isBalanceZero={isBalanceZero} />
          <StyledTokenInput isWarning={isBalanceZero}>
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
              inputMode="decimal"
              step="any"
              min="0"
              onChange={handleChange}
              placeholder="0"
              value={val}
            />
            <MaxButton variant="text" onClick={handleSelectMax}>
              Max
            </MaxButton>
          </StyledTokenInput>
          <Button
            width="100%"
            disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)}
            onClick={async () => {
              setPendingTx(true);
              try {
                await UseUnbindDApp(contract, account, val);
                toastSuccess('Unstaked!', 'Your earnings have also been harvested to your wallet');
              } catch (e) {
                toastError(
                  'Error',
                  'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                );
                console.error(e);
              } finally {
                setPendingTx(false);
              }
            }}
          >
            {pendingTx ? 'Confirming' : 'Confirm'}
          </Button>
          <StakeTableReceive receiveText={`You will receive: ~${getReceiveNum(pool.ratio, val, 'SDN')} SDN`} />
        </DappstakePage>
        <UnbindList
          list={list}
          withdraw={async () => {
            await UseStakeDApp(contract, account);
            toastSuccess('Staked!', 'Your funds have been staked in the App');
          }}
        />
      </Flex>
    </PageLayout>
  );
};

export default Unbind;
