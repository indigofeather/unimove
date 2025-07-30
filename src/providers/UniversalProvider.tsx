"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import type {
  IotaClientProviderProps,
  WalletProviderProps as IotaWalletProviderProps,
} from "@iota/dapp-kit";
import type {
  SuiClientProviderProps,
  WalletProviderProps as SuiWalletProviderProps,
} from "@mysten/dapp-kit";

import { ChainContext } from "../context";

const SuiProviders = dynamic(
  () => import("../adapters/SuiProviders").then((m) => m.SuiProviders),
  { ssr: false }
);
const IotaProviders = dynamic(
  () => import("../adapters/IotaProviders").then((m) => m.IotaProviders),
  { ssr: false }
);

type Networks = Record<string, { url: string }>;

type UniversalProviderProps = PropsWithChildren<
  | {
      chain: "sui";
      networks: Networks;
      walletProviderProps?: SuiWalletProviderProps;
      defaultNetwork?: SuiClientProviderProps<Networks>["defaultNetwork"];
      onNetworkChange?: SuiClientProviderProps<Networks>["onNetworkChange"];
    }
  | {
      chain: "iota";
      networks: Networks;
      walletProviderProps?: IotaWalletProviderProps;
      defaultNetwork?: IotaClientProviderProps<Networks>["defaultNetwork"];
      network?: IotaClientProviderProps<Networks>["network"];
      onNetworkChange?: IotaClientProviderProps<Networks>["onNetworkChange"];
    }
>;

export function UniversalProvider(props: UniversalProviderProps) {
  return (
    <ChainContext.Provider value={props.chain}>
      {props.chain === "sui" ? (
        <SuiProviders {...props}>{props.children}</SuiProviders>
      ) : (
        <IotaProviders {...props}>{props.children}</IotaProviders>
      )}
    </ChainContext.Provider>
  );
}
