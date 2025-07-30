"use client";

import { useSuiClient } from "@mysten/dapp-kit";
import { useIotaClient } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseClientResult = ReturnType<
  typeof useSuiClient | typeof useIotaClient
>;

export function useClient(): UseClientResult {
  const chain = useChain();
  const useClientHook = chain === "sui" ? useSuiClient : useIotaClient;

  return useClientHook();
}