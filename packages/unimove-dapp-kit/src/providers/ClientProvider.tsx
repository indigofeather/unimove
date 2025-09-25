"use client";

import { useMemo, type PropsWithChildren } from "react";
import type { IotaClientProviderProps } from "@iota/dapp-kit";
import type { SuiClientProviderProps } from "@mysten/dapp-kit";

import { chainRegistry } from "../chains";
import { ChainContext } from "../context";

type Networks = Record<string, { url: string }>

type CommonProps = PropsWithChildren<{
  networks: Networks;
}>;

type SuiProps = CommonProps & {
  chain: "sui";
  defaultNetwork?: SuiClientProviderProps<Networks>["defaultNetwork"];
  onNetworkChange?: SuiClientProviderProps<Networks>["onNetworkChange"];
};

type IotaProps = CommonProps & {
  chain: "iota";
  defaultNetwork?: IotaClientProviderProps<Networks>["defaultNetwork"];
  network?: IotaClientProviderProps<Networks>["network"];
  onNetworkChange?: IotaClientProviderProps<Networks>["onNetworkChange"];
};

type ClientProviderProps = SuiProps | IotaProps;

function createProviderKey(chain: string, networks: Networks) {
  try {
    return `${chain}-${JSON.stringify(networks)}`;
  } catch {
    return `${chain}`;
  }
}

export function ClientProvider(props: ClientProviderProps) {
  const { chain, networks, children } = props;

  const networkConfig = useMemo(() => {
    if (chain === "sui") {
      return chainRegistry.sui.providers.createNetworkConfig(networks)
        .networkConfig;
    }

    return chainRegistry.iota.providers.createNetworkConfig(networks)
      .networkConfig;
  }, [chain, networks]);

  const providerKey = createProviderKey(chain, networks);

  if (chain === "sui") {
    const { defaultNetwork, onNetworkChange } = props;
    const ProviderComponent = chainRegistry.sui.providers.ClientProvider;

    const providerProps: Record<string, unknown> = {
      networks: networkConfig,
    };

    if (typeof defaultNetwork !== "undefined") {
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

  const { defaultNetwork, network, onNetworkChange } = props;
  const ProviderComponent = chainRegistry.iota.providers.ClientProvider;

  const providerProps: Record<string, unknown> = {
    networks: networkConfig,
  };

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
