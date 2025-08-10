# Unimove SDK

A unified SDK for Sui and IOTA blockchain development, providing consistent APIs and type-safe development experience.

## Installation

```bash
npm install unimove-sdk
# or
bun add unimove-sdk
```

### Peer Dependencies

Install the corresponding dependencies based on the blockchain you want to use:

```bash
# Sui
npm install @mysten/dapp-kit @mysten/sui

# IOTA
npm install @iota/dapp-kit @iota/iota-sdk
```

## Quick Start

### Basic Usage

```typescript
import { unimoveSDK } from "unimove-sdk";

// Load Sui SDK
const suiSDK = await unimoveSDK("sui");
const suiClient = suiSDK.createClient({
  url: suiSDK.getFullnodeUrl("testnet"),
});

// Load IOTA SDK
const iotaSDK = await unimoveSDK("iota");
const iotaClient = iotaSDK.createClient({
  url: iotaSDK.getFullnodeUrl("testnet"),
});
```

### Environment Variable Configuration

```typescript
const PROTOCOL = (process.env.NEXT_PUBLIC_PROTOCOL as "sui" | "iota") ?? "iota";
const sdk = await unimoveSDK(PROTOCOL);
```

### React Hook

```typescript
import { useUnimoveSDK } from 'unimove-sdk';

function MyComponent() {
  const { sdk, isLoading, error } = useUnimoveSDK('sui');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Use sdk...
}
```

## Unified API

All supported blockchains provide the same API interface:

### Client Operations

- `createClient(config)` - Create client
- `getFullnodeUrl(network)` - Get node URL

### Transaction Operations

- `createTransaction()` - Create transaction

### Keypair Operations

- `createEd25519Keypair()` - Create Ed25519 keypair
- `createSecp256k1Keypair()` - Create Secp256k1 keypair
- `createSecp256r1Keypair()` - Create Secp256r1 keypair
- `decodePrivateKey(secretKey)` - Decode private key

### Utility Methods

- `normalizeStructTag()` - Normalize struct tag
- `parseStructTag()` - Parse struct tag
- `bcsSerialize` - BCS serialization

## React Integration

### Providers

#### ClientProvider

Provides blockchain client context to your app:

```typescript
import { ClientProvider } from 'unimove-sdk';

function App() {
  return (
    <ClientProvider chain="sui" network="testnet">
      <YourApp />
    </ClientProvider>
  );
}
```

#### WalletProvider

Manages wallet connections and state:

```typescript
import { ClientProvider, WalletProvider } from 'unimove-sdk';

function App() {
  return (
    <ClientProvider chain="sui" network="testnet">
      <WalletProvider>
        <YourApp />
      </WalletProvider>
    </ClientProvider>
  );
}
```

### Hooks

#### Wallet Hooks

- `useCurrentAccount()` - Get current connected account
- `useCurrentWallet()` - Get current connected wallet
- `useAccounts()` - Get all available accounts
- `useWallets()` - Get all available wallets
- `useConnectWallet()` - Connect to a wallet
- `useDisconnectWallet()` - Disconnect from wallet
- `useAutoConnectWallet()` - Auto-connect to previously used wallet
- `useSwitchAccount()` - Switch between accounts
- `useSignTransaction()` - Sign transactions
- `useSignPersonalMessage()` - Sign personal messages
- `useSignAndExecuteTransaction()` - Sign and execute transactions

#### Client Hooks

- `useClient()` - Get blockchain client instance
- `useClientQuery()` - Query blockchain data with caching
- `useClientInfiniteQuery()` - Infinite queries for paginated data
- `useClientMutation()` - Mutate blockchain state
- `useClientQueries()` - Multiple parallel queries

#### SDK Hook

- `useUnimoveSDK()` - Load and use the unified SDK

### Components

#### ConnectButton

Pre-built wallet connection button:

```typescript
import { ConnectButton } from 'unimove-sdk';

function WalletSection() {
  return <ConnectButton />;
}
```

#### ConnectModal

Customizable wallet connection modal:

```typescript
import { ConnectModal } from 'unimove-sdk';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <ConnectModal
      open={open}
      onOpenChange={setOpen}
    />
  );
}
```

#### ClientQuery

Declarative data fetching component:

```typescript
import { ClientQuery } from 'unimove-sdk';

function Balance({ address }: { address: string }) {
  return (
    <ClientQuery
      method="getBalance"
      params={[address]}
      render={({ data, isLoading, error }) => {
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return <div>Balance: {data?.totalBalance}</div>;
      }}
    />
  );
}
```

### Complete Example

```typescript
import {
  ClientProvider,
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction
} from 'unimove-sdk';

function WalletSection() {
  const { data: account } = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  return (
    <div>
      <ConnectButton />
      {account && (
        <div>
          <p>Connected: {account.address}</p>
          <button onClick={() => signAndExecute({ transaction })}>
            Send Transaction
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ClientProvider chain="sui" network="testnet">
      <WalletProvider>
        <WalletSection />
      </WalletProvider>
    </ClientProvider>
  );
}
```

## Supported Blockchains

- **Sui** - Using `@mysten/sui` SDK
- **IOTA** - Using `@iota/iota-sdk` SDK

## Features

- 🔄 **Unified API** - Same interface for multiple blockchains
- 📦 **Dynamic Loading** - Load SDKs on demand to reduce bundle size
- 🎯 **Type Safe** - Full TypeScript support
- ⚡ **Caching** - Avoid duplicate SDK loading
- 🔌 **React Integration** - Provides hooks and components

## License

Apache-2.0
