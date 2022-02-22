import PoolList from './Pools';
import usePersistState from 'hooks/usePersistState';
import PoolHeader from './components/PoolHeader/PoolHeader';
import { useCallback, useRef, useState } from 'react';
import Page from 'components/Layout/Page';
import { Flex } from '@kaco/uikit';
import Loading from 'components/Loading';
import { useWeb3React } from '@web3-react/core';
import { usePools } from 'state/pools/hooks';
import styled from 'styled-components';
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks';
import { useLocation } from 'react-router-dom';
import { PoolFarm } from 'state/types';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/CardActionsContainer';
import BigNumber from 'bignumber.js';
import { getFarmApr } from 'utils/apr';
import useKacPerBlock from 'views/Farms/hooks/useKacoPerBlock';
import { chainId } from 'config/constants/tokens';
const BorderRadius = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;
export interface PoolFarmWithStakedValue extends PoolFarm {
  apr?: number;
}
const Pools = () => {
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'kaco_pool_staked' });
  const [filter, setFilter] = useState('');
  const { account } = useWeb3React();
  const { pools: poolsWithoutAutoVault, userDataLoaded: userDataReady } = usePools(account);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { poolFarmData: farmsLP, userDataLoaded } = useFarms();
  const { pathname } = useLocation();

  const kacPerBlock = useKacPerBlock();
  const cakePrice = usePriceCakeBusd();

  const farmsList = useCallback(
    (farmsToDisplay: PoolFarm[]): PoolFarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: PoolFarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm;
        }

        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice);
        const { kacRewardsApr, lpRewardsApr, kacRewardApy } = getFarmApr(
          kacPerBlock,
          new BigNumber(farm.poolWeight),
          cakePrice,
          totalLiquidity,
          farm.lpAddresses[chainId],
        );

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
      return farmsToDisplayWithAPR;
    },
    [cakePrice, kacPerBlock],
  );

  return (
    <div style={{ background: 'rgba(0,0,0,0)' }}>
      <Page>
        <PoolHeader
          stakedOnly={stakedOnly}
          filter={filter}
          onFilterChange={setFilter}
          onStakedOnlyChange={setStakedOnly}
          placeholder="Search Pool"
        />
        <BorderRadius>
          <PoolList
            stakedOnly={stakedOnly}
            filter={filter}
            data={[...farmsList(farmsLP), ...poolsWithoutAutoVault]}
            loadMoreRef={loadMoreRef}
            account={account}
            userDataReady={userDataReady}
            pathname={pathname}
          />
        </BorderRadius>
        {account && !userDataReady && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
      </Page>
    </div>
  );
};
export default Pools;
