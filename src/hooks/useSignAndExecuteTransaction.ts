"use client";

import { useSignAndExecuteTransaction as useSuiSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useSignAndExecuteTransaction as useIotaSignAndExecuteTransaction } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveSignAndExecuteTransactionResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiSignAndExecuteTransaction>
    : ReturnType<typeof useIotaSignAndExecuteTransaction>;

// 重載函數定義
export function useSignAndExecuteTransaction(): UnimoveSignAndExecuteTransactionResult<
  "sui" | "iota"
>;
export function useSignAndExecuteTransaction<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignAndExecuteTransactionResult<T>;
export function useSignAndExecuteTransaction<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignAndExecuteTransactionResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiSignAndExecuteTransaction() as UnimoveSignAndExecuteTransactionResult<T>;
  }

  return useIotaSignAndExecuteTransaction() as UnimoveSignAndExecuteTransactionResult<T>;
}

// 向後兼容的類型別名
export type UseSignAndExecuteTransactionResult =
  UnimoveSignAndExecuteTransactionResult<"sui" | "iota">;
