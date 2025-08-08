# unimove-sdk

A comprehensive SDK for building cross-chain decentralized applications on Sui and IOTA. `unimove-sdk` combines the power of dApp-kit UI components with robust SDK functionality, enabling you to build applications that seamlessly switch between chains at runtime with a unified API.

## ✨ Features

### 🔗 **Cross-Chain SDK with Unified API**

- Complete SDK functionality for both Sui and IOTA with **9 unified methods** that work identically across chains
- **11 modules** with full type support (client, bcs, transactions, verify, cryptography, multisig, utils, faucet, keypairs)
- Seamless runtime chain switching with a single `chain` prop change
- Dynamic imports ensure you only bundle the SDKs you actually use

### 🔧 **Industry-Leading TypeScript Support**

- **Complete type safety** with zero `any` types throughout the entire SDK
- **21 exported types** providing comprehensive type definitions for all use cases
- **Precise type inference** based on chain selection - TypeScript knows exactly what types you're working with
- **Conditional types** that provide chain-specific IntelliSense and compile-time safety

### 🪝 **Enhanced Hooks System (17 Total)**

- All hooks support **both automatic and manual chain selection** with exact type inference
- **Wallet Management**: `useCurrentAccount`, `useCurrentWallet`, `useAccounts`, `useConnectWallet`, `useDisconnectWallet`, `useAutoConnectWallet`, `useSwitchAccount`, `useWallets`
- **Transactions & Queries**: `useSignAndExecuteTransaction`, `useClientQuery`, `useClientInfiniteQuery`, `useClientMutation`, `useClientQueries`, `useSignPersonalMessage`, `useSignTransaction`
- **Network & Client**: `useClient`, `useUnimoveSDK`

### 🎨 **Built-in UI Components**

- Ready-to-use components like `ConnectButton`, `ConnectModal`, and `ClientQuery`
- Components automatically adapt to the selected chain
- Universal theming system with cross-chain theme support
- SSR-compatible with Next.js optimization

### 📦 **Developer Experience**

- **Lightweight & Modular**: Only bundle what you use
- **Performance Optimized**: SDK caching and efficient loading
- **Backward Compatible**: Seamless upgrade path
- **Comprehensive Examples**: Real-world usage patterns and best practices

## 🚀 Quick Examples

### Basic SDK Usage with Type Safety

```typescript
import { unimoveSDK } from "unimove-sdk/server";

// ✅ Precise type inference based on chain
const iotaSDK = await unimoveSDK("iota"); // Type: UnimoveSDK<'iota'>
const suiSDK = await unimoveSDK("sui"); // Type: UnimoveSDK<'sui'>

// ✅ Unified API - same methods for both chains
const iotaClient = iotaSDK.createClient({
  url: iotaSDK.getFullnodeUrl("testnet"),
});
const suiClient = suiSDK.createClient({
  url: suiSDK.getFullnodeUrl("testnet"),
});

// ✅ 9 unified methods available
const transaction = iotaSDK.createTransaction();
const keypair = iotaSDK.createEd25519Keypair();
const structTag = iotaSDK.parseStructTag("0x2::coin::Coin<0x2::iota::IOTA>");
```

### Hooks with Type Safety

```tsx
import {
  useCurrentAccount,
  useClientQuery,
  useSignAndExecuteTransaction,
} from "unimove-sdk";

function MyComponent() {
  // ✅ Automatic chain selection with precise types
  const account = useCurrentAccount(); // Type inferred from context

  // ✅ Manual chain selection with exact types
  const iotaAccount = useCurrentAccount<"iota">("iota"); // Type: IotaAccount
  const suiAccount = useCurrentAccount<"sui">("sui"); // Type: SuiAccount

  // ✅ Type-safe queries
  const { data: balance } = useClientQuery(
    "getBalance",
    { owner: account?.address },
    { enabled: !!account?.address }
  );

  return <div>Balance: {balance?.totalBalance}</div>;
}
```

## Installation

First, install the core SDK:

```bash
bun add unimove-sdk
# or
npm install unimove-sdk
# or
yarn add unimove-sdk
```

## 📚 Examples

Comprehensive examples are available in the [`/examples`](./examples/) directory:

- **[Basic Setup](./examples/basic-setup/)** - SDK initialization and unified API usage
- **[Hooks Usage](./examples/hooks-usage/)** - All 17 hooks with type safety demonstrations
- **[Multi-Chain App](./examples/multi-chain/)** - Complete multi-chain application with runtime switching
- **[Portfolio Tracker](./examples/portfolio-tracker/)** - Real-world multi-chain portfolio example
- **[Type Safety](./examples/type-safety/)** - Advanced TypeScript integration patterns

## TypeScript Support

The SDK provides **industry-leading TypeScript support** with 21 exported types and zero `any` usage:

```tsx
import type {
  // SDK Core Types
  UnimoveSDK,
  UnimoveClient,
  UnimoveTransaction,

  // Configuration Types
  Networks,
  ChainType,
  NetworkName,
  UnimoveClientConfig,

  // Hook Types (with precise inference)
  UnimoveCurrentAccountResult,
  UnimoveClientQueryResult,

  // Utility Types
  UnimoveStructTag,
  UnimoveKeypairConfig,
} from "unimove-sdk";

// ✅ Precise type inference
const sdk: UnimoveSDK<"iota"> = await unimoveSDK("iota");
const client: UnimoveClient<"iota"> = sdk.createClient({
  url: "https://api.testnet.iota.cafe",
});

// ✅ Type-safe configuration
const networks: Networks = {
  mainnet: { url: "https://fullnode.mainnet.sui.io:443" },
  testnet: { url: "https://fullnode.testnet.sui.io:443" },
  devnet: { url: "https://fullnode.devnet.sui.io:443" },
};
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

### Unified SDK API (9 Methods)

The SDK provides **9 unified methods** that work identically across both chains:

```tsx
import { unimoveSDK } from "unimove-sdk/server";

// ✅ Initialize with precise types
const sdk = await unimoveSDK("iota"); // Type: UnimoveSDK<'iota'>

// ✅ Unified Client Operations
const client = sdk.createClient({ url: sdk.getFullnodeUrl("testnet") });

// ✅ Unified Transaction Operations
const transaction = sdk.createTransaction();

// ✅ Unified Keypair Operations
const ed25519Keypair = sdk.createEd25519Keypair();
const secp256k1Keypair = sdk.createSecp256k1Keypair();
const secp256r1Keypair = sdk.createSecp256r1Keypair();

// ✅ Unified Utility Operations
const structTag = sdk.parseStructTag("0x2::coin::Coin<0x2::iota::IOTA>");
const normalizedTag = sdk.normalizeStructTag(structTag);

// ✅ Unified BCS Operations
const serialized = sdk.bcsSerialize.serialize("address", "0x123...");

// ✅ Direct module access (all 11 modules with proper types)
const { client: clientModule, bcs, transactions, utils, cryptography } = sdk;
```

### Complete Type Coverage

Every SDK module has precise type definitions:

```tsx
// ✅ All modules properly typed
const modules = {
  client: sdk.client, // typeof IotaClient
  bcs: sdk.bcs, // typeof IotaBcs
  transactions: sdk.transactions, // typeof IotaTransactions
  verify: sdk.verify, // typeof IotaVerify
  cryptography: sdk.cryptography, // typeof IotaCryptography
  multisig: sdk.multisig, // typeof IotaMultisig
  utils: sdk.utils, // typeof IotaUtils
  faucet: sdk.faucet, // typeof IotaFaucet
  ed25519Keypair: sdk.ed25519Keypair, // typeof IotaEd25519Keypair
  secp256k1Keypair: sdk.secp256k1Keypair, // typeof IotaSecp256k1Keypair
  secp256r1Keypair: sdk.secp256r1Keypair, // typeof IotaSecp256r1Keypair
};
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

### Hooks (17 Total)

All hooks support **both automatic and manual chain selection** with **precise type inference**:

#### Chain & Wallet Management

- `useChain()`: Returns the currently active chain (`"sui"` or `"iota"`)
- `useCurrentAccount<T>()`: Returns the currently selected account with exact type
- `useCurrentWallet<T>()`: Returns the currently connected wallet with exact type
- `useAccounts<T>()`: Returns accounts list with precise typing
- `useConnectWallet<T>()`: Connect to wallet with type-safe operations
- `useDisconnectWallet<T>()`: Disconnect with proper error handling
- `useAutoConnectWallet<T>()`: Auto-connect with chain-specific types
- `useSwitchAccount<T>()`: Switch accounts with type safety
- `useWallets<T>()`: Get available wallets with precise types

#### Transactions & Queries

- `useSignAndExecuteTransaction<T>()`: Sign and execute with exact transaction types
- `useClientQuery<T>()`: Unified queries with chain-specific return types
- `useClientInfiniteQuery<T>()`: Infinite queries with precise pagination types
- `useClientMutation<T>()`: Mutations with type-safe operations
- `useClientQueries<T>()`: Parallel queries with exact result types
- `useSignPersonalMessage<T>()`: Message signing with chain-specific types
- `useSignTransaction<T>()`: Transaction signing with precise types

#### Network & Client

- `useClient<T>()`: Access client with exact chain types (IotaClient | SuiClient)
- `useUnimoveSDK<T>()`: SDK access with complete type safety

#### Usage Examples

```tsx
// ✅ Automatic chain selection (from context)
const account = useCurrentAccount(); // Type inferred from ChainContext

// ✅ Manual chain selection (precise types)
const iotaAccount = useCurrentAccount<"iota">("iota"); // Type: IotaAccount
const suiAccount = useCurrentAccount<"sui">("sui"); // Type: SuiAccount

// ✅ Type-safe operations
const { mutate: signTx } = useSignAndExecuteTransaction<"iota">("iota");
signTx({ transaction: iotaTransaction }); // Fully typed
```

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

## 🔧 Advanced Usage

### Custom Hook Creation

Create your own hooks with full type safety:

```tsx
import { useClientQuery, type UnimoveClientQueryResult } from "unimove-sdk";

function useTokenBalance<T extends "sui" | "iota">(
  owner: string,
  coinType: string,
  chain?: T
): UnimoveClientQueryResult<T> {
  return useClientQuery(
    "getBalance",
    { owner, coinType },
    { enabled: !!owner },
    chain
  );
}
```

### Multi-Chain State Management

```tsx
import { create } from "zustand";
import type { ChainType, UnimoveSDK } from "unimove-sdk";

interface MultiChainStore {
  currentChain: ChainType;
  sdks: Record<ChainType, UnimoveSDK<ChainType> | null>;
  switchChain: (chain: ChainType) => void;
  initializeSDK: (chain: ChainType) => Promise<void>;
}

const useMultiChainStore = create<MultiChainStore>((set, get) => ({
  currentChain: "sui",
  sdks: { sui: null, iota: null },

  switchChain: (chain) => set({ currentChain: chain }),

  initializeSDK: async (chain) => {
    const sdk = await unimoveSDK(chain);
    set((state) => ({
      sdks: { ...state.sdks, [chain]: sdk },
    }));
  },
}));
```

## 📈 Performance Optimizations

### SDK Caching

The SDK automatically caches instances to prevent redundant loading:

```tsx
// ✅ These calls reuse the same SDK instance
const sdk1 = await unimoveSDK("iota");
const sdk2 = await unimoveSDK("iota"); // Returns cached instance
```

### Selective Module Loading

Only import what you need for optimal bundle size:

```tsx
// ✅ Import only specific hooks
import { useCurrentAccount, useClientQuery } from "unimove-sdk";

// ✅ Import only specific types
import type { UnimoveClient, UnimoveTransaction } from "unimove-sdk";
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/your-org/unimove-sdk.git
cd unimove-sdk
npm install
npm run build
npm run test
```
