"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useCurrentAccountInternal = createChainHookCaller("useCurrentAccount");

type HookName = "useCurrentAccount";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useCurrentAccount(): AnyChainResult;
export function useCurrentAccount<C extends ChainId>(chain?: C): HookResult<C>;
export function useCurrentAccount(chain?: ChainId) {
  return useCurrentAccountInternal(chain) as AnyChainResult;
}

export type UnimoveCurrentAccountResult<T extends ChainId> = HookResult<T>;
