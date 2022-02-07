import React, { useState, useCallback } from 'react';
import { Button } from '@kaco/uikit';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { StyledTokenInput, StyledInput, MaxButton } from './style/DappstakeStyle';
import useUnstakeFarms from './hooks/useUnstakeFarms';
import Balance from './components/StakeTableBalance';
import StakeTableReceive from './components/StakeTableReceive';
import DappstakePage from './components/DappstakePage';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate } from 'hooks/dAppStacking/getPoolUpdate';
import useStakeWrap from 'hooks/dAppStacking/useStakeWrap';
const Unstake = (props) => {
  const contract = useDAppStackingContract();
  const pool = GetPoolUpdate(contract);
  const {
    balance,
    isBalanceZero,
    decimals,
    fullBalance,
    pid,
  }: {
    balance: BigNumber;
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
  } = useStakeWrap();
  const { onUnstake } = useUnstakeFarms(pid);
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
  const handleUnstake = async (amount: string) => {
    await onUnstake(amount);
  };

  return (
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
            await handleUnstake(val);
            toastSuccess('Unstaked!', 'Your earnings have also been harvested to your wallet');
          } catch (e) {
            toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
            console.error(e);
          } finally {
            setPendingTx(false);
          }
        }}
      >
        {pendingTx ? 'Confirming' : 'Confirm'}
      </Button>
      <StakeTableReceive receiveText={`You will receive: ~0.00 SDN`} />
    </DappstakePage>
  );
};

export default Unstake;
