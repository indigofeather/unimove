"use client";

import { useCurrentAccount as useSuiCurrentAccount } from "@mysten/dapp-kit";
import { useCurrentAccount as useIotaCurrentAccount } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseCurrentAccountResult = ReturnType<
  typeof useSuiCurrentAccount | typeof useIotaCurrentAccount
>;

export function useCurrentAccount(): UseCurrentAccountResult {
  const chain = useChain();
  const useCurrentAccountHook =
    chain === "sui" ? useSuiCurrentAccount : useIotaCurrentAccount;

  return useCurrentAccountHook();
}
