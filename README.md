# unimove-dapp-kit

A thin, Next.js-ready adapter layer to switch between Sui and IOTA dapp-kits at runtime with dynamic imports. `unimove-dapp-kit` provides a set of universal components and hooks that allow you to build decentralized applications supporting both Sui and IOTA chains with a single codebase.

## Features

- ✅ **Chain Agnostic Components**: Use components like `ConnectButton`, `ConnectModal`, and `UniversalQuery` that automatically adapt to the selected chain.
- ✅ **Universal Hooks**: A single set of hooks (e.g., `useCurrentWallet`, `useAccounts`, `useSignAndExecuteTransactionBlock`) for interacting with both wallets.
- ✅ **Dependency Injection**: The library is designed to be lightweight. You only need to install the SDKs for the chains you intend to support. The library uses dynamic imports to avoid bundling unused code.
- ✅ **Runtime Switching**: Change the entire dApp's context from Sui to IOTA by changing a single `chain` prop.
- ✅ **Next.js Compatible**: Built with "use client" and Next.js's `dynamic` imports in mind for optimal performance and SSR compatibility.

## Installation

First, install the core package:

```bash
bun add unimove-dapp-kit
# or
npm install unimove-dapp-kit
# or
yarn add unimove-dapp-kit
```

Next, install the peer dependencies for the chains you want to support.

**For Sui support:**

```bash
bun add @mysten/dapp-kit @mysten/sui @tanstack/react-query react react-dom next
```

**For IOTA support:**

```bash
bun add @iota/dapp-kit @iota/sdk @tanstack/react-query react react-dom next
```

## Quick Start

Wrap your application with the `UniversalProvider` and pass the desired `chain` and network configurations.

### Example for Sui

In your `app/layout.tsx` or a root client component:

```tsx
"use client";

import { UniversalProvider } from "unimove-dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

// Create your network configuration
const suiNetworks = {
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  devnet: { url: getFullnodeUrl("devnet") },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UniversalProvider
          chain="sui"
          networks={suiNetworks}
          defaultNetwork="testnet"
          onNetworkChange={(network) => console.log("Sui network changed to", network)}
        >
          {children}
        </UniversalProvider>
      </body>
    </html>
  );
}
```

### Example for IOTA

```tsx
"use client";

import { UniversalProvider } from "unimove-dapp-kit";
import { getFullnodeUrl } from "@iota/sdk";

// Create your network configuration
const iotaNetworks = {
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UniversalProvider
          chain="iota"
          networks={iotaNetworks}
          defaultNetwork="testnet"
        >
          {children}
        </UniversalProvider>
      </body>
    </html>
  );
}
```

### Using the Components

Once the provider is set up, you can use the universal components and hooks anywhere in your app.

```tsx
"use client";

import { useState } from "react";
import {
  ConnectButton,
  ConnectModal,
  useCurrentAccount,
  useDisconnectWallet,
} from "unimove-dapp-kit";

export function MyAwesomeComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  return (
    <div>
      <ConnectButton />
      <button onClick={() => setIsModalOpen(true)}>Open Wallet Modal</button>
      <ConnectModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {account && (
        <div>
          <p>Current Account: {account.address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Providers

-   `UniversalProvider`: The main provider to wrap your application.

### Components

-   `ConnectButton`: A button that shows the connection status and opens the `ConnectModal` on click.
-   `ConnectModal`: A modal for selecting and connecting to a wallet.
-   `UniversalQuery`: A component for making chain-specific queries.

### Hooks

-   `useChain()`: Returns the currently active chain (`"sui"` or `"iota"`).
-   `useAccounts()`: Returns a list of all accounts associated with the connected wallet.
-   `useCurrentAccount()`: Returns the currently selected account.
-   `useCurrentWallet()`: Returns the currently connected wallet.
-   `useConnectWallet()`: Returns a mutation function for connecting to a wallet.
-   `useDisconnectWallet()`: Returns a mutation function for disconnecting from a wallet.
-   `useSignAndExecuteTransactionBlock()`: Returns a mutation function for signing and executing a transaction.
-   ... and more!

## License

This project is licensed under the MIT License.