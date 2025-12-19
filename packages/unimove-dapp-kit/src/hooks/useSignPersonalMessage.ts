"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";
import type { MergeUseMutationResult } from "./mutationTypes";

const useSignPersonalMessageInternal = createChainHookCaller(
  "useSignPersonalMessage"
);

type HookName = "useSignPersonalMessage";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = MergeUseMutationResult<
  ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>
>;

export function useSignPersonalMessage(): AnyChainResult;
export function useSignPersonalMessage<C extends ChainId>(
  chain?: C
): HookResult<C>;
export function useSignPersonalMessage(chain?: ChainId) {
  return useSignPersonalMessageInternal(chain) as AnyChainResult;
}

export type UnimoveSignPersonalMessageResult<T extends ChainId> = HookResult<T>;
export type UseSignPersonalMessageResult = AnyChainResult;
