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

export function WalletProvider({ children, ...props }: WalletProviderProps) {
  const chain = useChain();

  // 使用 key 來確保切換鏈時正確重新掛載
  const walletKey = `wallet-${chain}`;

  return chain === "sui" ? (
    <SuiWalletProviderAdapter key={walletKey} {...props}>
      {children}
    </SuiWalletProviderAdapter>
  ) : (
    <IotaWalletProviderAdapter key={walletKey} {...props}>
      {children}
    </IotaWalletProviderAdapter>
  );
}
