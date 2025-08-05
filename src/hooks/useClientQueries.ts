"use client";

import { useSuiClientQueries } from "@mysten/dapp-kit";
import { useIotaClientQueries } from "@iota/dapp-kit";
import { useMemo } from "react";

import { useChain } from "../context";

export type UseClientQueriesResult = ReturnType<
  typeof useSuiClientQueries | typeof useIotaClientQueries
>;

export function useClientQueries(queriesConfig: {
  queries: unknown[];
}): UseClientQueriesResult {
  const chain = useChain();

  // 始終調用兩個 hooks，但只有對應鏈的會實際執行查詢
  const suiResult = useSuiClientQueries(
    chain === "sui"
      ? (queriesConfig as Parameters<typeof useSuiClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useSuiClientQueries>[0])
  );

  const iotaResult = useIotaClientQueries(
    chain === "iota"
      ? (queriesConfig as Parameters<typeof useIotaClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useIotaClientQueries>[0])
  );

  // 使用 useMemo 來返回對應鏈的結果
  return useMemo(() => {
    return chain === "sui" ? suiResult : iotaResult;
  }, [chain, suiResult, iotaResult]);
}
