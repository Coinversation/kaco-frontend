import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import farmsConfig from 'config/constants/farms';
import poolFarmsConfig from 'config/constants/pools';
import isArchivedPid from 'utils/farmHelpers';
// import priceHelperLpsConfig from 'config/constants/priceHelperLps';
import fetchFarms from './fetchFarms';
import fetchFarmsPrices from './fetchFarmsPrices';
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser';
import { FarmsState, Farm } from '../types';

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,

  userData: {
    allowance: '0',
    stakingTokenBalance: '0',
    stakedBalance: '0',
    pendingReward: '0',
  },
}));

const noAccountPoolFarmConfig = poolFarmsConfig.farmList.map((farm) => ({
  ...farm,

  userData: {
    allowance: '0',
    stakingTokenBalance: '0',
    stakedBalance: '0',
    pendingReward: '0',
  },
}));

const initialState: FarmsState = {
  data: noAccountFarmConfig,
  poolFarmData: noAccountPoolFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
};

export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid));

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<
  Farm[],
  // number[],
  { pids: number[]; priceVsBusdMap: Record<string, string> }
>('farms/fetchFarmsPublicDataAsync', async ({ pids, priceVsBusdMap }) => {
  const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid));

  // Add price helper farms
  const farmsWithPriceHelpers = farmsToFetch.concat([]);
  // console.log('farmsWithPriceHelpers------------', farmsWithPriceHelpers);
  let farmsWithPrices;
  try {
    const farms = await fetchFarms(farmsWithPriceHelpers);
    farmsWithPrices = fetchFarmsPrices(farms, priceVsBusdMap);
    // Filter out price helper LP config farms
    // console.log('farmsWithPrices', pids, farmsWithPrices);
  } catch (e) {
    console.log('eeeeeeeee', e);
  }

  const farmsWithoutHelperLps = farmsWithPrices.filter((farm: Farm) => {
    return farm.pid || farm.pid === 0;
  });

  return farmsWithoutHelperLps;
});

interface FarmUserDataResponse {
  pid: number;
  allowance: string;
  stakingTokenBalance: string;
  stakedBalance: string;
  pendingReward: string;
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids }) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid));
    const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch);
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch);
    const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch);
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch);

    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: farmAllowance,
        stakingTokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        pendingReward: userFarmEarnings[index],
      };
    });
  },
);

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload;
      state.loadArchivedFarmsData = loadArchivedFarmsData;
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid);
        return { ...farm, ...liveFarmData };
      });
      state.poolFarmData = state.poolFarmData.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid);
        return { ...farm, ...liveFarmData };
      });
    });

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl;
        const index = state.data.findIndex((farm) => farm.pid === pid);
        state.data[index] = { ...state.data[index], userData: userDataEl };
        state.poolFarmData[index] = { ...state.poolFarmData[index], userData: userDataEl };
      });
      state.userDataLoaded = true;
    });
  },
});

// Actions
export const { setLoadArchivedFarmsData } = farmsSlice.actions;

export default farmsSlice.reducer;
