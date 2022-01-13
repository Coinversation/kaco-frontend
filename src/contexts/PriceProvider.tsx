import React from 'react';
import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/pancake-default.tokenlist.json';
import { usePollPrice } from 'state/price/hooks';

export const PriceProvider = React.memo(() => {
  DEFAULT_TOKEN_LIST.tokens.map((v) => GetCurrencyExact(v.address));
  return null;
});

const GetCurrencyExact = (address: string): React.ReactElement => {
  usePollPrice(address);
  return null;
};
