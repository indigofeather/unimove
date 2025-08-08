"use client";

import { useAccounts as useSuiAccounts } from "@mysten/dapp-kit";
import { useAccounts as useIotaAccounts } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveAccountsResult<T extends "sui" | "iota"> = T extends "sui"
  ? ReturnType<typeof useSuiAccounts>
  : ReturnType<typeof useIotaAccounts>;

// 重載函數定義
export function useAccounts(): UnimoveAccountsResult<"sui" | "iota">;
export function useAccounts<T extends "sui" | "iota">(
  chain?: T
): UnimoveAccountsResult<T>;
export function useAccounts<T extends "sui" | "iota">(
  chain?: T
): UnimoveAccountsResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiAccounts() as UnimoveAccountsResult<T>;
  }

  return useIotaAccounts() as UnimoveAccountsResult<T>;
}

// 向後兼容的類型別名
export type UseAccountsResult = UnimoveAccountsResult<"sui" | "iota">;
