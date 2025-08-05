"use client";

import { type PropsWithChildren } from "react";
import { WalletProvider, type WalletProviderProps } from "@mysten/dapp-kit";

type SuiWalletProviderAdapterProps = PropsWithChildren<
  Omit<WalletProviderProps, "children">
>;

export function SuiWalletProviderAdapter({
  children,
  ...rest
}: SuiWalletProviderAdapterProps) {
  return <WalletProvider {...rest}>{children}</WalletProvider>;
}
