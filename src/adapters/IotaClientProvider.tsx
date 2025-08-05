"use client";

import { type PropsWithChildren, useMemo } from "react";
import {
  createNetworkConfig as createIotaNetworkConfig,
  IotaClientProvider,
  type IotaClientProviderProps,
} from "@iota/dapp-kit";

type Networks = Record<string, { url: string }>;

type IotaClientProviderAdapterProps = PropsWithChildren<{
  networks: Networks;
  defaultNetwork?: IotaClientProviderProps<Networks>["defaultNetwork"];
  network?: IotaClientProviderProps<Networks>["network"];
  onNetworkChange?: IotaClientProviderProps<Networks>["onNetworkChange"];
}>;

export function IotaClientProviderAdapter({
  networks,
  children,
  ...rest
}: IotaClientProviderAdapterProps) {
  const { networkConfig } = useMemo(
    () => createIotaNetworkConfig(networks),
    [networks]
  );

  return (
    <IotaClientProvider
      {...(rest as IotaClientProviderProps<Networks>)}
      networks={networkConfig}
    >
      {children}
    </IotaClientProvider>
  );
}

