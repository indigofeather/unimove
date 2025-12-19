"use client";

import type { PropsWithChildren } from "react";
import type { WalletProviderProps as IotaWalletProviderProps } from "@iota/dapp-kit";
import type { WalletProviderProps as SuiWalletProviderProps } from "@mysten/dapp-kit";

import { chainRegistry } from "../chains";
import { useChain } from "../context";

type SuiWalletProps = Omit<SuiWalletProviderProps, "children">;
type IotaWalletProps = Omit<IotaWalletProviderProps, "children">;

type WalletProviderProps = PropsWithChildren<SuiWalletProps | IotaWalletProps>;

export function WalletProvider({ children, ...props }: WalletProviderProps) {
  const chain = useChain();
  const providerKey = `wallet-${chain}`;

  if (chain === "sui") {
    const ProviderComponent = chainRegistry.sui.providers.WalletProvider;
    const { slushWallet, chain: _chain, ...rest } = props as SuiWalletProps & {
      slushWallet?: unknown;
      chain?: unknown;
    };

    return (
      <ProviderComponent
        key={providerKey}
        {...(rest as SuiWalletProps)}
        slushWallet={slushWallet}
      >
        {children}
      </ProviderComponent>
    );
  }

  const ProviderComponent = chainRegistry.iota.providers.WalletProvider;
  const { chain: walletChain, slushWallet: _slushWallet, ...rest } =
    props as IotaWalletProps & {
      chain?: unknown;
      slushWallet?: unknown;
    };

  return (
    <ProviderComponent
      key={providerKey}
      {...(rest as IotaWalletProps)}
      chain={walletChain as IotaWalletProps["chain"]}
    >
      {children}
    </ProviderComponent>
  );
}
