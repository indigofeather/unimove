"use client";

import type { ComponentProps } from "react";
import dynamic from "next/dynamic";

import { useChain } from "../context";

const SuiConnectModal = dynamic(
  () => import("@mysten/dapp-kit").then((m) => m.ConnectModal),
  { ssr: false }
);
const IotaConnectModal = dynamic(
  () => import("@iota/dapp-kit").then((m) => m.ConnectModal),
  { ssr: false }
);

type SuiConnectModalProps = ComponentProps<typeof SuiConnectModal>;
type IotaConnectModalProps = ComponentProps<typeof IotaConnectModal>;

type ConnectModalProps = SuiConnectModalProps | IotaConnectModalProps;

export function ConnectModal(props: ConnectModalProps) {
  const chain = useChain();

  if (chain === "sui") {
    return <SuiConnectModal {...(props as SuiConnectModalProps)} />;
  }

  if (chain === "iota") {
    return <IotaConnectModal {...(props as IotaConnectModalProps)} />;
  }

  return null;
}
