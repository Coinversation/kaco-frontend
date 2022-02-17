import React, { lazy } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ResetCSS } from '@kaco/uikit';
import BigNumber from 'bignumber.js';
import useEagerConnect from 'hooks/useEagerConnect';
// import { usePollBlockNumber } from 'state/block/hooks';
// import { useFetchProfile } from 'state/profile/hooks';
import { PriceProvider } from 'contexts/PriceProvider';
import { DatePickerPortal } from 'components/DatePicker';
import GlobalStyle from './style/Global';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import { ToastListener } from './contexts/ToastsContext';
import PageLoader from './components/Loader/PageLoader';
import EasterEgg from './components/EasterEgg';
import history from './routerHistory';
// Views included in the main bundle
// import Pools from './views/Pools';
import Swap from './views/Swap';
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects';
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects';
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects';
import SideMenu from './components/SideMenu';
// import { usePollCoreFarmData } from './state/farms/hooks';

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'));
const Pools = lazy(() => import('./views/Pools'));
const Farms = lazy(() => import('./views/Farms'));
const FarmAuction = lazy(() => import('./views/FarmAuction'));
// const Lottery = lazy(() => import('./views/Lottery'));
// const Ifos = lazy(() => import('./views/Ifos'));
const NotFound = lazy(() => import('./views/NotFound'));
// const Collectibles = lazy(() => import('./views/Collectibles'));
// const Teams = lazy(() => import('./views/Teams'));
// const Team = lazy(() => import('./views/Teams/Team'));
// const Profile = lazy(() => import('./views/Profile'));
// const TradingCompetition = lazy(() => import('./views/TradingCompetition'));
// const Predictions = lazy(() => import('./views/Predictions'));
// const Voting = lazy(() => import('./views/Voting'));
// const Proposal = lazy(() => import('./views/Voting/Proposal'));
// const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'));
const AddLiquidity = lazy(() => import('./views/AddLiquidity'));
const Liquidity = lazy(() => import('./views/Pool'));
const PoolFinder = lazy(() => import('./views/PoolFinder'));
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'));
// const NftPools = lazy(() => import('./views/NftPools'));
const NftPool = lazy(() => import('./views/NftPool'));
const NftMint = lazy(() => import('./views/NftWallet/Mint'));
const NftBurn = lazy(() => import('./views/NftWallet/Burn'));

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  // usePollBlockNumber();
  useEagerConnect();
  // useFetchProfile();
  // usePollCoreFarmData();

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <PriceProvider />
      <SideMenu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/swap" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </SideMenu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  );
};

export default React.memo(App);
