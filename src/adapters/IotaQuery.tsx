"use client";

import {
  type IotaRpcMethodName,
  type IotaRpcMethods,
  useIotaClientQuery,
  type UseIotaClientQueryOptions,
} from "@iota/dapp-kit";
import type { JSX } from "react";

type Props<
  T extends IotaRpcMethodName,
  TData
> = (undefined extends IotaRpcMethods[T]["params"]
  ? { params?: IotaRpcMethods[T]["params"] }
  : { params: IotaRpcMethods[T]["params"] }) & {
  method: T;
  options?: UseIotaClientQueryOptions<T, TData>;
  children: (r: ReturnType<typeof useIotaClientQuery<T, TData>>) => JSX.Element;
};

export function IotaQuery<
  T extends IotaRpcMethodName,
  TData = IotaRpcMethods[T]["result"]
>({ method, params, options, children }: Props<T, TData>) {
  const result = useIotaClientQuery(
    method,
    params as IotaRpcMethods[T]["params"],
    options
  );

  return children(result);
}
