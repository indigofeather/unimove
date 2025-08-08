"use client";

import { useAutoConnectWallet as useSuiAutoConnectWallet } from "@mysten/dapp-kit";
import { useAutoConnectWallet as useIotaAutoConnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveAutoConnectWalletResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiAutoConnectWallet>
    : ReturnType<typeof useIotaAutoConnectWallet>;

// 重載函數定義
export function useAutoConnectWallet(): UnimoveAutoConnectWalletResult<
  "sui" | "iota"
>;
export function useAutoConnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveAutoConnectWalletResult<T>;
export function useAutoConnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveAutoConnectWalletResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiAutoConnectWallet() as UnimoveAutoConnectWalletResult<T>;
  }

  return useIotaAutoConnectWallet() as UnimoveAutoConnectWalletResult<T>;
}
