"use client";

import { useMemo } from "react";
import {
  type SuiRpcPaginatedMethods,
  useSuiClientInfiniteQuery,
  type UseSuiClientInfiniteQueryOptions,
} from "@mysten/dapp-kit";
import {
  type IotaRpcPaginatedMethods,
  useIotaClientInfiniteQuery,
  type UseIotaClientInfiniteQueryOptions,
} from "@iota/dapp-kit";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { useChain } from "../context";

type Chain = "sui" | "iota";
type PaginatedMethods<T extends Chain> = T extends "sui"
  ? SuiRpcPaginatedMethods
  : IotaRpcPaginatedMethods;
type InfiniteOptions<
  T extends Chain,
  M extends keyof PaginatedMethods<T>,
  TData,
> = T extends "sui"
  ? UseSuiClientInfiniteQueryOptions<M & keyof SuiRpcPaginatedMethods, TData>
  : UseIotaClientInfiniteQueryOptions<M & keyof IotaRpcPaginatedMethods, TData>;
type MethodInfo<
  TC extends Chain,
  TM extends keyof PaginatedMethods<TC>,
> = PaginatedMethods<TC>[TM & keyof PaginatedMethods<TC>];
type MethodParams<TC extends Chain, TM extends keyof PaginatedMethods<TC>> =
  MethodInfo<TC, TM> extends {
    params: infer P;
  }
    ? P
    : never;
type MethodResult<TC extends Chain, TM extends keyof PaginatedMethods<TC>> =
  MethodInfo<TC, TM> extends {
    result: infer R;
  }
    ? R
    : never;

export type UnimoveClientInfiniteQueryResult<TData> = UseInfiniteQueryResult<
  TData,
  Error
>;

export function useClientInfiniteQuery<
  TChain extends Chain,
  TMethod extends keyof PaginatedMethods<TChain>,
  TData = InfiniteData<MethodResult<TChain, TMethod>>,
>(
  method: TMethod,
  params: MethodParams<TChain, TMethod>,
  options?: InfiniteOptions<TChain, TMethod, TData>,
  chain?: TChain
): UnimoveClientInfiniteQueryResult<TData>;

export function useClientInfiniteQuery(
  method: string,
  params: unknown,
  options?: Record<string, unknown>,
  chain?: Chain
): UnimoveClientInfiniteQueryResult<unknown> {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  const suiResult = useSuiClientInfiniteQuery(method as any, params as any, {
    ...(options as any),
    enabled: (options as any)?.enabled && finalChain === "sui",
  });

  const iotaResult = useIotaClientInfiniteQuery(method as any, params as any, {
    ...(options as any),
    enabled: (options as any)?.enabled && finalChain === "iota",
  });

  return useMemo(
    () =>
      (finalChain === "sui"
        ? suiResult
        : iotaResult) as UnimoveClientInfiniteQueryResult<unknown>,
    [finalChain, suiResult, iotaResult]
  );
}

export type UseClientInfiniteQueryResult<TData> =
  UnimoveClientInfiniteQueryResult<TData>;
