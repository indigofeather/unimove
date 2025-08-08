"use client";

import { useSignPersonalMessage as useSuiSignPersonalMessage } from "@mysten/dapp-kit";
import { useSignPersonalMessage as useIotaSignPersonalMessage } from "@iota/dapp-kit";

import { useChain } from "../context";

// 精確的類型定義
export type UnimoveSignPersonalMessageResult<T extends "sui" | "iota"> =
  T extends "sui"
    ? ReturnType<typeof useSuiSignPersonalMessage>
    : ReturnType<typeof useIotaSignPersonalMessage>;

// 重載函數定義
export function useSignPersonalMessage(): UnimoveSignPersonalMessageResult<
  "sui" | "iota"
>;
export function useSignPersonalMessage<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignPersonalMessageResult<T>;
export function useSignPersonalMessage<T extends "sui" | "iota">(
  chain?: T
): UnimoveSignPersonalMessageResult<T> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  if (finalChain === "sui") {
    return useSuiSignPersonalMessage() as UnimoveSignPersonalMessageResult<T>;
  }

  return useIotaSignPersonalMessage() as UnimoveSignPersonalMessageResult<T>;
}

// 向後兼容的類型別名
export type UseSignPersonalMessageResult = UnimoveSignPersonalMessageResult<
  "sui" | "iota"
>;
