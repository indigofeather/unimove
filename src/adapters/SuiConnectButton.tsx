"use client";

import { ConnectButton as SuiConnectButton } from "@mysten/dapp-kit";
export function SuiConnectButtonAdapter(props: Record<string, unknown>) {
  return <SuiConnectButton {...props} />;
}
