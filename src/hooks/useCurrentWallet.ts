"use client";

import { useCurrentWallet as useSuiCurrentWallet } from "@mysten/dapp-kit";
import { useCurrentWallet as useIotaCurrentWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseCurrentWalletResult = ReturnType<
  typeof useSuiCurrentWallet | typeof useIotaCurrentWallet
>;

export function useCurrentWallet(): UseCurrentWalletResult {
  const chain = useChain();
  const useCurrentWalletHook =
    chain === "sui" ? useSuiCurrentWallet : useIotaCurrentWallet;

  return useCurrentWalletHook();
}