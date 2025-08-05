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

type WalletProviderProps = PropsWithChildren<
  Omit<SuiWalletProviderProps, "children"> &
    Omit<IotaWalletProviderProps, "children">
>;

export function WalletProvider({
  children,
  ...props
}: WalletProviderProps) {
  const chain = useChain();

  return chain === "sui" ? (
    <SuiWalletProviderAdapter {...props}>
      {children}
    </SuiWalletProviderAdapter>
  ) : (
    <IotaWalletProviderAdapter {...props}>
      {children}
    </IotaWalletProviderAdapter>
  );
}

