"use client";

import { type PropsWithChildren } from "react";
import {
  WalletProvider,
  type WalletProviderProps,
} from "@iota/dapp-kit";

type IotaWalletProviderAdapterProps = PropsWithChildren<
  Omit<WalletProviderProps, "children">
>;

export function IotaWalletProviderAdapter({
  children,
  ...rest
}: IotaWalletProviderAdapterProps) {
  return <WalletProvider {...rest}>{children}</WalletProvider>;
}

