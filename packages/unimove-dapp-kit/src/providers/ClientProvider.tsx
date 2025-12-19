"use client";

import { type PropsWithChildren } from "react";
import type {
  IotaClientProviderProps,
  NetworkConfig as IotaNetworkConfig,
} from "@iota/dapp-kit";
import type {
  SuiClientProviderProps,
  NetworkConfig as SuiNetworkConfig,
} from "@mysten/dapp-kit";
import type { SuiClient } from "@mysten/sui/client";

import { chainRegistry } from "../chains";
import { ChainContext } from "../context";

type SuiNetworks = Record<string, SuiNetworkConfig | SuiClient>;
type IotaClientInstance = ReturnType<
  NonNullable<IotaClientProviderProps<any>["createClient"]>
>;
type IotaNetworks = Record<string, IotaNetworkConfig | IotaClientInstance>;

type CommonProps<TNetworks> = PropsWithChildren<{
  networks?: TNetworks;
}>;

type SuiProps = CommonProps<SuiNetworks> & {
  chain: "sui";
  createClient?: SuiClientProviderProps<SuiNetworks>["createClient"];
  defaultNetwork?: SuiClientProviderProps<SuiNetworks>["defaultNetwork"];
  network?: SuiClientProviderProps<SuiNetworks>["network"];
  onNetworkChange?: SuiClientProviderProps<SuiNetworks>["onNetworkChange"];
};

type IotaProps = CommonProps<IotaNetworks> & {
  chain: "iota";
  createClient?: IotaClientProviderProps<IotaNetworks>["createClient"];
  defaultNetwork?: IotaClientProviderProps<IotaNetworks>["defaultNetwork"];
  network?: IotaClientProviderProps<IotaNetworks>["network"];
  onNetworkChange?: IotaClientProviderProps<IotaNetworks>["onNetworkChange"];
};

type ClientProviderProps = SuiProps | IotaProps;

function createProviderKey(
  chain: string,
  networks?: Record<string, unknown>
) {
  try {
    return `${chain}-${JSON.stringify(networks)}`;
  } catch {
    return `${chain}`;
  }
}

export function ClientProvider(props: ClientProviderProps) {
  const { chain, networks, children } = props;

  const providerKey = createProviderKey(chain, networks);

  if (chain === "sui") {
    const { createClient, defaultNetwork, network, onNetworkChange } = props;
    const ProviderComponent = chainRegistry.sui.providers.ClientProvider;

    const providerProps: Record<string, unknown> = {};

    if (typeof networks !== "undefined") {
      providerProps.networks = networks;
    }

    if (typeof createClient !== "undefined") {
      providerProps.createClient = createClient;
    }

    if (typeof network !== "undefined") {
      providerProps.network = network;
    } else if (typeof defaultNetwork !== "undefined") {
      providerProps.defaultNetwork = defaultNetwork;
    }

    if (onNetworkChange) {
      providerProps.onNetworkChange = onNetworkChange;
    }

    return (
      <ChainContext.Provider value="sui">
        <ProviderComponent key={providerKey} {...providerProps}>
          {children}
        </ProviderComponent>
      </ChainContext.Provider>
    );
  }

  const { createClient, defaultNetwork, network, onNetworkChange } = props;
  const ProviderComponent = chainRegistry.iota.providers.ClientProvider;

  const providerProps: Record<string, unknown> = {};

  if (typeof networks !== "undefined") {
    providerProps.networks = networks;
  }

  if (typeof createClient !== "undefined") {
    providerProps.createClient = createClient;
  }

  if (typeof network !== "undefined") {
    providerProps.network = network;
  } else if (typeof defaultNetwork !== "undefined") {
    providerProps.defaultNetwork = defaultNetwork;
  }

  if (onNetworkChange) {
    providerProps.onNetworkChange = onNetworkChange;
  }

  return (
    <ChainContext.Provider value="iota">
      <ProviderComponent key={providerKey} {...providerProps}>
        {children}
      </ProviderComponent>
    </ChainContext.Provider>
  );
}
