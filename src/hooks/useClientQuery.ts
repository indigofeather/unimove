"use client";

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useIotaClientQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveClientQueryResult<T extends "sui" | "iota"> = T extends "sui"
  ? ReturnType<typeof useSuiClientQuery>
  : ReturnType<typeof useIotaClientQuery>;

type QueryOptions = {
  enabled?: boolean;
  [key: string]: unknown;
};

// 重載函數定義
export function useClientQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options?: QueryOptions
): UnimoveClientQueryResult<"sui" | "iota">;

export function useClientQuery<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  params?: unknown,
  options?: QueryOptions,
  chain?: T
): UnimoveClientQueryResult<T>;

export function useClientQuery<
  TMethod extends string,
  T extends "sui" | "iota",
>(
  method: TMethod,
  params?: unknown,
  options: QueryOptions = {},
  chain?: T
): UnimoveClientQueryResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;
  const { enabled = true, ...restOptions } = options;

  // 根據鏈類型條件性調用對應的 hook
  if (finalChain === "sui") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSuiClientQuery(
      method as Parameters<typeof useSuiClientQuery>[0],
      params as Parameters<typeof useSuiClientQuery>[1],
      {
        ...restOptions,
        enabled,
      } as Parameters<typeof useSuiClientQuery>[2]
    ) as UnimoveClientQueryResult<T>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIotaClientQuery(
    method as Parameters<typeof useIotaClientQuery>[0],
    params as Parameters<typeof useIotaClientQuery>[1],
    {
      ...restOptions,
      enabled,
    } as Parameters<typeof useIotaClientQuery>[2]
  ) as UnimoveClientQueryResult<T>;
}

// 向後兼容的類型別名
export type UseClientQueryResult = UnimoveClientQueryResult<"sui" | "iota">;
