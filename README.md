# Unimove

Monorepo containing the Unimove ecosystem. It currently ships both a React dApp kit and a low-level SDK wrapper for Sui and IOTA.

## Packages

- [`@unimove/dapp-kit`](packages/unimove-dapp-kit) – unified providers, hooks, and components for Sui and IOTA dApps.
- [`@unimove/sdk`](packages/unimove-sdk) – zero-brain unified access to `@mysten/sui` and `@iota/iota-sdk`, including the normalized `createSdk("sui" | "iota")` factory.

## Development

Install dependencies with your preferred package manager (Bun, npm, pnpm, etc.). Example using Bun:

```bash
bun install
```

### Common scripts

Scripts are executed from the package directories. For example, to run type checks:

```bash
cd packages/unimove-dapp-kit && bun run typecheck
cd packages/unimove-sdk && bun run typecheck
```

## License

Apache-2.0
