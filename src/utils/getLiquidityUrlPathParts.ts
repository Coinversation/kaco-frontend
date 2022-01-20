// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { chainKey } from 'config';
import { chainId } from 'config/constants/tokens';
import { getWbnbAddress } from './addressHelpers';

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const wBNBAddressString = getWbnbAddress();
  const quoteTokenAddressString: string = quoteTokenAddress ? quoteTokenAddress[chainId] : null;
  const tokenAddressString: string = tokenAddress ? tokenAddress[chainId] : null;
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wBNBAddressString ? chainKey : quoteTokenAddressString;
  const secondPart = !tokenAddressString || tokenAddressString === wBNBAddressString ? chainKey : tokenAddressString;
  return `${firstPart}/${secondPart}`;
};

export default getLiquidityUrlPathParts;
