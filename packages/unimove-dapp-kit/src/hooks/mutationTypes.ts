"use client";

import type { UseMutationResult } from "@tanstack/react-query";

type MutationResultParts<T> = T extends UseMutationResult<
  infer Data,
  infer Error,
  infer Variables,
  infer Context
>
  ? {
      data: Data;
      error: Error;
      variables: Variables;
      context: Context;
    }
  : never;

export type MergeUseMutationResult<T> = [T] extends [
  UseMutationResult<any, any, any, any>,
]
  ? UseMutationResult<
      MutationResultParts<T>["data"],
      MutationResultParts<T>["error"],
      MutationResultParts<T>["variables"],
      MutationResultParts<T>["context"]
    >
  : T;
