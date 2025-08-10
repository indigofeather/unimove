# Unimove dApp Kit

A unified React dApp kit for Sui and IOTA blockchain development. Build cross-chain dApps with consistent APIs, built-in wallet connection components, and seamless chain switching.

## Installation

```bash
npm install unimove-dapp-kit
# or
bun add unimove-dapp-kit
```

### Peer Dependencies

Install the required dependencies for the chains you want to support:

```bash
# For Sui support
npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query

# For IOTA support
npm install @iota/dapp-kit @iota/iota-sdk @tanstack/react-query

# For Next.js projects
npm install next react react-dom
```

## Quick Start

### 1. Setup Providers

Wrap your app with the chain-specific providers:

```typescript
import { ClientProvider, WalletProvider } from 'unimove-dapp-kit';
import { getFullnodeUrl as SuiGetFullnodeUrl } from '@mysten/sui/client';
import { getFullnodeUrl as IotaGetFullnodeUrl } from '@iota/iota-sdk/client';

// For Sui
function App() {
  return (
    <ClientProvider
      chain="sui"
      networks={{
        testnet: { url: SuiGetFullnodeUrl('testnet') },
        mainnet: { url: SuiGetFullnodeUrl('mainnet') },
      }}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <YourApp />
      </WalletProvider>
    </ClientProvider>
  );
}

// For IOTA
function App() {
  return (
    <ClientProvider
      chain="iota"
      networks={{
        testnet: { url: IotaGetFullnodeUrl('testnet') },
        mainnet: { url: IotaGetFullnodeUrl('mainnet') },
      }}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <YourApp />
      </WalletProvider>
    </ClientProvider>
  );
}
```

### 2. Use Built-in Components

```typescript
import { ConnectButton } from 'unimove-dapp-kit';

function WalletSection() {
  return <ConnectButton />;
}
```

### 3. Access Wallet and Account Data

```typescript
import { useCurrentAccount, useCurrentWallet } from 'unimove-dapp-kit';

function AccountInfo() {
  const { data: account } = useCurrentAccount();
  const { data: wallet } = useCurrentWallet();

  if (!account) return <div>Please connect your wallet</div>;

  return (
    <div>
      <p>Wallet: {wallet?.name}</p>
      <p>Address: {account.address}</p>
    </div>
  );
}
```

## API Reference

### Providers

#### ClientProvider

Provides blockchain client context to your app. Must be the outermost provider.

```typescript
<ClientProvider
  chain="sui" | "iota"
  networks={Networks}
  defaultNetwork={string}
  onNetworkChange?={(network: string) => void}
>
```

#### WalletProvider

Manages wallet connections and state. Must be wrapped inside ClientProvider.

```typescript
<WalletProvider>
  {children}
</WalletProvider>
```

### Hooks

#### Wallet Hooks

```typescript
// Get current connected account
const { data: account } = useCurrentAccount();

// Get current connected wallet
const { data: wallet } = useCurrentWallet();

// Get all available accounts
const { data: accounts } = useAccounts();

// Get all available wallets
const { data: wallets } = useWallets();

// Connect to a wallet
const { mutate: connect } = useConnectWallet();

// Disconnect from wallet
const { mutate: disconnect } = useDisconnectWallet();

// Auto-connect to previously used wallet
const { mutate: autoConnect } = useAutoConnectWallet();

// Switch between accounts
const { mutate: switchAccount } = useSwitchAccount();

// Sign transactions
const { mutateAsync: signTransaction } = useSignTransaction();

// Sign personal messages
const { mutateAsync: signMessage } = useSignPersonalMessage();

// Sign and execute transactions
const { mutate: signAndExecute } = useSignAndExecuteTransaction();
```

#### Client Hooks

```typescript
// Get blockchain client instance
const client = useClient();

// Query blockchain data with caching
const { data, isLoading, error } = useClientQuery({
  method: "getBalance",
  params: [address],
});

// Infinite queries for paginated data
const { data, fetchNextPage } = useClientInfiniteQuery({
  method: "getCoins",
  params: [address],
});

// Mutate blockchain state
const { mutate } = useClientMutation();

// Multiple parallel queries
const results = useClientQueries([
  { method: "getBalance", params: [address1] },
  { method: "getBalance", params: [address2] },
]);
```

### Components

#### ConnectButton

Pre-built wallet connection button with built-in styling:

```typescript
<ConnectButton />
```

#### ConnectModal

Customizable wallet connection modal:

```typescript
const [open, setOpen] = useState(false);

<ConnectModal
  open={open}
  onOpenChange={setOpen}
/>
```

#### ClientQuery

Declarative data fetching component:

```typescript
<ClientQuery
  method="getBalance"
  params={[address]}
  render={({ data, isLoading, error }) => (
    isLoading ? <div>Loading...</div> :
    error ? <div>Error: {error.message}</div> :
    <div>Balance: {data?.totalBalance}</div>
  )}
/>
```

## Complete Example

```typescript
import {
  ClientProvider,
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useClient
} from 'unimove-dapp-kit';
import { getFullnodeUrl as SuiGetFullnodeUrl } from '@mysten/sui/client';

function TransactionExample() {
  const { data: account } = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const client = useClient();

  const handleTransaction = async () => {
    if (!account) return;

    // Create your transaction here
    const transaction = /* your transaction */;

    signAndExecute({
      transaction,
      options: { showEffects: true }
    });
  };

  return (
    <div>
      <ConnectButton />
      {account && (
        <div>
          <p>Connected: {account.address}</p>
          <button onClick={handleTransaction}>
            Send Transaction
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ClientProvider
      chain="sui"
      networks={{
        testnet: { url: SuiGetFullnodeUrl('testnet') },
        mainnet: { url: SuiGetFullnodeUrl('mainnet') },
      }}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <TransactionExample />
      </WalletProvider>
    </ClientProvider>
  );
}
```

## Chain Switching

You can build apps that support multiple chains by conditionally rendering different ClientProviders:

```typescript
import { useState } from 'react';
import { ClientProvider, WalletProvider } from 'unimove-dapp-kit';
import { getFullnodeUrl as SuiGetFullnodeUrl } from '@mysten/sui/client';
import { getFullnodeUrl as IotaGetFullnodeUrl } from '@iota/iota-sdk/client';

const allNetworks: { sui: Networks; iota: Networks } = {
  sui: {
    testnet: { url: SuiGetFullnodeUrl('testnet') },
    mainnet: { url: SuiGetFullnodeUrl('mainnet') },
  },
  iota: {
    testnet: { url: IotaGetFullnodeUrl('testnet') },
    mainnet: { url: IotaGetFullnodeUrl('mainnet') },
  },
};

function MultiChainApp() {
  const [chain, setChain] = useState<'sui' | 'iota'>('sui');
  const networks = useMemo(() => allNetworks[chain], [chain]);

  return (
    <div>
      <select value={chain} onChange={(e) => setChain(e.target.value as any)}>
        <option value="sui">Sui</option>
        <option value="iota">IOTA</option>
      </select>

      <ClientProvider
        chain={chain}
        networks={networks[chain]}
        defaultNetwork="testnet"
      >
        <WalletProvider>
          <YourApp />
        </WalletProvider>
      </ClientProvider>
    </div>
  );
}
```

## TypeScript Support

The kit provides full TypeScript support with chain-specific types:

```typescript
import type {
  UnimoveCurrentAccountResult,
  UnimoveClientQueryResult,
  ChainType,
  Networks,
} from "unimove-dapp-kit";

// Chain-specific account type
const account: UnimoveCurrentAccountResult<"sui"> = useCurrentAccount();

// Generic types
const networks: Networks = {
  testnet: { url: "https://..." },
};
```

## Supported Chains

- **Sui** - Full support via `@mysten/dapp-kit`
- **IOTA** - Full support via `@iota/dapp-kit`

## Features

- 🔄 **Unified API** - Same hooks and components for all chains
- 🎯 **Type Safe** - Full TypeScript support with chain-specific types
- 🎨 **Built-in UI** - Pre-styled wallet connection components
- ⚡ **Dynamic Loading** - Chain-specific code loaded on demand
- 🔌 **React Integration** - Built for React and Next.js
- 🔄 **Chain Switching** - Easy runtime chain switching

## Requirements

- React 18.2.0+
- Next.js 14.0.0+ (for SSR support)
- @tanstack/react-query 5.0.0+

## License

Apache-2.0
