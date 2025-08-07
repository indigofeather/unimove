"use client";

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useIotaClientQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseClientQueryResult = ReturnType<
  typeof useSuiClientQuery | typeof useIotaClientQuery
>;

type QueryOptions = {
  enabled?: boolean;
  [key: string]: unknown;
};

export function useClientQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options: QueryOptions = {}
): UseClientQueryResult {
  const chain = useChain();
  const { enabled = true, ...restOptions } = options;

  // 根據鏈類型條件性調用對應的 hook
  if (chain === "sui") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSuiClientQuery(
      method as Parameters<typeof useSuiClientQuery>[0],
      params as Parameters<typeof useSuiClientQuery>[1],
      {
        ...restOptions,
        enabled,
      } as Parameters<typeof useSuiClientQuery>[2]
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIotaClientQuery(
    method as Parameters<typeof useIotaClientQuery>[0],
    params as Parameters<typeof useIotaClientQuery>[1],
    {
      ...restOptions,
      enabled,
    } as Parameters<typeof useIotaClientQuery>[2]
  );
}
