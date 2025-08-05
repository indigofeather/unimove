"use client";

import { useMemo } from "react";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useIotaClientQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseClientQueryResult = ReturnType<
  typeof useSuiClientQuery | typeof useIotaClientQuery
>;

export function useClientQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options?: unknown
): UseClientQueryResult {
  const chain = useChain();

  const suiResult = useSuiClientQuery(
    method as Parameters<typeof useSuiClientQuery>[0],
    params as Parameters<typeof useSuiClientQuery>[1],
    {
      ...(options as Parameters<typeof useSuiClientQuery>[2]),
      enabled:
        (options as Parameters<typeof useSuiClientQuery>[2])?.enabled &&
        chain === "sui",
    }
  );

  const iotaResult = useIotaClientQuery(
    method as Parameters<typeof useIotaClientQuery>[0],
    params as Parameters<typeof useIotaClientQuery>[1],
    {
      ...(options as Parameters<typeof useIotaClientQuery>[2]),
      enabled:
        (options as Parameters<typeof useIotaClientQuery>[2])?.enabled &&
        chain === "iota",
    }
  );

  return useMemo(
    () => (chain === "sui" ? suiResult : iotaResult),
    [chain, suiResult, iotaResult]
  );
}
