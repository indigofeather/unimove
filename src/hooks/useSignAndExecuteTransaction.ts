"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useSignAndExecuteTransactionInternal = createChainHookCaller(
  "useSignAndExecuteTransaction"
);

type HookName = "useSignAndExecuteTransaction";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useSignAndExecuteTransaction(): AnyChainResult;
export function useSignAndExecuteTransaction<C extends ChainId>(
  chain?: C
): HookResult<C>;
export function useSignAndExecuteTransaction(chain?: ChainId) {
  return useSignAndExecuteTransactionInternal(chain) as AnyChainResult;
}

export type UnimoveSignAndExecuteTransactionResult<T extends ChainId> = HookResult<T>;
export type UseSignAndExecuteTransactionResult = AnyChainResult;
