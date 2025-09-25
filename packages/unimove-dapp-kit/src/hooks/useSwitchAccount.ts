"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useSwitchAccountInternal = createChainHookCaller("useSwitchAccount");

type HookName = "useSwitchAccount";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useSwitchAccount(): AnyChainResult;
export function useSwitchAccount<C extends ChainId>(chain?: C): HookResult<C>;
export function useSwitchAccount(chain?: ChainId) {
  return useSwitchAccountInternal(chain) as AnyChainResult;
}

export type UnimoveSwitchAccountResult<T extends ChainId> = HookResult<T>;
