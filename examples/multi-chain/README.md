# Multi-Chain Example

This example demonstrates building a complete multi-chain application that can switch between SUI and IOTA at runtime while maintaining type safety and unified API usage.

## Features Demonstrated

- ✅ Runtime chain switching with type safety
- ✅ Unified API across different chains
- ✅ State management for multi-chain apps
- ✅ Network configuration management
- ✅ Wallet connection persistence across chains

## Key Improvements Shown

- **Type-Safe Chain Switching**: Precise types maintained during runtime switching
- **Unified State Management**: Same state structure works for both chains
- **Performance Optimization**: Efficient SDK loading and caching
- **Error Boundary**: Proper error handling during chain switches

## Files

- `chain-switcher.tsx` - Main chain switching component
- `multi-chain-provider.tsx` - Provider for multi-chain state
- `chain-store.ts` - Zustand store for chain management
- `network-config.ts` - Network configuration utilities
- `portfolio-view.tsx` - Multi-chain portfolio display

## Running the Example

```bash
npm install
npm run dev
```

## What You'll Learn

1. How to build apps that support multiple chains
2. Managing chain state with type safety
3. Optimizing performance during chain switches
4. Handling network configurations
5. Building unified UIs for multi-chain apps
