import React, { lazy } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { ResetCSS } from '@kaco/uikit';
import BigNumber from 'bignumber.js';
// import useEagerConnect from 'hooks/useEagerConnect';
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
const Swap = lazy(() => import('./views/Swap'));
const Farms = lazy(() => import('./views/Farms'));
const Pools = lazy(() => import('./views/Pools'));

const DappstakeStake = lazy(() => import('./views/Dappstake/Stake'));
const DappstakeUnbind = lazy(() => import('./views/Dappstake/Unbind'));

// const FarmAuction = lazy(() => import('./views/FarmAuction'));
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
  // useEagerConnect();
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
            {/* <Route exact path="/farms/auction">
              <FarmAuction />
            </Route> */}
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/dappstake/stake">
              <DappstakeStake />
            </Route>
            {/* <Route path="/dappstake/unstake">
                <DappstakeUnstake />
              </Route> */}
            <Route path="/dappstake/unbind">
              <DappstakeUnbind />
            </Route>
            <Route path="/dappstake">
              <Redirect to="/dappstake/stake" />
            </Route>
            {/* <Route path="/lottery">
              <Lottery />
            </Route> */}
            {/* <Route path="/ifo">
              <Ifos />
            </Route> */}
            {/* <Route path="/collectibles">
              <Collectibles />
            </Route> */}
            {/* <Route exact path="/nft/pools">
              <NftPools />
            </Route> */}
            <Route path="/nft/pool/:pairAddress">
              <NftPool />
            </Route>
            <Route path="/nft/wallet/burn">
              <NftBurn />
            </Route>
            <Route path="/nft/wallet/mint">
              <NftMint />
            </Route>
            {/* <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route path="/prediction">
              <Predictions />
            </Route>
            <Route exact path="/voting">
              <Voting />
            </Route>
            <Route exact path="/voting/proposal/create">
              <CreateProposal />
            </Route>
            <Route path="/voting/proposal/:id">
              <Proposal />
            </Route> */}

            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/nft/wallet">
              <Redirect to="/nft/wallet/mint" />
            </Route>
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            {/* <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route> */}

            {/* 404 */}
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
