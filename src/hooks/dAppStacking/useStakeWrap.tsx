import { useMemo } from 'react';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useGetBnbBalance } from 'hooks/useTokenBalance';
import { SDN } from 'config/constants/tokens';

const useStakeWrap = () => {
  const { balance } = useGetBnbBalance();
  const decimals = SDN.decimals;
  const pid = 0;
  const max = balance.toString();
  const isBalanceZero = max === '0' || !max;
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance);
  }, [balance]);
  return {
    balance,
    decimals,
    max,
    isBalanceZero,
    fullBalance,
    pid,
  };
};
export default useStakeWrap;
