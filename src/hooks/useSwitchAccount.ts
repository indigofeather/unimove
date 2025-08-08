"use client";

import { useSwitchAccount as useSuiSwitchAccount } from "@mysten/dapp-kit";
import { useSwitchAccount as useIotaSwitchAccount } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveSwitchAccountResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiSwitchAccount>
    : ReturnType<typeof useIotaSwitchAccount>;

// 重載函數定義
export function useSwitchAccount(): UnimoveSwitchAccountResult<"sui" | "iota">;
export function useSwitchAccount<T extends "sui" | "iota">(
  chain?: T
): UnimoveSwitchAccountResult<T>;
export function useSwitchAccount<T extends "sui" | "iota">(
  chain?: T
): UnimoveSwitchAccountResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiSwitchAccount() as UnimoveSwitchAccountResult<T>;
  }

  return useIotaSwitchAccount() as UnimoveSwitchAccountResult<T>;
}

// 向後兼容的類型別名
export type UseSwitchAccountResult = UnimoveSwitchAccountResult<"sui" | "iota">;
