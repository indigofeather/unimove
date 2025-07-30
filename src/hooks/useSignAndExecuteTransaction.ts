"use client";

import { useSignAndExecuteTransaction as useSuiSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction as useIotaSignAndExecuteTransaction } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseSignAndExecuteTransactionResult = ReturnType<
  | typeof useSuiSignAndExecuteTransaction
  | typeof useIotaSignAndExecuteTransaction
>;

export function useSignAndExecuteTransaction(): UseSignAndExecuteTransactionResult {
  const chain = useChain();
  const useSignAndExecuteTransactionHook =
    chain === "sui"
      ? useSuiSignAndExecuteTransaction
      : useIotaSignAndExecuteTransaction;

  return useSignAndExecuteTransactionHook();
}
