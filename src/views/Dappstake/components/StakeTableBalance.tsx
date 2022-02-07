import React from 'react';
import BigNumber from 'bignumber.js';
import { parseUnits } from 'ethers/lib/utils';
import { formatBigNumber } from 'utils/formatBalance';
import { Text } from '@kaco/uikit';
import styled from 'styled-components';
const TextStyle = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 10px;
  color: #9da6a6;
  i {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Balance = (props) => {
  const {
    balance = new BigNumber(0),
    decimals,
    isBalanceZero,
    symbol,
  }: {
    balance: BigNumber;
    decimals: number;
    isBalanceZero: boolean;
    symbol: string;
  } = props;
  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0';
    }

    const balanceUnits = parseUnits(balance, decimals);
    return formatBigNumber(balanceUnits, decimals, decimals);
  };
  return (
    <TextStyle>
      Balance:{' '}
      <i>
        {displayBalance(balance.toString())} {symbol}
      </i>
    </TextStyle>
  );
};
export default Balance;
