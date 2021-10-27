import React, { Context, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import usePairLength from 'views/Home/hooks/usePairsLength';
import fetchPairsAddress from 'views/Home/hooks/fetchPairsAddress';
import fetchPairsData, { PairsMap } from 'views/Home/hooks/fetchPairsData';
import tokens, { chainId } from 'config/constants/tokens';
import tokenlist from 'config/constants/tokenLists/pancake-default.tokenlist.json';
function getPriceVsBusd(
  tokenAddress: string,
  source: PairsMap,
  priceVsBusdMap: { [key: string]: BigNumber },
  from?: string,
): BigNumber | undefined {
  const busdAddress = (tokens.usdc.address[chainId] as string).toLowerCase();

  Object.entries(source[tokenAddress]).find(([quoteTokenAddress, pair]) => {
    if (quoteTokenAddress === from) {
      return false;
    }

    if (quoteTokenAddress.toLowerCase() === busdAddress) {
      priceVsBusdMap[tokenAddress] = pair.vs;

      return true;
    }

    const quoteVsBusdPrice =
      priceVsBusdMap[quoteTokenAddress] || getPriceVsBusd(quoteTokenAddress, source, priceVsBusdMap, tokenAddress);

    if (quoteVsBusdPrice) {
      priceVsBusdMap[tokenAddress] = quoteVsBusdPrice.times(pair.vs);

      return true;
    }

    return false;
  });

  // console.log(`${tokenAddress.slice(0, 5)}`, priceVsBusdMap[tokenAddress].toFixed(5));
  return priceVsBusdMap[tokenAddress];
}

interface PriceContextProps {
  priceVsBusdMap: Record<string, BigNumber>;
  total: BigNumber;
}

export const PriceContext: Context<PriceContextProps> = React.createContext({} as unknown as PriceContextProps);

export const PriceProvider = React.memo(({ children }: { children: React.ReactNode }): React.ReactElement => {
  const pairsCount = usePairLength();
  const [total, setTotal] = useState<BigNumber>(new BigNumber(0));
  const [priceVsBusdMap, setPriceVsBusdMap] = useState<Record<string, BigNumber>>({});

  useEffect(() => {
    fetchPairsAddress(pairsCount)
      .then(fetchPairsData)
      .then(({ countup, source }) => {
        const priceVsBusdMap: Record<string, BigNumber> = {};

        Object.keys(source).forEach((tokenAddress) => getPriceVsBusd(tokenAddress, source, priceVsBusdMap));

        // console.log(
        //   'priceVsBusdMap',
        //   Object.keys(priceVsBusdMap).map((key) => `${key.slice(0, 7)}-${priceVsBusdMap[key].toFixed(5)}`),
        //   'countup',
        //   Object.keys(countup).map(
        //     (key) =>
        //       `${
        //         tokenlist.tokens.find((t) => t.address.toLowerCase() === key.toLowerCase())?.symbol || key
        //       }: $${priceVsBusdMap[key].toFixed(2)} * ${countup[key].toFixed(2)}`,
        //   ),
        // );
        const total = Object.entries(countup).reduce((all, [tokenAddress, amount]) => {
          const price = priceVsBusdMap[tokenAddress] || new BigNumber(0);

          all = all.plus(amount.times(price));

          return all;
        }, new BigNumber(0));

        setPriceVsBusdMap(priceVsBusdMap);
        setTotal(total);
      });
  }, [pairsCount]);

  return (
    <PriceContext.Provider
      value={{
        priceVsBusdMap,
        total,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
});
