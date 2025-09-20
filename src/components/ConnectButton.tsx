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

type ConnectButtonProps = SuiProps & IotaProps;

export function ConnectButton(props: ConnectButtonProps) {
  const chain = useChain();
  const ButtonComponent = chainRegistry[chain].components.ConnectButton;

  return <ButtonComponent {...props} />;
}
