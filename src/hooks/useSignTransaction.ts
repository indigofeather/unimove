"use client";

import { useSignTransaction as useSuiSignTransaction } from "@mysten/dapp-kit";
import { useSignTransaction as useIotaSignTransaction } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseSignTransactionResult = ReturnType<
  typeof useSuiSignTransaction | typeof useIotaSignTransaction
>;

export function useSignTransaction(): UseSignTransactionResult {
  const chain = useChain();
  const useSignTransactionHook =
    chain === "sui" ? useSuiSignTransaction : useIotaSignTransaction;

  return useSignTransactionHook();
}
