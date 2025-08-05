"use client";

import { useMemo } from "react";
import { useSuiClientInfiniteQuery } from "@mysten/dapp-kit";
import { useIotaClientInfiniteQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseClientInfiniteQueryResult = ReturnType<
  typeof useSuiClientInfiniteQuery | typeof useIotaClientInfiniteQuery
>;

export function useClientInfiniteQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options?: unknown
): UseClientInfiniteQueryResult {
  const chain = useChain();

  const suiResult = useSuiClientInfiniteQuery(
    method as Parameters<typeof useSuiClientInfiniteQuery>[0],
    params as Parameters<typeof useSuiClientInfiniteQuery>[1],
    {
      ...(options as Parameters<typeof useSuiClientInfiniteQuery>[2]),
      enabled:
        (options as Parameters<typeof useSuiClientInfiniteQuery>[2])?.enabled &&
        chain === "sui",
    }
  );

  const iotaResult = useIotaClientInfiniteQuery(
    method as Parameters<typeof useIotaClientInfiniteQuery>[0],
    params as Parameters<typeof useIotaClientInfiniteQuery>[1],
    {
      ...(options as Parameters<typeof useIotaClientInfiniteQuery>[2]),
      enabled:
        (options as Parameters<typeof useIotaClientInfiniteQuery>[2])
          ?.enabled && chain === "iota",
    }
  );

  return useMemo(
    () => (chain === "sui" ? suiResult : iotaResult),
    [chain, suiResult, iotaResult]
  );
}
