"use client";

import { type PropsWithChildren, useMemo } from "react";
import {
  createNetworkConfig as createSuiNetworkConfig,
  SuiClientProvider,
  type SuiClientProviderProps,
} from "@mysten/dapp-kit";

type Networks = Record<string, { url: string }>;

type SuiClientProviderAdapterProps = PropsWithChildren<{
  networks: Networks;
  defaultNetwork?: SuiClientProviderProps<Networks>["defaultNetwork"];
  onNetworkChange?: SuiClientProviderProps<Networks>["onNetworkChange"];
}>;

export function SuiClientProviderAdapter({
  networks,
  children,
  ...rest
}: SuiClientProviderAdapterProps) {
  const { networkConfig } = useMemo(
    () => createSuiNetworkConfig(networks),
    [networks]
  );

  return (
    <SuiClientProvider {...rest} networks={networkConfig}>
      {children}
    </SuiClientProvider>
  );
}

