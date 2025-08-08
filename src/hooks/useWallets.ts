"use client";

import { useWallets as useSuiWallets } from "@mysten/dapp-kit";
import { useWallets as useIotaWallets } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveWalletsResult<T extends "sui" | "iota"> = T extends "sui"
  ? ReturnType<typeof useSuiWallets>
  : ReturnType<typeof useIotaWallets>;

// 重載函數定義
export function useWallets(): UnimoveWalletsResult<"sui" | "iota">;
export function useWallets<T extends "sui" | "iota">(
  chain?: T
): UnimoveWalletsResult<T>;
export function useWallets<T extends "sui" | "iota">(
  chain?: T
): UnimoveWalletsResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiWallets() as UnimoveWalletsResult<T>;
  }

  return useIotaWallets() as UnimoveWalletsResult<T>;
}

// 向後兼容的類型別名
export type UseWalletsResult = UnimoveWalletsResult<"sui" | "iota">;
