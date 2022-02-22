import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
import usePersistState from 'hooks/usePersistState';
import { useFetchCakeVault, useCakeVault, useFetchPublicPoolsData } from 'state/pools/hooks';
import { usePollFarmsData } from 'state/farms/hooks';
import { latinise } from 'utils/latinise';
import FlexLayout from 'components/Layout/Flex';
import { Pool } from 'state/types';
import PoolCard from './components/PoolCard/PoolCard';
import CakeVaultCard from './components/CakeVaultCard';
import PoolsTable from './components/PoolsTable/PoolsTable';
import { ViewMode } from './components/ToggleView/ToggleView';
import { getAprData, getCakeVaultEarnings } from './helpers';

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`;

const NUMBER_OF_FARMS_VISIBLE = 12;
interface IPools {
  stakedOnly: boolean;
  filter: string;
  data: Pool[];
  loadMoreRef: React.MutableRefObject<HTMLDivElement>;
  account: string;
  userDataReady: boolean;
  pathname: string;
}
const Pools: React.FC<IPools> = (props) => {
  const { stakedOnly, filter, data, loadMoreRef, account, userDataReady, pathname } = props;
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_FARMS_VISIBLE);
  const [observerIsSet, setObserverIsSet] = useState(false);

  const [viewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'kaco_pool_view' });
  const [sortOption] = useState('hot');
  const chosenDataLength = useRef(0);
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault();

  const accountHasVaultShares = userShares && userShares.gt(0);
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100;
  const [finishedPools, openPools] = useMemo(() => partition(data, (pool) => pool.isFinished), [data]);
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares;
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0);
      }),
    [finishedPools, accountHasVaultShares],
  );

  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares;
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0);
      }),
    [openPools, accountHasVaultShares],
  );

  usePollFarmsData();
  useFetchCakeVault();
  useFetchPublicPoolsData();
  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((dataCurrentlyVisible) => {
          if (dataCurrentlyVisible <= chosenDataLength.current) {
            return dataCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE;
          }
          return dataCurrentlyVisible;
        });
      }
    };
    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      });
      loadMoreObserver.observe(loadMoreRef.current);
      setObserverIsSet(true);
    }
  }, [observerIsSet, loadMoreRef]);
  const showFinishedPools = pathname.includes('history');

  const sortPools = (dataToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        return orderBy(
          dataToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        );
      case 'earned':
        return orderBy(
          dataToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0;
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber();
          },
          'desc',
        );
      case 'totalStaked':
        return orderBy(
          dataToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        );
      default:
        return dataToSort;
    }
  };
  let chosenData;
  if (showFinishedPools) {
    chosenData = stakedOnly ? stakedOnlyFinishedPools : finishedPools;
  } else {
    chosenData = stakedOnly ? stakedOnlyOpenPools : openPools;
  }
  if (filter) {
    const lowercaseQuery = latinise(filter.toLowerCase());
    chosenData = chosenData.filter((pool) => latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery));
  }
  chosenData.push(...(finishedPools || []));
  chosenData = sortPools(chosenData).slice(0, numberOfPoolsVisible);
  chosenDataLength.current = chosenData.length;

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && chosenData.length) {
      return <PoolsTable data={chosenData} account={account} userDataReady={userDataReady} />;
    }
    return (
      <CardLayout>
        {chosenData.map((pool) =>
          pool.isAutoVault ? (
            <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
          ) : (
            <PoolCard key={pool.sousId} pool={pool} account={account} />
          ),
        )}
      </CardLayout>
    );
  };
  return <>{renderContent()}</>;
};
export default Pools;
