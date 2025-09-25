# Unimove dApp Kit

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/indigofeather/unimove-dapp-kit)

**Unimove dApp Kit** is a React toolkit that unifies the app experience for both [Sui](https://sui.io) and [IOTA](https://www.iota.org). It provides a single surface of providers, hooks, and UI components that keep full type safety while letting you switch chains at runtime.

## Highlights

- 🔗 **Unified API** – the same hook/component works for Sui and IOTA
- 🧠 **Strong typing** – hook arguments/returns are inferred from the active chain
- 🔁 **Runtime chain switching** – flip between chains without re-wiring your app
- 🧰 **First-party wallet UI** – drop-in `ConnectButton`, `ConnectModal`, etc.
- 📦 **Tree-shakeable** – ships both ESM and CJS bundles

---

## Installation

```bash
npm install unimove-dapp-kit
# or
yarn add unimove-dapp-kit
# or
pnpm add unimove-dapp-kit
```

### Peer dependencies

Install the SDKs for the chains you plan to support (plus React / React Query):

```bash
# Sui support
npm install @mysten/dapp-kit @mysten/sui @tanstack/react-query

# IOTA support
npm install @iota/dapp-kit @iota/iota-sdk @tanstack/react-query

# React runtime (if not already present)
npm install react react-dom

# Optional (Next.js projects)
npm install next
```

---

## Concepts

Unimove exposes two core providers and a suite of hooks/components. Internally a shared chain registry resolves the correct implementation based on the active chain, so you interact with a single API surface.

### Chain context

`ClientProvider` sets the active chain (`"sui" | "iota"`) and exposes it through the `useChain()` hook. All other hooks/components automatically read from this context unless you explicitly pass a `chain` argument.

### Networks

Provide a `networks` map describing the RPC endpoints you care about. The structure matches the underlying dApp kits:

```ts
const networks = {
  testnet: { url: "https://fullnode.testnet.sui.io" },
};
```

The same structure can include additional metadata (`variables`) if required by your app.

---

## Quick start

### 1. Wrap your application

```tsx
import { ClientProvider, WalletProvider } from "unimove-dapp-kit";
import { getFullnodeUrl as suiUrl } from "@mysten/sui/client";

const suiNetworks = {
  testnet: { url: suiUrl("testnet") },
};

export function App() {
  return (
    <ClientProvider
      chain="sui"
      networks={suiNetworks}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <YourRoutes />
      </WalletProvider>
    </ClientProvider>
  );
}
```

### 2. Drop in wallet UI

```tsx
import { ConnectButton } from "unimove-dapp-kit";

export function WalletSection() {
  return <ConnectButton />;
}
```

### 3. Query on-chain data

```tsx
import { useClientQuery } from "unimove-dapp-kit";

export function Balance({ owner }: { owner: string }) {
  const { data, isPending, error } = useClientQuery("getBalance", { owner });

  if (isPending) return <div>Loading…</div>;
  if (error) return <div>Error: {String(error.message ?? error)}</div>;

  return <div>Balance: {data?.totalBalance}</div>;
}
```

### 4. Switching chains at runtime

```tsx
import { useState } from "react";
import { ClientProvider, WalletProvider } from "unimove-dapp-kit";
import { getFullnodeUrl as suiUrl } from "@mysten/sui/client";
import { getNetwork, Network as IotaNetwork } from "@iota/iota-sdk/client";

const chainNetworks = {
  sui: {
    testnet: { url: suiUrl("testnet") },
  },
  iota: {
    testnet: { url: getNetwork(IotaNetwork.Testnet)?.url ?? "" },
  },
};

export function MultiChainApp() {
  const [chain, setChain] = useState<"sui" | "iota">("sui");

  return (
    <ClientProvider
      chain={chain}
      networks={chainNetworks[chain]}
      defaultNetwork="testnet"
    >
      <WalletProvider>
        <button onClick={() => setChain((c) => (c === "sui" ? "iota" : "sui"))}>
          Switch chain
        </button>
        <ConnectButton />
      </WalletProvider>
    </ClientProvider>
  );
}
```

---

## API reference

### Providers

| Provider | Description |
| --- | --- |
| `ClientProvider` | Configures the active chain and RPC networks. Accepts all props from the underlying chain provider. |
| `WalletProvider` | Enables wallet discovery, connection, and theming. Props are unioned from Sui/IOTA implementations (unsupported props are ignored per chain). |

### Components

| Component | Description |
| --- | --- |
| `ConnectButton` | Unified wallet connection button. Automatically renders the correct chain-specific UI. |
| `ConnectModal` | Full-screen wallet chooser/dialog. |
| `ClientQuery` | Render-prop component that executes a client query and passes loading/data/error state to children. |

### Hooks

**Wallet hooks**

- `useAccounts()`
- `useAutoConnectWallet()`
- `useConnectWallet()`
- `useCurrentAccount()`
- `useCurrentWallet()`
- `useDisconnectWallet()`
- `useSignAndExecuteTransaction()`
- `useSignPersonalMessage()`
- `useSignTransaction()`
- `useSwitchAccount()`
- `useWallets()`

**Client hooks**

- `useClient()` – access the raw RPC client instance
- `useClientQuery()` – single RPC query (with typing)
- `useClientInfiniteQuery()` – infinite/paginated queries
- `useClientMutation()` – RPC mutations (writes)
- `useClientQueries()` – execute multiple queries at once

Each hook accepts an optional `chain` argument if you need to call a different chain than the current context.

**Context hook**

- `useChain()` – returns the active chain identifier

### Types & Themes

The package re-exports all shared types and theme helpers so you can type your own wrappers or apply consistent styling:

```ts
import type {
  ChainType,
  NetworkName,
  Networks,
  UnimoveClientConfig,
  UnimoveSignedTransaction,
  // …other unified types
} from "unimove-dapp-kit";

import { lightTheme, darkTheme } from "unimove-dapp-kit";
```

Refer to `src/types` and `src/themes` for the full catalog.

---

## Usage snippets

### Wallet workflow

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
    <section>
      {account ? (
        <>
          <p>Address: {account.address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <button onClick={() => connect({ wallet: account?.wallet })}>
          Connect Wallet
        </button>
      )}
    </section>
  );
}
```

### Execute a transaction

```tsx
import { useSignAndExecuteTransaction } from "unimove-dapp-kit";

function SubmitTransaction({ transaction }: { transaction: unknown }) {
  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

  return (
    <button
      disabled={isPending}
      onClick={() => signAndExecute({ transaction })}
    >
      {isPending ? "Submitting…" : "Submit"}
    </button>
  );
}
```

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Build the package (`tsup`) |
| `npm run check` | Run ESLint and TypeScript checks |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | ESLint only |

---

## License

[Apache-2.0](./LICENSE)
