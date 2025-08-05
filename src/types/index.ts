/**
 * Network configuration type for both Sui and IOTA chains
 */
export type Networks = Record<string, { url: string }>;

/**
 * Supported chain types
 */
export type ChainType = "sui" | "iota";

/**
 * Network names commonly used across chains
 */
export type NetworkName = "mainnet" | "testnet" | "devnet" | "localnet";
