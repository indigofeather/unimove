"use client";

import { useSignPersonalMessage as useSuiSignPersonalMessage } from "@mysten/dapp-kit";
import { useSignPersonalMessage as useIotaSignPersonalMessage } from "@iota/dapp-kit";

import { useChain } from "../context";

export type UseSignPersonalMessageResult = ReturnType<
  typeof useSuiSignPersonalMessage | typeof useIotaSignPersonalMessage
>;

export function useSignPersonalMessage(): UseSignPersonalMessageResult {
  const chain = useChain();
  const useSignPersonalMessageHook =
    chain === "sui" ? useSuiSignPersonalMessage : useIotaSignPersonalMessage;

  return useSignPersonalMessageHook();
}
