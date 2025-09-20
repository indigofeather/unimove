"use client";

import {
  type SuiRpcMethods,
  type UseSuiClientMutationOptions,
} from "@mysten/dapp-kit";
import {
  type IotaRpcMethods,
  type UseIotaClientMutationOptions,
} from "@iota/dapp-kit";
import type { UseMutationResult } from "@tanstack/react-query";

import { createChainHookCaller } from "../chains";
import type { ChainId } from "../chains";

const useClientMutationInternal = createChainHookCaller("useClientMutation");

type Chain = ChainId;
type RpcMethods<T extends Chain> = T extends "sui"
  ? SuiRpcMethods
  : IotaRpcMethods;
type MutationOptions<
  T extends Chain,
  M extends keyof RpcMethods<T>,
> = T extends "sui"
  ? UseSuiClientMutationOptions<M & keyof SuiRpcMethods>
  : UseIotaClientMutationOptions<M & keyof IotaRpcMethods>;
type MethodInfo<
  TC extends Chain,
  TM extends keyof RpcMethods<TC>,
> = RpcMethods<TC>[TM & keyof RpcMethods<TC>];
type MethodParams<
  TC extends Chain,
  TM extends keyof RpcMethods<TC>,
> = MethodInfo<TC, TM> extends { params: infer P } ? P : never;
type MethodResult<
  TC extends Chain,
  TM extends keyof RpcMethods<TC>,
> = MethodInfo<TC, TM> extends { result: infer R } ? R : never;

export type UnimoveClientMutationResult<
  T extends Chain,
  M extends keyof RpcMethods<T>,
> = UseMutationResult<MethodResult<T, M>, Error, MethodParams<T, M>, unknown[]>;

export function useClientMutation<
  TChain extends Chain,
  TMethod extends keyof RpcMethods<TChain>,
>(
  method: TMethod,
  options?: MutationOptions<TChain, TMethod>,
  chain?: TChain
): UnimoveClientMutationResult<TChain, TMethod>;

export function useClientMutation(
  method: string,
  options?: unknown,
  chain?: Chain
): UnimoveClientMutationResult<Chain, any> {
  if (chain) {
    return useClientMutationInternal(
      method,
      options,
      chain
    ) as UnimoveClientMutationResult<Chain, any>;
  }

  return useClientMutationInternal(
    method,
    options
  ) as UnimoveClientMutationResult<Chain, any>;
}

export type UseClientMutationResult<
  T extends Chain,
  M extends keyof RpcMethods<T>,
> = UnimoveClientMutationResult<T, M>;
