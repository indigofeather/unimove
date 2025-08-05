"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import type { WalletProviderProps as SuiWalletProviderProps } from "@mysten/dapp-kit";
import type { WalletProviderProps as IotaWalletProviderProps } from "@iota/dapp-kit";

import { useChain } from "../context";

const SuiWalletProviderAdapter = dynamic(
  () =>
    import("../adapters/SuiWalletProvider").then(
      (m) => m.SuiWalletProviderAdapter
    ),
  { ssr: false }
);
const IotaWalletProviderAdapter = dynamic(
  () =>
    import("../adapters/IotaWalletProvider").then(
      (m) => m.IotaWalletProviderAdapter
    ),
  { ssr: false }
);

type WalletProviderProps = PropsWithChildren<{
  suiWalletProviderProps?: Omit<SuiWalletProviderProps, "children">;
  iotaWalletProviderProps?: Omit<IotaWalletProviderProps, "children">;
}>;

export function WalletProvider({
  children,
  suiWalletProviderProps,
  iotaWalletProviderProps,
}: WalletProviderProps) {
  const chain = useChain();

  return chain === "sui" ? (
    <SuiWalletProviderAdapter {...suiWalletProviderProps}>
      {children}
    </SuiWalletProviderAdapter>
  ) : (
    <IotaWalletProviderAdapter {...iotaWalletProviderProps}>
      {children}
    </IotaWalletProviderAdapter>
  );
}

