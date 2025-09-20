"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useCurrentWalletInternal = createChainHookCaller("useCurrentWallet");

type HookName = "useCurrentWallet";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useCurrentWallet(): AnyChainResult;
export function useCurrentWallet<C extends ChainId>(chain?: C): HookResult<C>;
export function useCurrentWallet(chain?: ChainId) {
  return useCurrentWalletInternal(chain) as AnyChainResult;
}

export type UnimoveCurrentWalletResult<T extends ChainId> = HookResult<T>;
