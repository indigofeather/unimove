"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useDisconnectWalletInternal = createChainHookCaller(
  "useDisconnectWallet"
);

type HookName = "useDisconnectWallet";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useDisconnectWallet(): AnyChainResult;
export function useDisconnectWallet<C extends ChainId>(chain?: C): HookResult<C>;
export function useDisconnectWallet(chain?: ChainId) {
  return useDisconnectWalletInternal(chain) as AnyChainResult;
}

export type UnimoveDisconnectWalletResult<T extends ChainId> = HookResult<T>;
