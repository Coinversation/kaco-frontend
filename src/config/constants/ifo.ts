import tokens, { chainId } from './tokens';
import farms from './farms';
import { Ifo, Token } from './types';
import { CHAINKEY } from '@kaco/sdkv2';
import { chainKey } from 'config';

const cakeBnbLpToken: Token = {
  symbol: farms[1].lpSymbol,
  address: farms[1].lpAddresses,
  decimals: 18,
};

const ifos: Ifo[] = [];

export default ifos;
