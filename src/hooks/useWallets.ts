"use client";

import { useWallets as useSuiWallets } from "@mysten/dapp-kit";
import { useWallets as useIotaWallets } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseWalletsResult = ReturnType<
  typeof useSuiWallets | typeof useIotaWallets
>;

export function useWallets(): UseWalletsResult {
  const chain = useChain();
  const useWalletsHook = chain === "sui" ? useSuiWallets : useIotaWallets;

  return useWalletsHook();
}
