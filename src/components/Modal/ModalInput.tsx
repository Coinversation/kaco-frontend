import React from 'react';
import styled from 'styled-components';
import { Text, Input, InputProps, Flex, Link } from '@kaco/uikitv2';
import { useTranslation } from 'contexts/Localization';
import { BigNumber } from 'bignumber.js';

interface ModalInputProps {
  max: string;
  symbol: string;
  onSelectMax?: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  addLiquidityUrl?: string;
  inputTitle?: string;
  decimals?: number;
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: #272e32;
  color: ${({ theme }) => theme.colors.text};
  padding: 18px 30px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0 8px;
  border-width: 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
  background-color: rgba(0, 0, 0, 0);
`;

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`;

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation();
  const isBalanceZero = max === '0' || !max;

  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0';
    }
    const balanceBigNumber = new BigNumber(balance);
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString();
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN);
  };

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" mb="10px">
          <Text fontSize="12px">{inputTitle}</Text>
          <Flex alignItems="center">
            <Text fontSize="12px">{t('Balance: %balance%', { balance: displayBalance(max) })}</Text>
            <Text fontSize="12px" style={{ cursor: 'pointer' }} color="primary" ml="8px" onClick={onSelectMax}>
              {t('Max')}
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="spance-between">
          <Text fontSize="14px" color="white">
            {symbol}
          </Text>
          <StyledInput
            style={{ textAlign: 'right', height: '24px' }}
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure">
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  );
};

export default ModalInput;
