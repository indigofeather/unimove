# Unimove SDK

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/indigofeather/unimove-sdk)

**Unimove SDK** wraps the official Sui (`@mysten/sui`) and IOTA (`@iota/iota-sdk`) packages behind a single registry so you can swap chains without changing imports. It mirrors the same registry pattern used in `unimove-dapp-kit`, but targets low-level SDK modules instead of React hooks.

## Highlights

- 🔗 **Unified surface** – access every SDK namespace (`client`, `transactions`, `utils`, etc.) with a single call.
- 🧩 **Unified Types** – unified types for `MoveStruct`, `Transaction`, `ObjectData`, and more, supporting both Sui and IOTA with a single type name.
- 🧠 **Type-aware helpers** – the returned module is typed to the selected chain.
- 🔁 **Runtime switching** – instantiate `createSdk("sui" | "iota")` whenever you need a different chain.
- 🧰 **Keypair helpers** – grab chain-specific keypair constructors with `keypairEd25519()` and friends.
- 📦 **Tree-shakeable** – modules stay tree-shake friendly; you only import what you read.

---

## Installation

```bash
npm install unimove-sdk
# or
yarn add unimove-sdk
# or
pnpm add unimove-sdk
```

Install the peer SDKs for the chains you plan to support:

```bash
npm install @mysten/sui @iota/iota-sdk
```

---

## Quick start

```ts
import { createSdk } from "unimove-sdk";

const sui = createSdk("sui");

const client = new sui.client.Client({
  url: sui.client.getFullnodeUrl("testnet"),
});
const tx = new sui.transactions.Transaction();
const kp = sui.keypairs.ed25519.Ed25519Keypair.generate();

const iota = createSdk("iota");
const iotaClient = new iota.client.Client({
  url: iota.client.getFullnodeUrl("testnet"),
});
const iotaKeypair = iota.keypairs.ed25519.Ed25519Keypair.generate();
```

`createSdk(chain)` returns a normalized surface so you never have to think about `Sui*` vs `Iota*` export names. If you still prefer module-level accessors, they remain available (see “Module accessors”).

### Examples

```ts
import { createSdk } from "unimove-sdk";

const sdk = createSdk("sui");

// Fully typed client + transaction flow
const client = new sdk.client.Client({
  url: sdk.client.getFullnodeUrl("testnet"),
});
const tx = new sdk.transactions.Transaction();
const signer = sdk.keypairs.ed25519.Ed25519Keypair.generate();
tx.moveCall({
  target: "0x2::coin::transfer",
  arguments: [tx.object("0x..."), tx.pure.u64(1n), tx.pure.address("0x...")],
});
await client.signAndExecuteTransaction({ transaction: tx, signer });

// Keypair helpers maintain their native methods
const kp = sdk.keypairs.ed25519.Ed25519Keypair.fromSecretKey("...");
```

```ts
// Switching chains only changes the factory input
const iota = createSdk("iota");

const faucetResponse = await iota.faucet.requestIotaFromFaucetV1({
  host: iota.faucet.getFaucetHost("testnet"),
  recipient: "0x...",
});

// Access IOTA-only network helpers through the normalized shape
const networkList = iota.client.network?.getAllNetworks();
```

```ts
// Dynamically decide the chain but keep uniform typing
function loadSdk(chain: "sui" | "iota") {
  const sdk = createSdk(chain);
  const Mod = sdk.getModule("transactions");
  return { sdk, Transaction: Mod.Transaction };
}

const { sdk: activeSdk, Transaction } = loadSdk(process.env.CHAIN as "sui");
const tx = new Transaction();
```

---

## API surface

### Normalized SDK

- `createSdk("sui" | "iota")` – returns a typed `NormalizedSdk<C>` object containing:
  - `client` – `{ Client, Transport, TransportError, JsonRpcError, getFullnodeUrl, isClient, network }`
  - core namespaces (`bcs`, `transactions`, `utils`, `verify`, `cryptography`, `multisig`, `faucet`, `zklogin?`)
  - `keypairs` – `{ ed25519, secp256k1, secp256r1, passkey }`
  - `getModule(name)` – dynamic access without exposing chain-specific export names.

The `network` field is `undefined` on Sui and exposes IOTA-only helpers when the chain is `"iota"`.

### Unified Types

The package exports unified types that are compatible with both Sui and IOTA. This allows you to write functions that accept data from either chain without manual type casting.

- **Move**: `MoveStruct`, `MoveValue`
- **Objects**: `ObjectData`, `ObjectResponse`, `ObjectRef`, `OwnedObjectRef`
- **Transactions**: `Transaction`, `TransactionBlockResponse`, `DryRunTransactionBlockResponse`, `TransactionArgument`, `TransactionResult`, `TransactionObjectInput`
- **Data**: `Event`, `Checkpoint`, `Balance`, `CoinStruct`, `CoinMetadata`
- **Pagination**: `PaginatedCoins`, `PaginatedEvents`, `PaginatedObjectsResponse`, `PaginatedTransactionResponse`
- **Params**: `MoveCallParams`

Example:
```ts
import { MoveStruct, ObjectData } from "unimove-sdk";

function processData(data: ObjectData) {
  // Works for both Sui and IOTA object data
  console.log(data.objectId);
}
```

### Module accessors (optional)

If you want the raw namespaces without normalization, the package still exports per-module accessors. Each requires an explicit `chain` argument:

- `client("sui" | "iota")`
- `bcs("sui" | "iota")`
- `transactions("sui" | "iota")`
- `utils("sui" | "iota")`
- `verify("sui" | "iota")`
- `cryptography("sui" | "iota")`
- `multisig("sui" | "iota")`
- `faucet("sui" | "iota")`
- `zklogin("sui" | "iota")` _(returns `undefined` on IOTA)_
- `keypairs("sui" | "iota")`

Keypair shortcuts:

- `keypairEd25519("sui" | "iota")`
- `keypairSecp256k1("sui" | "iota")`
- `keypairSecp256r1("sui" | "iota")`
- `keypairPasskey("sui" | "iota")`

### Utilities & types

- `isChainId(value)` – runtime guard for user input.
- `getModule(chain, name)` – dynamic lookup inside the registry.
- `sdkRegistry` – direct access to the underlying constant registry.
- Type exports: `ChainId`, `ModuleName`, `SdkRegistry`, `NormalizedSdk`, `NormalizedClientModule`, `NormalizedKeypairs`, and all **Unified Types** listed above.

---

## Example: helper factory

```ts
import { createSdk } from "unimove-sdk";

export function createClient(chain: "sui" | "iota", config: { url: string }) {
  const sdk = createSdk(chain);
  return new sdk.client.Client(config);
}
```

Feel free to extend the registry with additional convenience helpers as your app evolves.

---

## License

[Apache-2.0](./LICENSE)
