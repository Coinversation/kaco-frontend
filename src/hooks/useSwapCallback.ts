import { Contract } from '@ethersproject/contracts';
import { JSBI, Percent, Router, SwapParameters, Trade, TradeType } from '@kaco/sdk';
import { useMemo } from 'react';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../config/constants';
import { useTransactionAdder } from '../state/transactions/hooks';
import { getRouterContract, isAddress, shortenAddress } from '../utils';
import isZero from '../utils/isZero';
import useTransactionDeadline from './useTransactionDeadline';
import useENS from './ENS/useENS';
import { DEFAULT_GAS_LIMIT_40w } from 'config';

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  contract: Contract;
  parameters: SwapParameters;
}

interface SuccessfulCall {
  call: SwapCall;
}

interface FailedCall {
  call: SwapCall;
  error: Error;
}

type EstimatedSwapCall = SuccessfulCall | FailedCall;

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
function useSwapCallArguments(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React();

  const { address: recipientAddress } = useENS(recipientAddressOrName);
  const recipient = recipientAddressOrName === null ? account : recipientAddress;
  const deadline = useTransactionDeadline();

  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return [];

    const contract: Contract | null = getRouterContract(chainId, library, account);
    if (!contract) {
      return [];
    }

    const swapMethods = [];

    swapMethods.push(
      Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
        recipient,
        deadline: deadline.toNumber(),
      }),
    );

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
          recipient,
          deadline: deadline.toNumber(),
        }),
      );
    }

    return swapMethods.map((parameters) => ({ parameters, contract }));
  }, [account, allowedSlippage, chainId, deadline, library, recipient, trade]);
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
): { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { account, chainId, library } = useActiveWeb3React();

  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName);

  const addTransaction = useTransactionAdder();

  const { address: recipientAddress } = useENS(recipientAddressOrName);
  const recipient = recipientAddressOrName === null ? account : recipientAddress;

  return useMemo(() => {
    if (!trade || !library || !account || !chainId) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' };
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' };
      }
      return { state: SwapCallbackState.LOADING, callback: null, error: null };
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwap(): Promise<string> {
        const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
          swapCalls.map((call) => {
            return {
              call,
            };
          }),
        );

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        const successfulEstimation = estimatedCalls.find((el): el is SuccessfulCall => true);

        const {
          call: {
            contract,
            parameters: { methodName, args, value },
          },
        } = successfulEstimation;

        return contract[methodName](...args, {
          gasLimit: DEFAULT_GAS_LIMIT_40w,
          ...(value && !isZero(value) ? { value, from: account } : { from: account }),
        })
          .then((response: any) => {
            const inputSymbol = trade.inputAmount.currency.symbol;
            const outputSymbol = trade.outputAmount.currency.symbol;
            const inputAmount = trade.inputAmount.toSignificant(3);
            const outputAmount = trade.outputAmount.toSignificant(3);

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`;
            const withRecipient =
              recipient === account
                ? base
                : `${base} to ${
                    recipientAddressOrName && isAddress(recipientAddressOrName)
                      ? shortenAddress(recipientAddressOrName)
                      : recipientAddressOrName
                  }`;

            addTransaction(response, {
              summary: withRecipient,
            });

            return response.hash;
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.');
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, methodName, args, value);
              throw new Error(`Swap failed: ${error.message}`);
            }
          });
      },
      error: null,
    };
  }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction]);
}
