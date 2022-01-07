import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { Route, useRouteMatch, useLocation } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { RowType, Flex } from '@kaco/uikitv2';
import { ChainId } from 'config/constants/tokens';
import FlexLayout from 'components/Layout/Flex';
import Page from 'components/Layout/Page';
import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/farms/hooks';
import usePersistState from 'hooks/usePersistState';
import { Farm } from 'state/types';
import { getBalanceNumber } from 'utils/formatBalance';
import { getFarmApr } from 'utils/apr';
import { orderBy } from 'lodash';
import isArchivedPid from 'utils/farmHelpers';
import { latinise } from 'utils/latinise';
import Loading from 'components/Loading';
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard';
import Table from './components/FarmTable/FarmTable';
import { RowProps } from './components/FarmTable/Row';
import { DesktopColumnSchema, ViewMode } from './components/types';
import FarmHeader from './components/FarmHeader';
import { KACO_LP_PID } from 'config/constants/farms';
import useKacPerBlock from './hooks/useKacoPerBlock';

// const StyledImage = styled(Image)`
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 58px;
// `;
const NUMBER_OF_FARMS_VISIBLE = 12;

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number): string => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr === 0 && lpRewardsApr === 0) {
    return '0';
  }
  return null;
};

const getDisplayApy = (cakeRewardsApy?: number): string => {
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy === 0) {
    return '0';
  }
  return null;
};

const Farms: React.FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const { data: farmsLP, userDataLoaded } = useFarms();
  const cakePrice = usePriceCakeBusd();
  const [query] = useState('');
  const [viewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'kaco_farm_view' });
  const { account } = useWeb3React();
  const [sortOption] = useState('hot');
  const chosenFarmsLength = useRef(0);
  const kacPerBlock = useKacPerBlock();
  const isArchived = pathname.includes('archived');
  const isInactive = pathname.includes('history');
  const isActive = !isInactive && !isArchived;
  const [stakedOnly, setStakedOnly] = useState(false);
  const [filter, setFilter] = useState<string>('');

  usePollFarmsData(isArchived);

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded);

  // const activeFarms = farmsLP.filter(
  //   (farm) => farm.pid !== KACO_LP_PID && farm.multiplier !== '0X' && !isArchivedPid(farm.pid),
  // );
  const filtedFarmsLP = farmsLP.filter(
    (farm) =>
      farm.token.symbol.toLowerCase().includes(filter.toLowerCase()) ||
      farm.quoteToken.symbol.toLowerCase().includes(filter.toLowerCase()),
  );

  const activeFarms = farmsLP.filter(
    (farm) => farm.pid !== KACO_LP_PID && farm.multiplier !== '0X' && !isArchivedPid(farm.pid),
  );
  const inactiveFarms = filtedFarmsLP.filter(
    (farm) => farm.pid !== KACO_LP_PID && farm.multiplier === '0X' && !isArchivedPid(farm.pid),
  );
  const archivedFarms = filtedFarmsLP.filter((farm) => isArchivedPid(farm.pid));

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  );
  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  );
  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  );

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
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

        // console.log(
        //   `${farm.token.symbol}-${farm.quoteToken.symbol}`,
        //   'kacPerBlock',
        //   kacPerBlock.toFixed(5),
        //   'cakePrice',
        //   cakePrice.toFixed(5),
        //   'totalLiquidity',
        //   totalLiquidity.toFixed(5),
        //   'apr',
        //   cakeRewardsApr,
        //   'lpRewardsApr',
        //   lpRewardsApr,
        // );
        return { ...farm, apr: kacRewardsApr, lpRewardsApr, liquidity: totalLiquidity, apy: kacRewardApy };
      });

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase());
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery);
        });
      }
      return farmsToDisplayWithAPR;
    },
    [cakePrice, query, isActive, kacPerBlock],
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE);
  const [observerIsSet, setObserverIsSet] = useState(false);

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc');
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          );
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          );
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc');
        default:
          return farms;
      }
    };

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms);
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms);
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms);
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible);
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
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
  }, [chosenFarmsMemoized, observerIsSet]);

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm;
    const tokenAddress = token.address;
    const quoteTokenAddress = quoteToken.address;
    //WAIT
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '');

    const row: RowProps = {
      apr: {
        apy: getDisplayApy(farm.apy),
        apr: getDisplayApr(farm.apr, farm.lpRewardsApr),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apy,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    };

    return row;
  });

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema;

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id;
            case 'apr':
              if (a.original.apr.apr && b.original.apr.apr) {
                return Number(a.original.apr.apr) - Number(b.original.apr.apr);
              }

              return 0;
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings;
            default:
              return 1;
          }
        },
        sortable: column.sortable,
      }));

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />;
    }

    return (
      <FlexLayout style={{ background: 'rgba(0,0,0,0)' }}>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    );
  };

  return (
    <div style={{ background: 'rgba(0,0,0,0)' }}>
      <Page>
        <FarmHeader
          stakedOnly={stakedOnly}
          filter={filter}
          onFilterChange={setFilter}
          onStakedOnlyChange={setStakedOnly}
        />
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
      </Page>
    </div>
  );
};

export default Farms;
