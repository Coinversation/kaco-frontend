import { ethers } from 'ethers';
import { IDappStakingInterface } from 'utils/types';

export const UseStakeDApp = async (contract: IDappStakingInterface, account: string, value = '0') => {
  const tx = await contract.depositFor(account, {
    value: ethers.utils.parseEther(value),
  });
  const receipt = await tx.wait();
  return receipt.status;
};
