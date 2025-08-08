"use client";

import { useSignTransaction as useSuiSignTransaction } from "@mysten/dapp-kit";
import { useSignTransaction as useIotaSignTransaction } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveSignTransactionResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiSignTransaction>
    : ReturnType<typeof useIotaSignTransaction>;

// 重載函數定義
export function useSignTransaction(): UnimoveSignTransactionResult<
  "sui" | "iota"
>;
export function useSignTransaction<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignTransactionResult<T>;
export function useSignTransaction<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignTransactionResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiSignTransaction() as UnimoveSignTransactionResult<T>;
  }

  return useIotaSignTransaction() as UnimoveSignTransactionResult<T>;
}

// 向後兼容的類型別名
export type UseSignTransactionResult = UnimoveSignTransactionResult<
  "sui" | "iota"
>;
