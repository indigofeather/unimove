"use client";

import { useSuiClientInfiniteQuery } from "@mysten/dapp-kit";
import { useIotaClientInfiniteQuery } from "@iota/dapp-kit";

import { useChain } from "../context";

export function useClientInfiniteQuery<TMethod extends string>(
  method: TMethod,
  params?: unknown,
  options?: unknown
) {
  const chain = useChain();

  switch (chain) {
    case "sui":
      return useSuiClientInfiniteQuery(
        method as Parameters<typeof useSuiClientInfiniteQuery>[0],
        params as Parameters<typeof useSuiClientInfiniteQuery>[1],
        options as Parameters<typeof useSuiClientInfiniteQuery>[2]
      );
    case "iota":
      return useIotaClientInfiniteQuery(
        method as Parameters<typeof useIotaClientInfiniteQuery>[0],
        params as Parameters<typeof useIotaClientInfiniteQuery>[1],
        options as Parameters<typeof useIotaClientInfiniteQuery>[2]
      );
    default:
      throw new Error(`Unsupported chain: ${chain}`);
  }
}