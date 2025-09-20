"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useAutoConnectWalletInternal = createChainHookCaller(
  "useAutoConnectWallet"
);

type HookName = "useAutoConnectWallet";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<
  ChainRegistry[ChainId]["hooks"][HookName]
>;

export function useAutoConnectWallet(): AnyChainResult;
export function useAutoConnectWallet<C extends ChainId>(chain?: C): HookResult<C>;
export function useAutoConnectWallet(chain?: ChainId) {
  return useAutoConnectWalletInternal(chain) as AnyChainResult;
}

export type UnimoveAutoConnectWalletResult<T extends ChainId> = HookResult<T>;
