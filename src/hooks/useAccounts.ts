"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useAccountsInternal = createChainHookCaller("useAccounts");

type HookName = "useAccounts";

type HookResult<C extends ChainId> = ReturnType<ChainRegistry[C]["hooks"][HookName]>;

type AnyChainResult = ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>;

export function useAccounts(): AnyChainResult;
export function useAccounts<C extends ChainId>(chain?: C): HookResult<C>;
export function useAccounts(chain?: ChainId) {
  return useAccountsInternal(chain) as AnyChainResult;
}

export type UnimoveAccountsResult<T extends ChainId> = HookResult<T>;
export type UseAccountsResult = AnyChainResult;
