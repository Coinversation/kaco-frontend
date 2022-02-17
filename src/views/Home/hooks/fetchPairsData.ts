import { BIG_TEN } from '../../../utils/bigNumber';
import { BigNumber } from '@ethersproject/bignumber';
import RealBigNumber from 'bignumber.js';
import ABI from 'config/abi/pair.json';
import { BIG_ZERO } from 'utils/bigNumber';
import multicall from 'utils/multicall';

type PairAmount = {
  tokenAmount: RealBigNumber;
  quoteTokenAmount: RealBigNumber;
  vs: RealBigNumber;
};

export type PairsMap = {
  [key: string]: {
    [key: string]: PairAmount;
  };
};

type TokenAmountMap = {
  [key: string]: RealBigNumber;
};

export type PairsData = {
  source: PairsMap;
  countup: TokenAmountMap;
};

const fetchPairsData = async (addresses: string[]): Promise<PairsData> => {
  const calls = (addresses || [])
    .map((address) => [
      {
        address: address,
        name: 'getReserves',
      },
      {
        address: address,
        name: 'token0',
      },
      {
        address: address,
        name: 'token1',
      },
      {
        address: address,
        name: 'decimals',
      },
    ])
    .reduce((calls, curr) => calls.concat(curr), []);

  const results = await multicall(ABI, calls, 'jjjjj');
  const countup: TokenAmountMap = {};
  const pairsMap: PairsMap = {};
  if (results && results.length) {
    for (let i = 0; i < results.length - 1; i += 4) {
      const [_amount0, _amount1] = results[i + 0] as [BigNumber, BigNumber];
      const token0Address = (results[i + 1][0] as string).toLowerCase();
      const token1Address = (results[i + 2][0] as string).toLowerCase();
      const _decimals = results[i + 3][0] as BigNumber;

      let [amount0, amount1] = [new RealBigNumber(_amount0.toString()), new RealBigNumber(_amount1.toString())];
      const decimals = new RealBigNumber(BIG_TEN).pow(new RealBigNumber(_decimals.toString()));

      amount0 =
        token0Address.toLowerCase() === '0xfa9343c3897324496a05fc75abed6bac29f8a40f'
          ? amount0.div(decimals.div(new RealBigNumber('1000000000000')))
          : amount0.div(decimals);
      amount1 =
        token1Address.toLowerCase() === '0xfa9343c3897324496a05fc75abed6bac29f8a40f'
          ? amount1.div(decimals.div(new RealBigNumber('1000000000000')))
          : amount1.div(decimals);
      // amount1 = amount1.div(decimals);

      // if (token0Address.toLowerCase() === '0xfa9343c3897324496a05fc75abed6bac29f8a40f') {

      // }

      if (!amount0.isGreaterThan(BIG_ZERO) || !amount1.isGreaterThan(BIG_ZERO)) {
        continue;
      }

      countup[token0Address] = countup[token0Address] ? countup[token0Address].plus(amount0) : amount0;
      countup[token1Address] = countup[token1Address] ? countup[token1Address].plus(amount1) : amount1;

      pairsMap[token0Address] = pairsMap[token0Address] || {};
      pairsMap[token1Address] = pairsMap[token1Address] || {};
      pairsMap[token0Address][token1Address] = pairsMap[token0Address][token1Address] || {
        tokenAmount: amount0,
        quoteTokenAmount: amount1,
        vs: amount1.div(amount0),
      };
      pairsMap[token1Address][token0Address] = pairsMap[token1Address][token0Address] || {
        tokenAmount: amount1,
        quoteTokenAmount: amount0,
        vs: amount0.div(amount1),
      };

      // console.log(
      //   addresses[i / 4],
      //   // `${addresses[i / 4].slice(0, 5)}`,
      //   'token0Address',
      //   token0Address,
      //   'token1Address',
      //   token1Address,
      //   'amount0, amount1',
      //   amount0.toFixed(5),
      //   amount1.toFixed(5),
      //   'vs',
      //   amount1.div(amount0).toFixed(6),
      //   amount0.div(amount1).toFixed(6),
      // );
    }
  }
  return { countup, source: pairsMap };
};

export default fetchPairsData;
