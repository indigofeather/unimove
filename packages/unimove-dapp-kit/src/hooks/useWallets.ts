"use client";

import type { ChainId, ChainRegistry } from "../chains";
import { createChainHookCaller } from "../chains";

const useWalletsInternal = createChainHookCaller("useWallets");

type HookName = "useWallets";

type HookResult<C extends ChainId> = ReturnType<
  ChainRegistry[C]["hooks"][HookName]
>;

type AnyChainResult = ReturnType<ChainRegistry[ChainId]["hooks"][HookName]>;

export function useWallets(): AnyChainResult;
export function useWallets<C extends ChainId>(chain?: C): HookResult<C>;
export function useWallets(chain?: ChainId) {
  return useWalletsInternal(chain) as AnyChainResult;
}

export type UnimoveWalletsResult<T extends ChainId> = HookResult<T>;
