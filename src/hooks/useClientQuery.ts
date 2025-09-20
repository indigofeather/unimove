"use client";

import {
  type SuiRpcMethods,
  type UseSuiClientQueryOptions,
} from "@mysten/dapp-kit";
import {
  type IotaRpcMethods,
  type UseIotaClientQueryOptions,
} from "@iota/dapp-kit";
import type { UseQueryResult } from "@tanstack/react-query";

import { createChainHookCaller } from "../chains";
import type { ChainId } from "../chains";

const useClientQueryInternal = createChainHookCaller("useClientQuery");

type Chain = ChainId;
type RpcMethods<T extends Chain> = T extends "sui"
  ? SuiRpcMethods
  : IotaRpcMethods;
type QueryOptions<
  T extends Chain,
  M extends keyof RpcMethods<T>,
  TData,
> = T extends "sui"
  ? UseSuiClientQueryOptions<M & keyof SuiRpcMethods, TData>
  : UseIotaClientQueryOptions<M & keyof IotaRpcMethods, TData>;
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

export type UnimoveClientQueryResult<TData> = UseQueryResult<TData, Error>;

export function useClientQuery<
  TChain extends Chain,
  TMethod extends keyof RpcMethods<TChain>,
  TData = MethodResult<TChain, TMethod>,
>(
  method: TMethod,
  ...args: undefined extends MethodParams<TChain, TMethod>
    ? [
        params?: MethodParams<TChain, TMethod>,
        options?: QueryOptions<TChain, TMethod, TData>,
        chain?: TChain,
      ]
    : [
        params: MethodParams<TChain, TMethod>,
        options?: QueryOptions<TChain, TMethod, TData>,
        chain?: TChain,
      ]
): UnimoveClientQueryResult<TData>;

export function useClientQuery(
  method: string,
  params?: unknown,
  options?: Record<string, unknown>,
  chain?: Chain
): UnimoveClientQueryResult<unknown> {
  if (chain) {
    return useClientQueryInternal(
      method,
      params,
      options,
      chain
    ) as UnimoveClientQueryResult<unknown>;
  }

  return useClientQueryInternal(
    method,
    params,
    options
  ) as UnimoveClientQueryResult<unknown>;
}

export type UseClientQueryResult<TData> = UnimoveClientQueryResult<TData>;
