"use client";

import type { ComponentPropsWithoutRef } from "react";

import { chainRegistry } from "../chains";
import { useChain } from "../context";

type SuiProps = ComponentPropsWithoutRef<
  typeof chainRegistry["sui"]["components"]["ConnectButton"]
>;
type IotaProps = ComponentPropsWithoutRef<
  typeof chainRegistry["iota"]["components"]["ConnectButton"]
>;

type ConnectButtonProps = SuiProps | IotaProps;

export function ConnectButton(props: ConnectButtonProps) {
  const chain = useChain();

  if (chain === "sui") {
    const ButtonComponent = chainRegistry.sui.components.ConnectButton;
    const { size: _size, iotaNamesEnabled: _iotaNamesEnabled, onConnected: _onConnected, ...rest } =
      props as SuiProps & IotaProps;
    return <ButtonComponent {...(rest as SuiProps)} />;
  }

  const ButtonComponent = chainRegistry.iota.components.ConnectButton;
  const { walletFilter: _walletFilter, ...rest } = props as SuiProps & IotaProps;
  return <ButtonComponent {...(rest as IotaProps)} />;
}
