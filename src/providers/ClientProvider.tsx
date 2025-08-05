"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import type { IotaClientProviderProps } from "@iota/dapp-kit";
import type { SuiClientProviderProps } from "@mysten/dapp-kit";

import { ChainContext } from "../context";

const SuiClientProviderAdapter = dynamic(
  () =>
    import("../adapters/SuiClientProvider").then(
      (m) => m.SuiClientProviderAdapter
    ),
  { ssr: false }
);
const IotaClientProviderAdapter = dynamic(
  () =>
    import("../adapters/IotaClientProvider").then(
      (m) => m.IotaClientProviderAdapter
    ),
  { ssr: false }
);

type Networks = Record<string, { url: string }>;

type ClientProviderProps = PropsWithChildren<
  | {
      chain: "sui";
      networks: Networks;
      defaultNetwork?: SuiClientProviderProps<Networks>["defaultNetwork"];
      onNetworkChange?: SuiClientProviderProps<Networks>["onNetworkChange"];
    }
  | {
      chain: "iota";
      networks: Networks;
      defaultNetwork?: IotaClientProviderProps<Networks>["defaultNetwork"];
      network?: IotaClientProviderProps<Networks>["network"];
      onNetworkChange?: IotaClientProviderProps<Networks>["onNetworkChange"];
    }
>;

export function ClientProvider(props: ClientProviderProps) {
  if (props.chain === "sui") {
    const { networks, defaultNetwork, onNetworkChange, children } = props;

    return (
      <ChainContext.Provider value="sui">
        <SuiClientProviderAdapter
          networks={networks}
          defaultNetwork={defaultNetwork}
          onNetworkChange={onNetworkChange}
        >
          {children}
        </SuiClientProviderAdapter>
      </ChainContext.Provider>
    );
  }

  const { networks, defaultNetwork, network, onNetworkChange, children } =
    props;

  return (
    <ChainContext.Provider value="iota">
      <IotaClientProviderAdapter
        networks={networks}
        defaultNetwork={defaultNetwork}
        network={network}
        onNetworkChange={onNetworkChange}
      >
        {children}
      </IotaClientProviderAdapter>
    </ChainContext.Provider>
  );
}
