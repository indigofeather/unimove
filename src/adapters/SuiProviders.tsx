"use client";

import { type PropsWithChildren, useMemo } from "react";
import {
  createNetworkConfig as createSuiNetworkConfig,
  SuiClientProvider,
  type SuiClientProviderProps,
  WalletProvider as SuiWalletProvider,
  type WalletProviderProps,
} from "@mysten/dapp-kit";

type Networks = Record<string, { url: string }>;

type SuiProvidersProps = PropsWithChildren<{
  networks: Networks;
  walletProviderProps?: Omit<WalletProviderProps, "children">;
  defaultNetwork?: SuiClientProviderProps<Networks>["defaultNetwork"];
  onNetworkChange?: SuiClientProviderProps<Networks>["onNetworkChange"];
}>;

export function SuiProviders({
  networks,
  walletProviderProps,
  children,
  ...rest
}: SuiProvidersProps) {
  const { networkConfig } = useMemo(
    () => createSuiNetworkConfig(networks),
    [networks]
  );

  return (
    <SuiClientProvider {...rest} networks={networkConfig}>
      <SuiWalletProvider {...walletProviderProps}>{children}</SuiWalletProvider>
    </SuiClientProvider>
  );
}
