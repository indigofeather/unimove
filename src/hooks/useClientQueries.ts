"use client";

import { useSuiClientQueries } from "@mysten/dapp-kit";
import { useIotaClientQueries } from "@iota/dapp-kit";
import { useMemo } from "react";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveClientQueriesResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiClientQueries>
    : ReturnType<typeof useIotaClientQueries>;

// 重載函數定義
export function useClientQueries(queriesConfig: {
  queries: unknown[];
}): UnimoveClientQueriesResult<"sui" | "iota">;

export function useClientQueries<T extends "sui" | "iota">(
  queriesConfig: { queries: unknown[] },
  chain?: T
): UnimoveClientQueriesResult<T>;

export function useClientQueries<T extends "sui" | "iota">(
  queriesConfig: { queries: unknown[] },
  chain?: T
): UnimoveClientQueriesResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  // 始終調用兩個 hooks，但只有對應鏈的會實際執行查詢
  const suiResult = useSuiClientQueries(
    finalChain === "sui"
      ? (queriesConfig as Parameters<typeof useSuiClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useSuiClientQueries>[0])
  );

  const iotaResult = useIotaClientQueries(
    finalChain === "iota"
      ? (queriesConfig as Parameters<typeof useIotaClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useIotaClientQueries>[0])
  );

  // 使用 useMemo 來返回對應鏈的結果
  return useMemo(() => {
    return (
      finalChain === "sui" ? suiResult : iotaResult
    ) as UnimoveClientQueriesResult<T>;
  }, [finalChain, suiResult, iotaResult]);
}

// 向後兼容的類型別名
export type UseClientQueriesResult = UnimoveClientQueriesResult<"sui" | "iota">;
