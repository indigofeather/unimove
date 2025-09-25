"use client";

import type { PropsWithChildren } from "react";
import type { WalletProviderProps as IotaWalletProviderProps } from "@iota/dapp-kit";
import type { WalletProviderProps as SuiWalletProviderProps } from "@mysten/dapp-kit";

import { chainRegistry } from "../chains";
import { useChain } from "../context";

type WalletProviderProps = PropsWithChildren<
  Omit<SuiWalletProviderProps, "children"> &
    Omit<IotaWalletProviderProps, "children">
>;

export function WalletProvider({ children, ...props }: WalletProviderProps) {
  const chain = useChain();
  const ProviderComponent = chainRegistry[chain].providers.WalletProvider;

  const { slushWallet, ...rest } = props as {
    slushWallet?: unknown;
  } & Record<string, unknown>;

  const providerKey = `wallet-${chain}`;

  const providerProps =
    chain === "sui"
      ? ({ ...rest, slushWallet } as Record<string, unknown>)
      : (rest as Record<string, unknown>);

  return (
    <ProviderComponent key={providerKey} {...providerProps}>
      {children}
    </ProviderComponent>
  );
}
