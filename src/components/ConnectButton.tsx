"use client";

import dynamic from "next/dynamic";

import { useChain } from "../context";

const SuiConnectButton = dynamic(
  () =>
    import("../adapters/SuiConnectButton").then(
      (m) => m.SuiConnectButtonAdapter
    ),
  { ssr: false }
);
const IotaConnectButton = dynamic(
  () =>
    import("../adapters/IotaConnectButton").then(
      (m) => m.IotaConnectButtonAdapter
    ),
  { ssr: false }
);

export function ConnectButton(props: Record<string, unknown>) {
  const chain = useChain();
  return chain === "sui" ? (
    <SuiConnectButton {...props} />
  ) : (
    <IotaConnectButton {...props} />
  );
}
