"use client";

import { useMemo } from "react";
import { useSuiClientInfiniteQuery } from "@mysten/dapp-kit";
import { useIotaClientInfiniteQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveClientInfiniteQueryResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiClientInfiniteQuery>
    : ReturnType<typeof useIotaClientInfiniteQuery>;

// 重載函數定義
export function useClientInfiniteQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options?: unknown
): UnimoveClientInfiniteQueryResult<"sui" | "iota">;

export function useClientInfiniteQuery<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  params?: unknown,
  options?: unknown,
  chain?: T
): UnimoveClientInfiniteQueryResult<T>;

export function useClientInfiniteQuery<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  params?: unknown,
  options?: unknown,
  chain?: T
): UnimoveClientInfiniteQueryResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  const suiResult = useSuiClientInfiniteQuery(
    method as Parameters<typeof useSuiClientInfiniteQuery>[0],
    params as Parameters<typeof useSuiClientInfiniteQuery>[1],
    {
      ...(options as Parameters<typeof useSuiClientInfiniteQuery>[2]),
      enabled:
        (options as Parameters<typeof useSuiClientInfiniteQuery>[2])?.enabled &&
        finalChain === "sui",
    }
  );

  const iotaResult = useIotaClientInfiniteQuery(
    method as Parameters<typeof useIotaClientInfiniteQuery>[0],
    params as Parameters<typeof useIotaClientInfiniteQuery>[1],
    {
      ...(options as Parameters<typeof useIotaClientInfiniteQuery>[2]),
      enabled:
        (options as Parameters<typeof useIotaClientInfiniteQuery>[2])
          ?.enabled && finalChain === "iota",
    }
  );

  return useMemo(
    () =>
      (finalChain === "sui"
        ? suiResult
        : iotaResult) as UnimoveClientInfiniteQueryResult<T>,
    [finalChain, suiResult, iotaResult]
  );
}

// 向後兼容的類型別名
export type UseClientInfiniteQueryResult = UnimoveClientInfiniteQueryResult<
  "sui" | "iota"
>;
