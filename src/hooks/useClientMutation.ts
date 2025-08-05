"use client";

import { useSuiClientMutation } from "@mysten/dapp-kit";
import { useIotaClientMutation } from "@iota/dapp-kit";
import { useMemo } from "react";

import { useChain } from "../context";

export type UseClientMutationResult = ReturnType<
  typeof useSuiClientMutation | typeof useIotaClientMutation
>;

export function useClientMutation<TMethod extends string>(
  method: TMethod,
  options?: unknown
): UseClientMutationResult {
  const chain = useChain();

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
    return chain === "sui" ? suiResult : iotaResult;
  }, [chain, suiResult, iotaResult]);
}
