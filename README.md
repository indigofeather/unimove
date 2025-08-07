# unimove-sdk

A comprehensive SDK for building cross-chain decentralized applications on Sui and IOTA. `unimove-sdk` combines the power of dApp-kit UI components with robust SDK functionality, enabling you to build applications that seamlessly switch between chains at runtime with a unified API.

## Features

- 🔗 **Cross-Chain SDK**: Complete SDK functionality for both Sui and IOTA with unified APIs for queries, transactions, and account management
- 🎨 **Built-in UI Components**: Ready-to-use components like `ConnectButton`, `ConnectModal`, and `ClientQuery` that automatically adapt to the selected chain
- 🔄 **Runtime Chain Switching**: Seamlessly switch between Sui and IOTA at runtime with a single `chain` prop change
- 🪝 **Universal Hooks**: Consistent hooks API (`useCurrentWallet`, `useAccounts`, `useSignAndExecuteTransaction`) that works across both chains
- 📦 **Lightweight & Modular**: Dynamic imports ensure you only bundle the SDKs you actually use
- ⚡ **Next.js Optimized**: Built with SSR compatibility and optimal performance in mind
- 🔧 **TypeScript First**: Full TypeScript support with comprehensive type definitions

## Installation

First, install the core SDK:

```bash
bun add unimove-sdk
# or
npm install unimove-sdk
# or
yarn add unimove-sdk
```

## TypeScript Support

The SDK provides comprehensive TypeScript support with exported types:

```tsx
import type { Networks, ChainType, NetworkName } from "unimove-sdk";

// Define your network configuration with proper typing
const networks: Networks = {
  mainnet: { url: "https://fullnode.mainnet.sui.io:443" },
  testnet: { url: "https://fullnode.testnet.sui.io:443" },
  devnet: { url: "https://fullnode.devnet.sui.io:443" },
};

// Type-safe chain selection
const chain: ChainType = "sui"; // or "iota"

// Network name validation
const defaultNetwork: NetworkName = "testnet";
```

Next, install the peer dependencies for the chains you want to support.

**For Sui support:**

```bash
bun add @mysten/dapp-kit @mysten/sui @tanstack/react-query react react-dom next
```

**For IOTA support:**

```bash
bun add @iota/dapp-kit @iota/iota-sdk @tanstack/react-query react react-dom next
```

## Quick Start

Wrap your application with the `ClientProvider` and nest a `WalletProvider` inside it. Pass the desired `chain` and network configurations to the `ClientProvider`.

### Example for Sui

In your `app/layout.tsx` or a root client component:

```tsx
"use client";

import {
  ClientProvider,
  WalletProvider,
  unimoveSDK,
  type Networks,
  type ChainType,
} from "unimove-sdk";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [networks, setNetworks] = useState<Networks | null>(null);
  const chain: ChainType = "sui"; // This could come from your state management

  useEffect(() => {
    const initNetworks = async () => {
      const sdk = await unimoveSDK(chain);
      const { getFullnodeUrl } = sdk.client;

      setNetworks({
        mainnet: { url: getFullnodeUrl("mainnet") },
        testnet: { url: getFullnodeUrl("testnet") },
        devnet: { url: getFullnodeUrl("devnet") },
      });
    };

    initNetworks();
  }, [chain]);

  if (!networks) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <ClientProvider
          chain={chain}
          networks={networks}
          defaultNetwork="testnet"
          onNetworkChange={(network) =>
            console.log("Network changed to", network)
          }
        >
          <WalletProvider autoConnect>{children}</WalletProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
```

### Example for IOTA

```tsx
"use client";

import {
  ClientProvider,
  WalletProvider,
  unimoveSDK,
  type Networks,
  type ChainType,
} from "unimove-sdk";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [networks, setNetworks] = useState<Networks | null>(null);
  const chain: ChainType = "iota"; // This could come from your state management

  useEffect(() => {
    const initNetworks = async () => {
      const sdk = await unimoveSDK(chain);
      const { getFullnodeUrl } = sdk.client;

      setNetworks({
        mainnet: { url: getFullnodeUrl("mainnet") },
        testnet: { url: getFullnodeUrl("testnet") },
      });
    };

    initNetworks();
  }, [chain]);

  if (!networks) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <ClientProvider
          chain={chain}
          networks={networks}
          defaultNetwork="testnet"
        >
          <WalletProvider autoConnect>{children}</WalletProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
```

### Full Example: Chain Switching with autoConnect

The following example pre-initializes networks for both Sui and IOTA. It allows switching between chains while keeping `autoConnect` working for the active wallet.

```tsx
"use client";

import "@mysten/dapp-kit/dist/index.css";
import "@iota/dapp-kit/dist/index.css";
import { MantineProvider } from "@mantine/core";
import {
  ClientProvider,
  Networks,
  unimoveSDK,
  WalletProvider,
} from "unimove-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

import { useChainStore } from "@/stores/chain";

const queryClient = new QueryClient();

// Pre-initialize networks for all chains
const allNetworks: { sui: Networks; iota: Networks } = await initAllNetworks();

async function initAllNetworks() {
  const [suiSDK, iotaSDK] = await Promise.all([
    unimoveSDK("sui"),
    unimoveSDK("iota"),
  ]);

  return {
    sui: {
      testnet: { url: suiSDK.client.getFullnodeUrl("testnet") },
      mainnet: { url: suiSDK.client.getFullnodeUrl("mainnet") },
      devnet: { url: suiSDK.client.getFullnodeUrl("devnet") },
    },
    iota: {
      testnet: { url: iotaSDK.client.getFullnodeUrl("testnet") },
      mainnet: { url: iotaSDK.client.getFullnodeUrl("mainnet") },
      devnet: { url: iotaSDK.client.getFullnodeUrl("devnet") },
    },
  };
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { chain } = useChainStore();
  const networks = useMemo(() => allNetworks[chain], [chain]);

  return (
    <MantineProvider forceColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <ClientProvider chain={chain} networks={networks}>
          <WalletProvider autoConnect>{children}</WalletProvider>
        </ClientProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
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
  useChain,
  useClientQuery,
} from "unimove-sdk";

export function MyAwesomeComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const account = useCurrentAccount();
  const chain = useChain();
  const { mutate: disconnect } = useDisconnectWallet();

  // Example of using the unified query API
  const { data: balance } = useClientQuery(
    "getBalance",
    { owner: account?.address },
    { enabled: !!account?.address }
  );

  return (
    <div>
      <div>
        <h2>Current Chain: {chain}</h2>
        <ConnectButton />
        <button onClick={() => setIsModalOpen(true)}>Open Wallet Modal</button>
      </div>

      <ConnectModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {account && (
        <div>
          <p>Current Account: {account.address}</p>
          {balance && <p>Balance: {balance.totalBalance}</p>}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
```

## SDK Usage

### Direct SDK Access

You can also use the SDK directly for more advanced use cases:

```tsx
import { unimoveSDK } from "unimove-sdk";

// Initialize SDK for a specific chain
const sdk = await unimoveSDK("sui");

// Access client and other modules
const { client, transactions, bcs, utils } = sdk;

// Query blockchain data
const objects = await client.getOwnedObjects({
  owner: "0x...",
});

// Access chain-specific utilities
const coinMetadata = await client.getCoinMetadata({
  coinType: "0x2::sui::SUI",
});

// Create transactions
const tx = new transactions.Transaction();
```

### Dynamic Chain Switching

```tsx
import { useUnimoveSDK, type ChainType } from "unimove-sdk";
import { useState } from "react";

function ChainSwitcher() {
  const [chain, setChain] = useState<ChainType>("sui");
  const { sdk, loading, error } = useUnimoveSDK(chain);

  const switchChain = (newChain: ChainType) => {
    setChain(newChain);
  };

  if (loading) return <div>Loading SDK...</div>;
  if (error) return <div>Error loading SDK: {error.message}</div>;

  return (
    <div>
      <button onClick={() => switchChain("sui")}>Switch to Sui</button>
      <button onClick={() => switchChain("iota")}>Switch to IOTA</button>
      <p>Current chain: {chain}</p>
      {sdk && <p>SDK loaded successfully</p>}
    </div>
  );
}
```

## API Reference

### Types

- `Networks`: Network configuration object type `Record<string, { url: string }>`
- `ChainType`: Supported chain types `"sui" | "iota"`
- `NetworkName`: Common network names `"mainnet" | "testnet" | "devnet" | "localnet"`

### Core Functions

- `unimoveSDK(chain: ChainType)`: Initialize SDK for a specific chain, returns modules including client, transactions, bcs, utils, etc.

### Providers

- `ClientProvider`: Provides chain-specific clients based on the `chain` prop.
- `WalletProvider`: Wraps the appropriate wallet provider for the active chain.

### Components

- `ConnectButton`: A button that shows the connection status and opens the `ConnectModal` on click.
- `ConnectModal`: A modal for selecting and connecting to a wallet.
- `ClientQuery`: A component for making chain-specific queries.

### Themes

- `lightTheme`: Universal light theme object containing themes for both Sui and IOTA
- `suiLightTheme`: Light theme specifically for Sui
- `iotaLightTheme`: Light theme specifically for IOTA
- Theme types: `UniversalTheme`, `UniversalThemeVars`, `UniversalDynamicTheme` for cross-chain theming

### Hooks

#### Chain & Wallet Management

- `useChain()`: Returns the currently active chain (`"sui"` or `"iota"`)
- `useCurrentAccount()`: Returns the currently selected account
- `useCurrentWallet()`: Returns the currently connected wallet
- `useAccounts()`: Returns a list of all accounts associated with the connected wallet
- `useConnectWallet()`: Returns a mutation function for connecting to a wallet
- `useDisconnectWallet()`: Returns a mutation function for disconnecting from a wallet
- `useAutoConnectWallet()`: Automatically connects to a previously connected wallet
- `useSwitchAccount()`: Returns a mutation function for switching between accounts
- `useWallets()`: Returns a list of all available wallets

#### Transactions & Queries

- `useSignAndExecuteTransaction()`: Returns a mutation function for signing and executing transactions
- `useClientQuery()`: Unified query hook that works with both Sui and IOTA clients
- `useClientInfiniteQuery()`: Unified infinite query hook for paginated data
- `useClientMutation()`: Unified mutation hook for client operations
- `useClientQueries()`: Execute multiple queries in parallel
- `useSignPersonalMessage()`: Sign arbitrary messages with the connected wallet
- `useSignTransaction()`: Sign transactions without executing

#### Network & Client

- `useClient()`: Access the underlying chain client directly
- `useUnimoveSDK()`: Hook version of unimoveSDK that returns SDK modules with loading and error states

## Advanced Examples

### Building a Multi-Chain Portfolio Tracker

```tsx
"use client";

import { useState } from "react";
import {
  unimoveSDK,
  useCurrentAccount,
  useClientQuery,
  ConnectButton,
} from "unimove-sdk";

function PortfolioTracker() {
  const [selectedChain, setSelectedChain] = useState<"sui" | "iota">("sui");
  const account = useCurrentAccount();

  // Query balance for current chain
  const { data: balance, isLoading } = useClientQuery(
    "getBalance",
    { owner: account?.address },
    { enabled: !!account?.address }
  );

  // Query owned objects
  const { data: objects } = useClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address,
      options: { showContent: true, showType: true },
    },
    { enabled: !!account?.address }
  );

  return (
    <div>
      <div>
        <ConnectButton />
        <div>
          <button
            onClick={() => setSelectedChain("sui")}
            disabled={selectedChain === "sui"}
          >
            Sui
          </button>
          <button
            onClick={() => setSelectedChain("iota")}
            disabled={selectedChain === "iota"}
          >
            IOTA
          </button>
        </div>
      </div>

      {account && (
        <div>
          <h2>{selectedChain.toUpperCase()} Portfolio</h2>
          <p>Address: {account.address}</p>

          {isLoading ? (
            <p>Loading balance...</p>
          ) : balance ? (
            <p>Balance: {balance.totalBalance}</p>
          ) : null}

          {objects && (
            <div>
              <h3>Owned Objects: {objects.data.length}</h3>
              {objects.data.slice(0, 5).map((obj) => (
                <div key={obj.data?.objectId}>
                  <p>ID: {obj.data?.objectId}</p>
                  <p>Type: {obj.data?.type}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

### Transaction Example

```tsx
import {
  useSignAndExecuteTransaction,
  useCurrentAccount,
  unimoveSDK,
} from "unimove-sdk";

function TransferComponent() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleTransfer = async () => {
    if (!account) return;

    // Get the current SDK instance
    const sdk = await unimoveSDK("sui"); // or "iota"
    const { transactions } = sdk;

    const tx = new transactions.Transaction();

    // Add your transaction logic here
    tx.transferObjects(
      [tx.gas],
      "0x..." // recipient address
    );

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log("Transaction successful:", result);
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
        },
      }
    );
  };

  return (
    <button onClick={handleTransfer} disabled={!account}>
      Send Transaction
    </button>
  );
}
```

## Best Practices

### Avoiding Repeated Network Requests

To prevent repeated RPC calls when switching chains, consider these approaches:

#### 1. Use a Stable Chain State

```tsx
// ❌ Avoid: Chain state that changes frequently
const [chain, setChain] = useState<ChainType>("sui");

// ✅ Better: Use a more stable state management
const chain = useChainStore((state) => state.chain); // From Zustand/Redux
```

#### 2. Implement Network Caching

```tsx
import { useMemo, useCallback } from "react";

function useNetworkConfig(chain: ChainType) {
  const networkConfig = useMemo(async () => {
    // Cache the SDK instance
    const sdk = await unimoveSDK(chain);
    const { getFullnodeUrl } = sdk.client;

    return {
      mainnet: { url: getFullnodeUrl("mainnet") },
      testnet: { url: getFullnodeUrl("testnet") },
      devnet: { url: getFullnodeUrl("devnet") },
    };
  }, [chain]);

  return networkConfig;
}
```

#### 3. Debounce Chain Switching

```tsx
import { useDeferredValue } from "react";

function MyApp() {
  const [chain, setChain] = useState<ChainType>("sui");
  const deferredChain = useDeferredValue(chain); // Debounce chain changes

  // Use deferredChain for network initialization
  // This prevents rapid switching from causing multiple requests
}
```

#### 4. Disable autoConnect During Chain Switching

```tsx
function ChainAwareWalletProvider({ children }: { children: React.ReactNode }) {
  const [isChainSwitching, setIsChainSwitching] = useState(false);
  const chain = useChain();

  useEffect(() => {
    setIsChainSwitching(true);
    const timer = setTimeout(() => setIsChainSwitching(false), 100);
    return () => clearTimeout(timer);
  }, [chain]);

  return (
    <WalletProvider autoConnect={!isChainSwitching}>{children}</WalletProvider>
  );
}
```

## License

This project is licensed under the Apache License 2.0.

Copyright 2025 Lance He <indigofeather@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### Third-Party Licenses

This project includes dependencies that are also licensed under Apache 2.0:

- `@mysten/dapp-kit` and `@mysten/sui` - Apache 2.0 License
- `@iota/dapp-kit` and `@iota/iota-sdk` - Apache 2.0 License
