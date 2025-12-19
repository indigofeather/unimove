"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";
import type { MergeUseMutationResult } from "./mutationTypes";

const useConnectWalletInternal = createChainHookCaller("useConnectWallet");

type HookName = "useConnectWallet";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = MergeUseMutationResult<
  ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>
>;

export function useConnectWallet(): AnyChainResult;
export function useConnectWallet<C extends ChainId>(chain?: C): HookResult<C>;
export function useConnectWallet(chain?: ChainId) {
  return useConnectWalletInternal(chain) as AnyChainResult;
}

export type UnimoveConnectWalletResult<T extends ChainId> = HookResult<T>;
