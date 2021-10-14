// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { chainId } from 'config/constants/tokens';
import { getWbnbAddress } from './addressHelpers';

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const wBNBAddressString = getWbnbAddress();
  const quoteTokenAddressString: string = quoteTokenAddress ? quoteTokenAddress[chainId] : null;
  const tokenAddressString: string = tokenAddress ? tokenAddress[chainId] : null;
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wBNBAddressString ? 'SBY' : quoteTokenAddressString;
  const secondPart = !tokenAddressString || tokenAddressString === wBNBAddressString ? 'SBY' : tokenAddressString;
  return `${firstPart}/${secondPart}`;
};

export default getLiquidityUrlPathParts;
