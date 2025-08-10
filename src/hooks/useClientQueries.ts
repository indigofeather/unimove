"use client";

import {
  type SuiRpcMethods,
  useSuiClientQueries,
  type UseSuiClientQueryOptions,
} from "@mysten/dapp-kit";
import {
  type IotaRpcMethods,
  useIotaClientQueries,
  type UseIotaClientQueryOptions,
} from "@iota/dapp-kit";
import { useMemo } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

import { useChain } from "../context";

type Chain = "sui" | "iota";
type RpcMethods<T extends Chain> = T extends "sui"
  ? SuiRpcMethods
  : IotaRpcMethods;
type ClientQueryOptions<
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
type MethodResult<TC extends Chain, TM extends keyof RpcMethods<TC>> =
  MethodInfo<TC, TM> extends {
    result: infer R;
  }
    ? R
    : never;

type ClientQueryConfig<T extends Chain> =
  RpcMethods<T>[keyof RpcMethods<T>] extends infer Method
    ? Method extends {
        name: infer M extends keyof RpcMethods<T>;
        params?: infer P;
      }
      ? undefined extends P
        ? {
            method: M;
            params?: P;
            options?: ClientQueryOptions<T, M, unknown>;
          }
        : {
            method: M;
            params: P;
            options?: ClientQueryOptions<T, M, unknown>;
          }
      : never
    : never;

export type UnimoveClientQueriesResult<
  T extends Chain,
  Q extends readonly ClientQueryConfig<T>[],
> = {
  -readonly [K in keyof Q]: Q[K] extends {
    method: infer M extends keyof RpcMethods<T>;
    readonly options?: { select?: (...args: any[]) => infer R } | object;
  }
    ? UseQueryResult<unknown extends R ? MethodResult<T, M> : R, Error>
    : never;
};

export function useClientQueries<
  TChain extends Chain,
  const Queries extends readonly ClientQueryConfig<TChain>[],
  Results = UnimoveClientQueriesResult<TChain, Queries>,
>(
  {
    queries,
    combine,
  }: {
    queries: Queries;
    combine?: (results: UnimoveClientQueriesResult<TChain, Queries>) => Results;
  },
  chain?: TChain
): Results {
  const contextChain = useChain();
  const finalChain = chain || contextChain;

  const suiResult = useSuiClientQueries(
    finalChain === "sui"
      ? ({ queries, combine } as Parameters<typeof useSuiClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useSuiClientQueries>[0])
  );

  const iotaResult = useIotaClientQueries(
    finalChain === "iota"
      ? ({ queries, combine } as Parameters<typeof useIotaClientQueries>[0])
      : ({ queries: [] } as Parameters<typeof useIotaClientQueries>[0])
  );

  return useMemo(
    () => (finalChain === "sui" ? suiResult : iotaResult) as Results,
    [finalChain, suiResult, iotaResult]
  );
}

export type UseClientQueriesResult<
  T extends Chain,
  Q extends readonly ClientQueryConfig<T>[],
> = UnimoveClientQueriesResult<T, Q>;
