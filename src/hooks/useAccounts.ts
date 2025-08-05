"use client";

import { useAccounts as useSuiAccounts } from "@mysten/dapp-kit";
import { useAccounts as useIotaAccounts } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseAccountsResult = ReturnType<
  typeof useSuiAccounts | typeof useIotaAccounts
>;

export function useAccounts(): UseAccountsResult {
  const chain = useChain();
  const useAccountsHook = chain === "sui" ? useSuiAccounts : useIotaAccounts;

  return useAccountsHook();
}
