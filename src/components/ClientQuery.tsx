"use client";

import {
  type IotaRpcMethodName,
  type IotaRpcMethods,
  type UseIotaClientQueryOptions,
} from "@iota/dapp-kit";
import {
  type SuiRpcMethodName,
  type SuiRpcMethods,
  type UseSuiClientQueryOptions,
} from "@mysten/dapp-kit";
import dynamic from "next/dynamic";
import type { JSX } from "react";

import { useChain } from "../context";

const SuiQuery = dynamic(
  () => import("../adapters/SuiQuery").then((m) => m.SuiQuery),
  { ssr: false }
);
const IotaQuery = dynamic(
  () => import("../adapters/IotaQuery").then((m) => m.IotaQuery),
  { ssr: false }
);

export function ClientQuery<TData = unknown>(props: {
  method: string;
  params?: unknown;
  options?: unknown;
  children: (r: {
    data?: TData;
    isPending: boolean;
    error?: unknown;
  }) => JSX.Element;
}) {
  const chain = useChain();

  if (chain === "sui") {
    return (
      <SuiQuery
        method={props.method as SuiRpcMethodName}
        params={props.params as SuiRpcMethods[SuiRpcMethodName]["params"]}
        options={
          props.options as UseSuiClientQueryOptions<SuiRpcMethodName, TData>
        }
      >
        {(result) =>
          props.children({
            data: result.data as TData,
            isPending: result.isPending,
            error: result.error,
          })
        }
      </SuiQuery>
    );
  }

  return (
    <IotaQuery
      method={props.method as IotaRpcMethodName}
      params={props.params as IotaRpcMethods[IotaRpcMethodName]["params"]}
      options={
        props.options as UseIotaClientQueryOptions<IotaRpcMethodName, TData>
      }
    >
      {(result) =>
        props.children({
          data: result.data as TData,
          isPending: result.isPending,
          error: result.error,
        })
      }
    </IotaQuery>
  );
}
