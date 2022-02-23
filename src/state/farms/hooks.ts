import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { getBalanceAmount } from 'utils/formatBalance';
import { farmsConfig } from 'config/constants';
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, nonArchivedFarms } from '.';
import { State, Farm, FarmsState } from '../types';
// import { BUSD_BNB_LP_PID, KACO_BNB_LP_PID } from 'config/constants/farms';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import tokens from 'config/constants/tokens';
import { usePrice } from 'state/price/hooks';

export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { priceVsBusdMap } = usePrice();

  useEffect(() => {
    if (Object.keys(priceVsBusdMap).length === 0) {
      return;
    }
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms;
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid);

    dispatch(fetchFarmsPublicDataAsync({ pids: pids, priceVsBusdMap: priceVsBusdMap }));

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }));
    }
  }, [includeArchive, dispatch, account, priceVsBusdMap]);
};

/**
 * Fetches the "core" farm data used globally
 * 1 = CAKE-BNB LP
 * 2 = BUSD-BNB LP
 */
// export const usePollCoreFarmData = () => {
//   const dispatch = useAppDispatch();
//   const { fastRefresh } = useRefresh();
//   const { priceVsBusdMap } = useContext(PriceContext);

//   useEffect(() => {
//     dispatch(fetchFarmsPublicDataAsync({ pids: [KACO_BNB_LP_PID, BUSD_BNB_LP_PID], priceVsBusdMap }));
//   }, [dispatch, fastRefresh, priceVsBusdMap]);
// };

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms);
  return farms;
};

export const useFarmFromPid = (pid, key: string): Farm => {
  const _key = key === 'pool' ? 'poolFarmData' : 'data';
  const farm = useSelector((state: State) => state.farms[_key].find((f) => f.pid === pid));
  return farm;
};

export const useFarmFromLpSymbol = (lpSymbol: string, key: string): Farm => {
  const _key = key === 'pool' ? 'poolFarmData' : 'data';
  const farm = useSelector((state: State) => state.farms[_key].find((f) => f.lpSymbol === lpSymbol));
  return farm;
};

export const useFarmUser = (pid, key: string) => {
  const farm = useFarmFromPid(pid, key);

  return {
    allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    stakingTokenBalance: farm?.userData ? new BigNumber(farm.userData.stakingTokenBalance) : BIG_ZERO,
    stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    pendingReward: farm?.userData ? new BigNumber(farm.userData.pendingReward) : BIG_ZERO,
  };
};

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number, key: string): BigNumber => {
  const farm = useFarmFromPid(pid, key);
  return farm && new BigNumber(farm.token.busdPrice);
};

export const useLpTokenPrice = (symbol: string, key: string) => {
  const farm = useFarmFromLpSymbol(symbol, key);
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid, key);
  let lpTokenPrice = BIG_ZERO;

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal);
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply));
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }

  return lpTokenPrice;
};

// /!\ Deprecated , use the BUSD hook in /hooks

export const usePriceBnbBusd = (): BigNumber => {
  const { priceVsBusdMap } = usePrice();
  const { chainId } = useActiveWeb3React();

  const bnbPrice = useMemo(
    () => priceVsBusdMap[tokens.wbnb.address[chainId].toLowerCase()] || new BigNumber(0),
    [priceVsBusdMap, chainId],
  );

  return new BigNumber(bnbPrice);
};

export const usePriceCakeBusd = (): BigNumber => {
  const { priceVsBusdMap } = usePrice();
  const { chainId } = useActiveWeb3React();

  const kacoPrice = useMemo(
    () => priceVsBusdMap[tokens.kaco.address[chainId].toLowerCase()] || new BigNumber(0),
    [priceVsBusdMap, chainId],
  );

  return new BigNumber(kacoPrice);
};
