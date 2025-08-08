"use client";

import { useCurrentWallet as useSuiCurrentWallet } from "@mysten/dapp-kit";
import { useCurrentWallet as useIotaCurrentWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveCurrentWalletResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiCurrentWallet>
    : ReturnType<typeof useIotaCurrentWallet>;

// 重載函數定義
export function useCurrentWallet(): UnimoveCurrentWalletResult<"sui" | "iota">;
export function useCurrentWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveCurrentWalletResult<T>;
export function useCurrentWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveCurrentWalletResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiCurrentWallet() as UnimoveCurrentWalletResult<T>;
  }

  return useIotaCurrentWallet() as UnimoveCurrentWalletResult<T>;
}

// 向後兼容的類型別名
export type UseCurrentWalletResult = UnimoveCurrentWalletResult<"sui" | "iota">;
