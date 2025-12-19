"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";
import type { MergeUseMutationResult } from "./mutationTypes";

const useSignTransactionInternal = createChainHookCaller("useSignTransaction");

type HookName = "useSignTransaction";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = MergeUseMutationResult<
  ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>
>;

export function useSignTransaction(): AnyChainResult;
export function useSignTransaction<C extends ChainId>(chain?: C): HookResult<C>;
export function useSignTransaction(chain?: ChainId) {
  return useSignTransactionInternal(chain) as AnyChainResult;
}

export type UnimoveSignTransactionResult<T extends ChainId> = HookResult<T>;
