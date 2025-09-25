"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useClientInternal = createChainHookCaller("useClient");

type HookName = "useClient";

type HookResult<C extends ChainId> = ReturnType<ChainRegistry[C]["hooks"][HookName]>;

type AnyChainResult = ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>;

export function useClient(): AnyChainResult;
export function useClient<C extends ChainId>(chain?: C): HookResult<C>;
export function useClient(chain?: ChainId) {
  return useClientInternal(chain) as AnyChainResult;
}

export type UnimoveClientHookResult<T extends ChainId> = HookResult<T>;
export type UseClientResult = AnyChainResult;
