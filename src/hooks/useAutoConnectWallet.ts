"use client";

import { useAutoConnectWallet as useSuiAutoConnectWallet } from "@mysten/dapp-kit";
import { useAutoConnectWallet as useIotaAutoConnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

export function useAutoConnectWallet() {
  const chain = useChain();
  const useAutoConnectWalletHook =
    chain === "sui" ? useSuiAutoConnectWallet : useIotaAutoConnectWallet;

  return useAutoConnectWalletHook();
}
