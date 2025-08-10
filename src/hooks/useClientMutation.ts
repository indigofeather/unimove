"use client";

import {
  type SuiRpcMethods,
  useSuiClientMutation,
  type UseSuiClientMutationOptions,
} from "@mysten/dapp-kit";
import {
  type IotaRpcMethods,
  useIotaClientMutation,
  type UseIotaClientMutationOptions,
} from "@iota/dapp-kit";
import { useMemo } from "react";
import type { UseMutationResult } from "@tanstack/react-query";

import { useChain } from "../context";

type Chain = "sui" | "iota";
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
type MethodParams<TC extends Chain, TM extends keyof RpcMethods<TC>> =
  MethodInfo<TC, TM> extends {
    params: infer P;
  }
    ? P
    : never;
type MethodResult<TC extends Chain, TM extends keyof RpcMethods<TC>> =
  MethodInfo<TC, TM> extends {
    result: infer R;
  }
    ? R
    : never;

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
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  const suiResult = useSuiClientMutation(method as any, options as any);

  const iotaResult = useIotaClientMutation(method as any, options as any);

  return useMemo(
    () =>
      (finalChain === "sui"
        ? suiResult
        : iotaResult) as UnimoveClientMutationResult<Chain, any>,
    [finalChain, suiResult, iotaResult]
  );
}

export type UseClientMutationResult<
  T extends Chain,
  M extends keyof RpcMethods<T>,
> = UnimoveClientMutationResult<T, M>;
