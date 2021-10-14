import { Currency, ETHER, Token } from '@kaco/sdk';

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'SBY';
  if (currency instanceof Token) return currency.address;
  throw new Error('invalid currency');
}

export default currencyId;
