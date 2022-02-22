import React, { useState } from 'react';
import { Button, Skeleton } from '@kaco/uikit';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard';
import { BIG_ZERO } from 'utils/bigNumber';
import { getBalanceAmount } from 'utils/formatBalance';
import { useAppDispatch } from 'state';
import { fetchFarmUserDataAsync } from 'state/farms';
// import { usePriceCakeBusd } from 'state/farms/hooks';
import useToast from 'hooks/useToast';
import { useTranslation } from 'contexts/Localization';
import useHarvestFarm from '../../../hooks/useHarvestFarm';

import { ActionContainer, ActionTitles, ActionContent } from './styles';

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean;
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast();
  const earningsBigNumber = userData?.pendingReward || BIG_ZERO;
  // const cakePrice = usePriceCakeBusd();
  let earnings = BIG_ZERO;
  // let earningsBusd = 0;
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />;

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber);
    // earningsBusd = earnings.multipliedBy(cakePrice).toNumber();
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN);
  }

  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useHarvestFarm(pid);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();

  return (
    <ActionContainer style={{ maxWidth: '380px' }}>
      <ActionTitles>
        <div>
          <span>KAC</span>
          <span>{t('Rewards')}</span>
        </div>
        <div className="balance">
          {displayBalance}
          {/* {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )} */}
        </div>
      </ActionTitles>
      <ActionContent>
        <Button
          variant="primary"
          width="88px"
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true);
            try {
              await onReward();
              toastSuccess(
                `${t('Harvested')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'KAC' }),
              );
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              );
              console.error(55, e);
            } finally {
              setPendingTx(false);
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
          }}
          ml="4px"
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default HarvestAction;
