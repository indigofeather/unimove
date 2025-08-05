"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import type { IotaClientProviderProps } from "@iota/dapp-kit";
import type { SuiClientProviderProps } from "@mysten/dapp-kit";

import { ChainContext } from "../context";
import type { Networks } from "../types";

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
  // 使用 key 來強制重新掛載，避免狀態混亂
  const providerKey = `${props.chain}-${JSON.stringify(props.networks)}`;

  if (props.chain === "sui") {
    const { networks, defaultNetwork, onNetworkChange, children } = props;

    return (
      <ChainContext.Provider value="sui">
        <SuiClientProviderAdapter
          key={providerKey}
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
        key={providerKey}
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
