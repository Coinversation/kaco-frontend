import { Currency, ETHER, Token } from '@kaco/sdk';
import { chainKey } from 'config';
import { chainId } from 'config/constants/tokens';

export function currencyId(currency: Currency): string {
  if (currency === ETHER[chainId]) return chainKey;
  if (currency instanceof Token) return currency.address;
  throw new Error('invalid currency');
}

export default currencyId;
