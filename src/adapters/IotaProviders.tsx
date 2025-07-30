"use client";

import { type PropsWithChildren, useMemo } from "react";
import {
  createNetworkConfig as createIotaNetworkConfig,
  IotaClientProvider,
  type IotaClientProviderProps,
  WalletProvider as IotaWalletProvider,
  type WalletProviderProps,
} from "@iota/dapp-kit";

type Networks = Record<string, { url: string }>;

type IotaProvidersProps = PropsWithChildren<{
  networks: Networks;
  walletProviderProps?: Omit<WalletProviderProps, "children">;
  defaultNetwork?: IotaClientProviderProps<Networks>["defaultNetwork"];
  onNetworkChange?: IotaClientProviderProps<Networks>["onNetworkChange"];
}>;

export function IotaProviders({
  networks,
  walletProviderProps,
  children,
  ...rest
}: IotaProvidersProps) {
  const { networkConfig } = useMemo(
    () => createIotaNetworkConfig(networks),
    [networks]
  );

  return (
    <IotaClientProvider {...rest} networks={networkConfig}>
      <IotaWalletProvider {...walletProviderProps}>
        {children}
      </IotaWalletProvider>
    </IotaClientProvider>
  );
}
