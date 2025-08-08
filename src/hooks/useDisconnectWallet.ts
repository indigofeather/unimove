"use client";

import { useDisconnectWallet as useSuiDisconnectWallet } from "@mysten/dapp-kit";
import { useDisconnectWallet as useIotaDisconnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveDisconnectWalletResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiDisconnectWallet>
    : ReturnType<typeof useIotaDisconnectWallet>;

// 重載函數定義
export function useDisconnectWallet(): UnimoveDisconnectWalletResult<
  "sui" | "iota"
>;
export function useDisconnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveDisconnectWalletResult<T>;
export function useDisconnectWallet<T extends "sui" | "iota">(
  chain?: T
): UnimoveDisconnectWalletResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiDisconnectWallet() as UnimoveDisconnectWalletResult<T>;
  }

  return useIotaDisconnectWallet() as UnimoveDisconnectWalletResult<T>;
}

// 向後兼容的類型別名
export type UseDisconnectWalletResult = UnimoveDisconnectWalletResult<
  "sui" | "iota"
>;
