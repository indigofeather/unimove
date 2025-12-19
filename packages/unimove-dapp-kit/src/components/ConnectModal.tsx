"use client";

import type { ComponentProps } from "react";

import { chainRegistry } from "../chains";
import { useChain } from "../context";

type SuiProps = ComponentProps<
  typeof chainRegistry["sui"]["components"]["ConnectModal"]
>;
type IotaProps = ComponentProps<
  typeof chainRegistry["iota"]["components"]["ConnectModal"]
>;

type ConnectModalProps = SuiProps | IotaProps;

export function ConnectModal(props: ConnectModalProps) {
  const chain = useChain();

  if (chain === "sui") {
    const ModalComponent = chainRegistry.sui.components.ConnectModal;
    const { onConnected: _onConnected, ...rest } = props as SuiProps & IotaProps;
    return <ModalComponent {...(rest as SuiProps)} />;
  }

  const ModalComponent = chainRegistry.iota.components.ConnectModal;
  const { walletFilter: _walletFilter, ...rest } = props as SuiProps & IotaProps;
  return <ModalComponent {...(rest as IotaProps)} />;
}
