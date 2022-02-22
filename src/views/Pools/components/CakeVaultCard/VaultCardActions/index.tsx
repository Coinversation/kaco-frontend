import React from 'react';
import styled from 'styled-components';
import { Flex, Text, Box } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import { Pool } from 'state/types';
import VaultApprovalAction from './VaultApprovalAction';
import VaultStakeActions from './VaultStakeActions';
import { useCheckVaultApprovalStatus } from '../../../hooks/useApprove';

const InlineText = styled(Text)`
  display: inline;
`;

const CakeVaultCardActions: React.FC<{
  pool: Pool;
  accountHasSharesStaked: boolean;
  isLoading: boolean;
}> = ({ pool, accountHasSharesStaked, isLoading }) => {
  const { stakingToken, userData } = pool;
  const { t } = useTranslation();

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus();

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Box display="inline">
          <InlineText
            color={accountHasSharesStaked ? 'secondary' : 'textSubtle'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? stakingToken.symbol : t('Stake')}{' '}
          </InlineText>
          <InlineText
            color={accountHasSharesStaked ? 'textSubtle' : 'secondary'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? t('Staked (compounding)') : `${stakingToken.symbol}`}
          </InlineText>
        </Box>
        {isVaultApproved ? (
          <VaultStakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={userData.stakingTokenBalance}
            accountHasSharesStaked={accountHasSharesStaked}
          />
        ) : (
          <VaultApprovalAction isLoading={isLoading} setLastUpdated={setLastUpdated} />
        )}
      </Flex>
    </Flex>
  );
};

export default CakeVaultCardActions;
