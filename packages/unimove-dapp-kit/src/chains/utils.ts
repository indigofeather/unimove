"use client";

import { useChain } from "../context";

import { chainRegistry } from "./registry";
import type { ChainId, ChainRegistry } from "./registry";

export type HookName = keyof ChainRegistry[ChainId]["hooks"];

type HookFor<C extends ChainId, Name extends HookName> = ChainRegistry[C]["hooks"][Name];

type HookParameters<C extends ChainId, Name extends HookName> = Parameters<HookFor<C, Name>>;

type HookReturn<C extends ChainId, Name extends HookName> = ReturnType<HookFor<C, Name>>;

export function isChainId(value: unknown): value is ChainId {
  return typeof value === "string" && value in chainRegistry;
}

export function resolveChainFromArgs(
  args: unknown[],
  explicitChain?: ChainId
): { chain: ChainId; args: unknown[] } {
  if (explicitChain) {
    return { chain: explicitChain, args };
  }

  const lastArg = args.length > 0 ? args[args.length - 1] : undefined;
  if (isChainId(lastArg)) {
    return { chain: lastArg, args: args.slice(0, -1) };
  }

  const chain = useChain();
  return { chain, args };
}

export function callChainHook<Name extends HookName, C extends ChainId>(
  name: Name,
  chain: C,
  args: HookParameters<C, Name>
): HookReturn<C, Name> {
  const hook = chainRegistry[chain].hooks[name] as (
    ...params: HookParameters<C, Name>
  ) => HookReturn<C, Name>;
  return hook(...args);
}

export function createChainHookCaller<Name extends HookName>(name: Name) {
  return (...rawArgs: unknown[]) => {
    const { chain, args } = resolveChainFromArgs(rawArgs);
    const hook = chainRegistry[chain].hooks[name] as (...params: unknown[]) => unknown;
    return hook(...args);
  };
}
