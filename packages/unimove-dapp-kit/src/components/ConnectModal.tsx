"use client";

import type { ComponentProps, ComponentType } from "react";

import { chainRegistry } from "../chains";
import { useChain } from "../context";

type SuiProps = ComponentProps<
  typeof chainRegistry["sui"]["components"]["ConnectModal"]
>;
type IotaProps = ComponentProps<
  typeof chainRegistry["iota"]["components"]["ConnectModal"]
>;

type ConnectModalProps = SuiProps & IotaProps;

export function ConnectModal(props: ConnectModalProps) {
  const chain = useChain();
  const ModalComponent = chainRegistry[chain].components
    .ConnectModal as ComponentType<ConnectModalProps>;

  return <ModalComponent {...props} />;
}
