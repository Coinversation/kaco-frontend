import React, { useState, useCallback, useMemo } from 'react';
import Page from 'components/Layout/Page';
import { parseUnits } from 'ethers/lib/utils';
import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance';
import { useGetBnbBalance } from 'hooks/useTokenBalance';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import useStakeFarms from './hooks/useStakeFarms';
// import useUnstakeFarms from './hooks/useUnstakeFarms';
import {
  InnerWrapper,
  Header,
  HeaderLi,
  HeaderTitleH3,
  HeaderTitleH6,
  TableContent,
  DappstakeContext,
  StyledTokenInput,
  StyledInput,
} from './style/DappstakeStyle';
import DappstakeSubNav from './components/SubNav';
import { Flex, Text, Button } from '@kaco/uikit';
import { WBNB } from 'config/constants/tokens';
const decimals = WBNB.decimals;
const pid = 0;
const Dappstake: React.FC = () => {
  const { onStake } = useStakeFarms(pid);
  // const { onUnstake } = useUnstakeFarms(pid);
  const { balance } = useGetBnbBalance();
  const [val, setVal] = useState('');
  const lpTokensToStake = new BigNumber(val);
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const max = balance.toString();
  // const [max, setMax] = useState('0');
  const isBalanceZero = max === '0' || !max;
  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0';
    }

    const balanceUnits = parseUnits(balance, decimals);
    return formatBigNumber(balanceUnits, decimals, decimals);
  };
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance);
  }, [balance]);

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

  const handleStake = async (amount: string) => {
    await onStake(amount);
  };

  // const handleUnStake = async (amount: string) => {
  //   await onUnstake(amount);
  // };
  return (
    <Page>
      <InnerWrapper>
        <Header>
          <HeaderLi>
            <HeaderTitleH3>15%</HeaderTitleH3>
            <HeaderTitleH6>APR</HeaderTitleH6>
          </HeaderLi>
          <HeaderLi>
            <HeaderTitleH3>9990129 SDN</HeaderTitleH3>
            <HeaderTitleH6>Total Supply</HeaderTitleH6>
          </HeaderLi>
          <HeaderLi>
            <HeaderTitleH3>1KSDN=1.0333SDN</HeaderTitleH3>
            <HeaderTitleH6>Net value</HeaderTitleH6>
          </HeaderLi>
        </Header>
        <TableContent>
          <DappstakeSubNav />
          <DappstakeContext>
            <Flex justifyContent="space-between" pl="16px">
              <Text fontSize="14px">Balance: {displayBalance(max)}</Text>
            </Flex>

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
              <Button variant="text" scale="sm" onClick={handleSelectMax} mr="8px">
                Max
              </Button>
            </StyledTokenInput>
            <Button
              width="100%"
              disabled={
                pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)
              }
              onClick={async () => {
                setPendingTx(true);
                try {
                  await handleStake(val);
                  toastSuccess('Staked!', 'Your funds have been staked in the farm');
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
          </DappstakeContext>
        </TableContent>
      </InnerWrapper>
    </Page>
  );
};
export default Dappstake;
