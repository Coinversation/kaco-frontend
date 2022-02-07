import React, { useMemo } from 'react';
import styled from 'styled-components';
import DappstakeSubNav from './components/SubNav';
import { getFullDisplayBalance } from 'utils/formatBalance';
import StakeTableHeader from './components/StakeTableHeader';
import { useGetBnbBalance } from 'hooks/useTokenBalance';
import { SDN } from 'config/constants/tokens';
const decimals = SDN.decimals;
const pid = 0;
const StyledPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh-64px);
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 10px;
    min-height: calc(100vh-64px);
  }
`;
const StyledPage = ({ children, ...props }) => {
  return <StyledPageStyle {...props}>{children}</StyledPageStyle>;
};
const StakePageLayout = styled.div`
  min-height: 0px;
  width: 600px;
  background: linear-gradient(90deg, #f99747, #48eef0);
  border: 2px solid #272e32;
  box-shadow: 2px 4px 7px 1px rgba(9, 2, 18, 0.3);
  border-radius: 23px;
  padding: 0;
  // margin: 100px auto;
`;
const TableContent = styled.div`
  background: #12171a;
  border-radius: 20px;
  padding: 20px 30px 30px;
`;
// slippageAdjustedAmounts
const DappstakePage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const { balance } = useGetBnbBalance();
  const max = balance.toString();
  const isBalanceZero = max === '0' || !max;
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(balance);
  }, [balance]);
  return (
    <StakePageLayout>
      <StakeTableHeader />
      <TableContent>
        <DappstakeSubNav />
        <StyledPage
          balance={balance}
          decimals={decimals}
          max={max}
          isBalanceZero={isBalanceZero}
          fullBalance={fullBalance}
          pid={pid}
        >
          {children}
        </StyledPage>
      </TableContent>
    </StakePageLayout>
  );
};
export default DappstakePage;
