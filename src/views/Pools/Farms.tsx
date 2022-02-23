import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { ChainId } from 'config/constants/tokens';
import FlexLayout from 'components/Layout/Flex';
import { usePollFarmsData, usePriceCakeBusd } from 'state/farms/hooks';
import usePersistState from 'hooks/usePersistState';
import { Farm } from 'state/types';
import { getFarmApr } from 'utils/apr';
import isArchivedPid from 'utils/farmHelpers';
import PoolsTable from './components/PoolsTable/PoolsTable';
import { ViewMode } from './components/types';
import { KACO_LP_PID } from 'config/constants/farms';
import CakeVaultCard from './components/CakeVaultCard';
import PoolCard from './components/PoolCard/PoolCard';
import useKacPerBlock from 'views/Farms/hooks/useKacoPerBlock';
export interface FarmWithStakedValue extends Farm {
  apr?: number;
  apy?: number;
  lpRewardsApr?: number;
  liquidity?: BigNumber;
}
const CardLayout = styled(FlexLayout)`
  justify-content: center;
`;
// import { PriceContext } from 'contexts/PriceProvider';

// const StyledImage = styled(Image)`
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 58px;
// `;
const NUMBER_OF_FARMS_VISIBLE = 12;
interface IProps {
  stakedOnly: boolean;
  filter: string;
  data: Farm[];
  loadMoreRef: React.MutableRefObject<HTMLDivElement>;
  account: string;
  userDataReady: boolean;
  farmUserDataReady: boolean;
  pathname: string;
}

const Farms: React.FC<IProps> = (props) => {
  const { stakedOnly, filter, data: farmsLP, loadMoreRef, account, userDataReady, farmUserDataReady, pathname } = props;
  const cakePrice = usePriceCakeBusd();
  const [viewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' });
  const chosenFarmsLength = useRef(0);
  const kacPerBlock = useKacPerBlock();
  const isArchived = pathname.includes('archived');
  const isInactive = pathname.includes('history');
  const isActive = !isInactive && !isArchived;

  usePollFarmsData(isArchived);

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded

  // const activeFarms = farmsLP.filter(
  //   (farm) => farm.pid !== KACO_LP_PID && farm.multiplier !== '0X' && !isArchivedPid(farm.pid),
  // );
  const filtedFarmsLP = useMemo(
    () =>
      farmsLP.filter(
        (farm) =>
          farm.token.symbol.toLowerCase().includes(filter.toLowerCase()) ||
          farm.quoteToken.symbol.toLowerCase().includes(filter.toLowerCase()),
      ),
    [farmsLP, filter],
  );

  const activeFarms = useMemo(
    () => filtedFarmsLP.filter((farm) => farm.pid !== KACO_LP_PID && !isArchivedPid(farm.pid)),
    [filtedFarmsLP],
  );
  const inactiveFarms = useMemo(
    () =>
      filtedFarmsLP.filter((farm) => farm.pid !== KACO_LP_PID && farm.multiplier === '0X' && !isArchivedPid(farm.pid)),
    [filtedFarmsLP],
  );
  const archivedFarms = useMemo(() => filtedFarmsLP.filter((farm) => isArchivedPid(farm.pid)), [filtedFarmsLP]);

  const stakedOnlyFarms = useMemo(
    () => activeFarms.filter((farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)),
    [activeFarms],
  );

  const stakedArchivedFarms = useMemo(
    () => archivedFarms.filter((farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)),
    [archivedFarms],
  );

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm;
        }

        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice);
        const { kacRewardsApr, lpRewardsApr, kacRewardApy } = isActive
          ? getFarmApr(
              kacPerBlock,
              new BigNumber(farm.poolWeight),
              cakePrice,
              totalLiquidity,
              farm.lpAddresses[ChainId.MAINNET],
            )
          : { kacRewardsApr: 0, lpRewardsApr: 0, kacRewardApy: 0 };
        return { ...farm, apr: kacRewardsApr, lpRewardsApr, liquidity: totalLiquidity, apy: kacRewardApy };
      });

      return farmsToDisplayWithAPR;
    },
    [cakePrice, isActive, kacPerBlock],
  );

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE);
  const [observerIsSet, setObserverIsSet] = useState(false);

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms);
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(inactiveFarms);
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms);
    }

    return chosenFarms.slice(0, numberOfFarmsVisible);
  }, [
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ]);

  chosenFarmsLength.current = chosenFarmsMemoized.length;

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE;
          }
          return farmsCurrentlyVisible;
        });
      }
    };

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      });
      loadMoreObserver.observe(loadMoreRef.current);
      setObserverIsSet(true);
    }
  }, [chosenFarmsMemoized, observerIsSet, loadMoreRef]);

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && chosenFarmsMemoized.length) {
      return (
        <PoolsTable
          data={chosenFarmsMemoized}
          account={account}
          userDataReady={userDataReady}
          farmUserDataReady={farmUserDataReady}
        />
      );
    }
    return (
      <CardLayout>
        {chosenFarmsMemoized.map((pool) =>
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

export default Farms;
