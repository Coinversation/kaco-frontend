import { BigNumber } from '@ethersproject/bignumber';
import { useContract } from 'hooks/useContract';
import { useSingleCallResult } from 'state/multicall/hooks';
import Abi from 'config/abi/factory.json';
import { FACTORY_ADDRESS } from 'config/constants';
import { chainId } from 'config/constants/tokens';

function usePairLength(): number {
  const contract = useContract(FACTORY_ADDRESS[chainId], Abi);
  const length: BigNumber | undefined = useSingleCallResult(contract, 'allPairsLength')?.result?.[0];
  console.log('usePairLength length', length);
  return length?.toNumber() || 0;
}

export default usePairLength;
