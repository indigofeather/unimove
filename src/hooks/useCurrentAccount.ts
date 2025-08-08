"use client";

import { useCurrentAccount as useSuiCurrentAccount } from "@mysten/dapp-kit";
import { useCurrentAccount as useIotaCurrentAccount } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveCurrentAccountResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiCurrentAccount>
    : ReturnType<typeof useIotaCurrentAccount>;

// 重載函數定義
export function useCurrentAccount(): UnimoveCurrentAccountResult<
  "sui" | "iota"
>;
export function useCurrentAccount<T extends "sui" | "iota">(
  chain?: T
): UnimoveCurrentAccountResult<T>;
export function useCurrentAccount<T extends "sui" | "iota">(
  chain?: T
): UnimoveCurrentAccountResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiCurrentAccount() as UnimoveCurrentAccountResult<T>;
  }

  return useIotaCurrentAccount() as UnimoveCurrentAccountResult<T>;
}

// 向後兼容的類型別名
export type UseCurrentAccountResult = UnimoveCurrentAccountResult<
  "sui" | "iota"
>;
