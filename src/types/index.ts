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

/**
 * 統一的 Client 配置類型
 */
export type UnimoveClientConfig = {
  url: string;
};

/**
 * 統一的 Coin 查詢參數類型
 */
export type UnimoveGetCoinsParams = {
  owner: string;
  coinType?: string;
  cursor?: string;
  limit?: number;
};

/**
 * 統一的 Object 查詢參數類型
 */
export type UnimoveGetObjectParams = {
  id: string;
  options?: {
    showType?: boolean;
    showOwner?: boolean;
    showPreviousTransaction?: boolean;
    showDisplay?: boolean;
    showContent?: boolean;
    showBcs?: boolean;
    showStorageRebate?: boolean;
  };
};
/**
 * 統一的網路類型
 */
export type UnimoveNetwork = "mainnet" | "testnet" | "devnet" | "localnet";

/**
 * 統一的 Keypair 配置類型
 */
export type UnimoveKeypairConfig = {
  secretKey?: Uint8Array;
  seed?: string;
};

/**
 * 統一的 Transaction 配置類型
 */
export type UnimoveTransactionConfig = {
  sender?: string;
  gasPrice?: string;
  gasBudget?: string;
};

/**
 * 統一的 Struct Tag 類型
 */
export type UnimoveStructTag = {
  address: string;
  module: string;
  name: string;
  typeParams?: string[];
};

/**
 * 統一的 BCS 序列化選項
 */
export type UnimoveBcsOptions = {
  maxDepth?: number;
  encoding?: "base64" | "hex";
};
