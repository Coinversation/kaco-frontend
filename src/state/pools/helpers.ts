import BigNumber from 'bignumber.js';
import { Farm, Pool } from 'state/types';
import { getAddress } from 'utils/addressHelpers';

type UserData =
  | Pool['userData']
  | {
      allowance: number | string;
      stakingTokenBalance: number | string;
      stakedBalance: number | string;
      pendingReward: number | string;
    };

export const transformUserData = (userData: UserData) => {
  return {
    allowance: userData ? userData.allowance : '0',
    stakingTokenBalance: userData ? userData.stakingTokenBalance : '0',
    stakedBalance: userData ? userData.stakedBalance : '0',
    pendingReward: userData ? userData.pendingReward : '0',
  };
};

export const transformPool = (pool: Pool): Pool => {
  const { totalStaked, stakingLimit, userData, ...rest } = pool;

  return {
    ...rest,
    userData: transformUserData(userData),
    totalStaked: totalStaked,
    stakingLimit: stakingLimit,
  } as Pool;
};

export const getTokenPricesFromFarm = (farms: Farm[]) => {
  return farms.reduce((prices, farm) => {
    const quoteTokenAddress = getAddress(farm.quoteToken.address).toLocaleLowerCase();
    const tokenAddress = getAddress(farm.token.address).toLocaleLowerCase();
    /* eslint-disable no-param-reassign */
    if (!prices[quoteTokenAddress]) {
      prices[quoteTokenAddress] = new BigNumber(farm.quoteToken.busdPrice).toNumber();
    }
    if (!prices[tokenAddress]) {
      prices[tokenAddress] = new BigNumber(farm.token.busdPrice).toNumber();
    }
    /* eslint-enable no-param-reassign */
    return prices;
  }, {});
};
