"use client";

import { useConnectWallet as useSuiConnectWallet } from "@mysten/dapp-kit";
import { useConnectWallet as useIotaConnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveConnectWalletResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiConnectWallet>
    : ReturnType<typeof useIotaConnectWallet>;

// 重載函數定義
export function useConnectWallet(): UnimoveConnectWalletResult<"sui" | "iota">;
export function useConnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveConnectWalletResult<T>;
export function useConnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveConnectWalletResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiConnectWallet() as UnimoveConnectWalletResult<T>;
  }

  return useIotaConnectWallet() as UnimoveConnectWalletResult<T>;
}

// 向後兼容的類型別名
export type UseConnectWalletResult = UnimoveConnectWalletResult<"sui" | "iota">;
