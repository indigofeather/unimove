"use client";

import {
  type SuiRpcMethodName,
  type SuiRpcMethods,
  useSuiClientQuery,
  type UseSuiClientQueryOptions,
} from "@mysten/dapp-kit";
import type { JSX } from "react";

export function SuiQuery<
  T extends SuiRpcMethodName,
  TData = SuiRpcMethods[T]["result"]
>({
  method,
  params,
  options,
  children,
}: {
  method: T;
  params: SuiRpcMethods[T]["params"];
  options?: UseSuiClientQueryOptions<T, TData>;
  children: (r: ReturnType<typeof useSuiClientQuery<T, TData>>) => JSX.Element;
}) {
  const result = useSuiClientQuery(method, params, options);

  return children(result);
}
