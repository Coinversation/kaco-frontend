import React, { Context, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import usePairLength from 'views/Home/hooks/usePairsLength';
import fetchPairsAddress from 'views/Home/hooks/fetchPairsAddress';
import fetchPairsData from 'views/Home/hooks/fetchPairsData';
import useRefresh from 'hooks/useRefresh';
import { usePrice } from 'state/price/hooks';
interface TotalLiquidityContextProps {
  total: BigNumber;
}

export const TotalLiquidityContext: Context<TotalLiquidityContextProps> = React.createContext(
  {} as unknown as TotalLiquidityContextProps,
);

export const TotalLiquidityProvider = React.memo(({ children }: { children: React.ReactNode }): React.ReactElement => {
  const pairsCount = usePairLength();
  const [total, setTotal] = useState<BigNumber>(new BigNumber(0));
  const { priceVsBusdMap } = usePrice();
  const { slowRefresh } = useRefresh();
  useEffect(() => {
    fetchPairsAddress(pairsCount)
      .then(fetchPairsData)
      .then(({ countup }) => {
        const total = Object.entries(countup).reduce((all, [tokenAddress, amount]) => {
          const price = new BigNumber(priceVsBusdMap[tokenAddress] || 0);

          all = all.plus(amount.times(price));
          return all;
        }, new BigNumber(0));
        setTotal(total);
      });
  }, [pairsCount, slowRefresh, priceVsBusdMap]);

  return (
    <TotalLiquidityContext.Provider
      value={{
        total,
      }}
    >
      {children}
    </TotalLiquidityContext.Provider>
  );
});
