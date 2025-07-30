"use client";

import { useConnectWallet as useSuiConnectWallet } from "@mysten/dapp-kit";
import { useConnectWallet as useIotaConnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseConnectWalletResult = ReturnType<
  typeof useSuiConnectWallet | typeof useIotaConnectWallet
>;

export function useConnectWallet(): UseConnectWalletResult {
  const chain = useChain();
  const useConnectWalletHook =
    chain === "sui" ? useSuiConnectWallet : useIotaConnectWallet;

  return useConnectWalletHook();
}