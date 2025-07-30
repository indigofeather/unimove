"use client";

import { ConnectButton as IotaConnectButton } from "@iota/dapp-kit";
export function IotaConnectButtonAdapter(props: Record<string, unknown>) {
  return <IotaConnectButton {...props} />;
}
