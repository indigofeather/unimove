"use client";

import { useSuiClientMutation } from "@mysten/dapp-kit";
import { useIotaClientMutation } from "@iota/dapp-kit";
import { useMemo } from "react";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveClientMutationResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiClientMutation>
    : ReturnType<typeof useIotaClientMutation>;

// 重載函數定義
export function useClientMutation<TMethod extends string>(
  method: TMethod,
  options?: unknown
): UnimoveClientMutationResult<"sui" | "iota">;

export function useClientMutation<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  options?: unknown,
  chain?: T
): UnimoveClientMutationResult<T>;

export function useClientMutation<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  options?: unknown,
  chain?: T
): UnimoveClientMutationResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  // 始終調用兩個 hooks，但使用 enabled 來控制哪個實際執行
  const suiResult = useSuiClientMutation(
    method as Parameters<typeof useSuiClientMutation>[0],
    options as Parameters<typeof useSuiClientMutation>[1]
  );

  const iotaResult = useIotaClientMutation(
    method as Parameters<typeof useIotaClientMutation>[0],
    options as Parameters<typeof useIotaClientMutation>[1]
  );

  // 使用 useMemo 來返回對應鏈的結果
  return useMemo(() => {
    return (
      finalChain === "sui" ? suiResult : iotaResult
    ) as UnimoveClientMutationResult<T>;
  }, [finalChain, suiResult, iotaResult]);
}

// 向後兼容的類型別名
export type UseClientMutationResult = UnimoveClientMutationResult<
  "sui" | "iota"
>;
