"use client";

import { useSuiClient } from "@mysten/dapp-kit";
import { useIotaClient } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveClientHookResult<T extends "sui" | "iota"> = T extends "sui"
  ? ReturnType<typeof useSuiClient>
  : ReturnType<typeof useIotaClient>;

// 重載函數定義
export function useClient(): UnimoveClientHookResult<"sui" | "iota">;
export function useClient<T extends "sui" | "iota">(
  chain?: T
): UnimoveClientHookResult<T>;
export function useClient<T extends "sui" | "iota">(
  chain?: T
): UnimoveClientHookResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiClient() as UnimoveClientHookResult<T>;
  }

  return useIotaClient() as UnimoveClientHookResult<T>;
}

// 向後兼容的類型別名
export type UseClientResult = UnimoveClientHookResult<"sui" | "iota">;
