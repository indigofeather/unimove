"use client";

import { useDisconnectWallet as useSuiDisconnectWallet } from "@mysten/dapp-kit";
import { useDisconnectWallet as useIotaDisconnectWallet } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseDisconnectWalletResult = ReturnType<
  typeof useSuiDisconnectWallet | typeof useIotaDisconnectWallet
>;

export function useDisconnectWallet(): UseDisconnectWalletResult {
  const chain = useChain();
  const useDisconnectWalletHook =
    chain === "sui" ? useSuiDisconnectWallet : useIotaDisconnectWallet;

  return useDisconnectWalletHook();
}