"use client";

import type { JSX } from "react";

import { useClientQuery } from "../hooks/useClientQuery";
import type { UnimoveClientQueryResult } from "../hooks/useClientQuery";

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
  const result = useClientQuery(
    props.method as never,
    props.params as never,
    props.options as never
  ) as UnimoveClientQueryResult<TData>;

  return props.children({
    data: result.data,
    isPending: result.isPending,
    error: result.error,
  });
}
