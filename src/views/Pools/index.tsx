import PoolList from './Pools';
import FarmList from './Farms';
import usePersistState from 'hooks/usePersistState';
import PoolHeader from './components/PoolHeader/PoolHeader';
import { useRef, useState } from 'react';
import Page from 'components/Layout/Page';
import { Flex } from '@kaco/uikit';
import Loading from 'components/Loading';
import { useWeb3React } from '@web3-react/core';
import { usePools } from 'state/pools/hooks';
import styled from 'styled-components';
import { useFarms } from 'state/farms/hooks';
import { useLocation } from 'react-router-dom';
const BorderRadius = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;
const Pools = () => {
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'kaco_pool_staked' });
  const [filter, setFilter] = useState('');
  const { account } = useWeb3React();
  const { pools: poolsWithoutAutoVault, userDataLoaded: userDataReady } = usePools(account);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { poolFarmData: farmsLP, userDataLoaded } = useFarms();
  const { pathname } = useLocation();

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
          {/* <FarmList
            stakedOnly={stakedOnly}
            filter={filter}
            data={farmsLP}
            loadMoreRef={loadMoreRef}
            account={account}
            userDataReady={userDataLoaded}
            pathname={pathname}
          /> */}
          <PoolList
            stakedOnly={stakedOnly}
            filter={filter}
            // ...farmsLP
            data={[...poolsWithoutAutoVault]}
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
