"use client";

import { useSwitchAccount as useSuiSwitchAccount } from "@mysten/dapp-kit";
import { useSwitchAccount as useIotaSwitchAccount } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseSwitchAccountResult = ReturnType<
  typeof useSuiSwitchAccount | typeof useIotaSwitchAccount
>;

export function useSwitchAccount(): UseSwitchAccountResult {
  const chain = useChain();
  const useSwitchAccountHook =
    chain === "sui" ? useSuiSwitchAccount : useIotaSwitchAccount;

  return useSwitchAccountHook();
}
