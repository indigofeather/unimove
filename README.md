# Unimove dApp Kit

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/indigofeather/unimove-dapp-kit)

Unimove dApp Kit is a TypeScript React toolkit for building cross-chain applications on [Sui](https://sui.io) and [IOTA](https://www.iota.org). It exposes a unified set of providers, hooks, and UI components so apps can switch networks at runtime while retaining strong typings.

## Features

- 🔗 One API for Sui and IOTA
- ♻️ Runtime chain switching
- ✅ Fully typed hooks (`useClientQuery`, `useClientMutation`, `useClientInfiniteQuery`, `useClientQueries`)
- 🎛️ Built-in wallet UI such as `ConnectButton`
- ⚙️ Tree-shakeable ESM and CJS builds

## Installation

```bash
npm install unimove-dapp-kit
# or
bun add unimove-dapp-kit
```

### Peer dependencies

Install the peer dependencies for the chains you plan to support:

```bash
# Sui
npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query

# IOTA
npm install @iota/dapp-kit @iota/iota-sdk @tanstack/react-query

# Optional: Next.js projects
npm install next react react-dom
```

## Quick start

### Wrap your app

```tsx
import { ClientProvider, WalletProvider } from "unimove-dapp-kit";
import { getFullnodeUrl as suiUrl } from "@mysten/sui/client";

export function App() {
  return (
    <ClientProvider
      chain="sui"
      networks={{ testnet: { url: suiUrl("testnet") } }}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <YourRoutes />
      </WalletProvider>
    </ClientProvider>
  );
}
```

### Connect a wallet

```tsx
import { ConnectButton } from "unimove-dapp-kit";

export function WalletSection() {
  return <ConnectButton />;
}
```

### Query chain data

```tsx
import { useClientQuery } from "unimove-dapp-kit";

const { data } = useClientQuery("getBalance", { owner: address });
console.log(data?.totalBalance);
```

All client hooks infer argument and result types from the active chain.

## Chain switching

Applications can offer multiple networks by swapping the provider:

```tsx
import { useState } from "react";
import { ClientProvider, WalletProvider } from "unimove-dapp-kit";
import { getFullnodeUrl as suiUrl } from "@mysten/sui/client";
import { getFullnodeUrl as iotaUrl } from "@iota/iota-sdk/client";

const networks = {
  sui: { testnet: { url: suiUrl("testnet") } },
  iota: { testnet: { url: iotaUrl("testnet") } },
};

function MultiChainApp() {
  const [chain, setChain] = useState<"sui" | "iota">("sui");
  return (
    <ClientProvider
      chain={chain}
      networks={networks[chain]}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <YourRoutes />
      </WalletProvider>
    </ClientProvider>
  );
}
```

## API Reference

### Providers

#### ClientProvider

Configure blockchain client and network settings:

```tsx
import { ClientProvider } from "unimove-dapp-kit";

<ClientProvider
  chain="sui" // or "iota"
  networks={{ testnet: { url: "https://..." } }}
  defaultNetwork="testnet"
  onNetworkChange={(network) => console.log(network)}
>
  {children}
</ClientProvider>;
```

#### WalletProvider

Provides wallet connection functionality:

```tsx
import { WalletProvider } from "unimove-dapp-kit";

<WalletProvider>{children}</WalletProvider>;
```

### Components

#### ConnectButton

Unified wallet connection button:

```tsx
import { ConnectButton } from "unimove-dapp-kit";

<ConnectButton />;
```

#### ConnectModal

Wallet connection modal:

```tsx
import { ConnectModal } from "unimove-dapp-kit";

<ConnectModal open={isOpen} onOpenChange={setIsOpen} />;
```

#### ClientQuery

Declarative query component:

```tsx
import { ClientQuery } from "unimove-dapp-kit";

<ClientQuery method="getBalance" params={{ owner: address }}>
  {({ data, isPending, error }) => (
    <div>{isPending ? "Loading..." : data?.totalBalance}</div>
  )}
</ClientQuery>;
```

### Hooks

#### Wallet Hooks

- `useAccounts()` - Get all accounts
- `useAutoConnectWallet()` - Auto-connect wallet
- `useConnectWallet()` - Connect wallet
- `useCurrentAccount()` - Get current account
- `useCurrentWallet()` - Get current wallet
- `useDisconnectWallet()` - Disconnect wallet
- `useSignAndExecuteTransaction()` - Sign and execute transaction
- `useSignPersonalMessage()` - Sign personal message
- `useSignTransaction()` - Sign transaction
- `useSwitchAccount()` - Switch account
- `useWallets()` - Get all available wallets

#### Client Query Hooks

- `useClient()` - Get blockchain client
- `useClientQuery()` - Single query
- `useClientInfiniteQuery()` - Infinite query (pagination)
- `useClientMutation()` - Mutation operations
- `useClientQueries()` - Multiple queries

#### Context Hook

- `useChain()` - Get current chain type

### Types

#### Basic Types

```ts
import type { ChainType, NetworkName, Networks } from "unimove-dapp-kit";

type ChainType = "sui" | "iota";
type NetworkName = "mainnet" | "testnet" | "devnet" | "localnet";
type Networks = Record<string, { url: string }>;
```

#### Unimove Unified Types

```ts
import type {
  UnimoveClientConfig,
  UnimoveGetCoinsParams,
  UnimoveGetObjectParams,
  UnimoveNetwork,
  UnimoveKeypairConfig,
  UnimoveTransactionConfig,
  UnimoveStructTag,
  UnimoveBcsOptions,
} from "unimove-dapp-kit";
```

#### Hook Result Types

```ts
import type {
  UnimoveClientHookResult,
  UnimoveCurrentAccountResult,
  UnimoveSignAndExecuteTransactionResult,
  UnimoveConnectWalletResult,
  UnimoveWalletsResult,
  UnimoveClientQueryResult,
  // ... more types
} from "unimove-dapp-kit";
```

#### Theme Types

```ts
import type {
  SuiTheme,
  IotaTheme,
  UniversalTheme,
  UniversalThemeVars,
} from "unimove-dapp-kit";
```

### Usage Examples

#### Basic Wallet Operations

```tsx
import {
  useCurrentAccount,
  useConnectWallet,
  useDisconnectWallet,
} from "unimove-dapp-kit";

function WalletInfo() {
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  return (
    <div>
      {account ? (
        <div>
          <p>Address: {account.address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => connect({ walletName: "Sui Wallet" })}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
```

#### Query Blockchain Data

```tsx
import { useClientQuery } from "unimove-dapp-kit";

function Balance({ address }: { address: string }) {
  const { data, isPending, error } = useClientQuery("getBalance", {
    owner: address,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Balance: {data?.totalBalance}</div>;
}
```

#### Execute Transaction

```tsx
import { useSignAndExecuteTransaction } from "unimove-dapp-kit";

function SendTransaction() {
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleSend = () => {
    signAndExecute({
      transaction: txb, // your transaction block
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });
  };

  return <button onClick={handleSend}>Send Transaction</button>;
}
```

## Scripts

- `bun run build` – compile the package
- `bun run check` – run linting and type checks

## License

Apache-2.0
