import type * as SuiClient from "@mysten/sui/client";
import type * as SuiBcs from "@mysten/sui/bcs";
import type * as SuiTransactions from "@mysten/sui/transactions";
import type * as SuiVerify from "@mysten/sui/verify";
import type * as SuiCryptography from "@mysten/sui/cryptography";
import type * as SuiMultisig from "@mysten/sui/multisig";
import type * as SuiUtils from "@mysten/sui/utils";
import type * as SuiFaucet from "@mysten/sui/faucet";
import type * as SuiEd25519Keypair from "@mysten/sui/keypairs/ed25519";
import type * as SuiSecp256k1Keypair from "@mysten/sui/keypairs/secp256k1";
import type * as SuiSecp256r1Keypair from "@mysten/sui/keypairs/secp256r1";
import type * as IotaClient from "@iota/iota-sdk/client";
import type * as IotaBcs from "@iota/iota-sdk/bcs";
import type * as IotaTransactions from "@iota/iota-sdk/transactions";
import type * as IotaVerify from "@iota/iota-sdk/verify";
import type * as IotaCryptography from "@iota/iota-sdk/cryptography";
import type * as IotaMultisig from "@iota/iota-sdk/multisig";
import type * as IotaUtils from "@iota/iota-sdk/utils";
import type * as IotaFaucet from "@iota/iota-sdk/faucet";
import type * as IotaEd25519Keypair from "@iota/iota-sdk/keypairs/ed25519";
import type * as IotaSecp256k1Keypair from "@iota/iota-sdk/keypairs/secp256k1";
import type * as IotaSecp256r1Keypair from "@iota/iota-sdk/keypairs/secp256r1";

// 統一的 Client 類型定義
export type UnimoveClient<T extends "sui" | "iota"> = T extends "sui"
  ? SuiClient.SuiClient
  : IotaClient.IotaClient;

// 統一的 Transaction 類型定義
export type UnimoveTransaction<T extends "sui" | "iota"> = T extends "sui"
  ? SuiTransactions.Transaction
  : IotaTransactions.Transaction;

// 統一的 BCS 類型定義
export type UnimoveBcs<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiBcs
  : typeof IotaBcs;

// 統一的 Cryptography 類型定義
export type UnimoveCryptography<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiCryptography
  : typeof IotaCryptography;

// 統一的 Utils 類型定義
export type UnimoveUtils<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiUtils
  : typeof IotaUtils;

// 統一的 Keypair 類型定義
export type UnimoveEd25519Keypair<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiEd25519Keypair
  : typeof IotaEd25519Keypair;

export type UnimoveSecp256k1Keypair<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiSecp256k1Keypair
  : typeof IotaSecp256k1Keypair;

export type UnimoveSecp256r1Keypair<T extends "sui" | "iota"> = T extends "sui"
  ? typeof SuiSecp256r1Keypair
  : typeof IotaSecp256r1Keypair;

type SuiModules = {
  client: typeof SuiClient;
  bcs: typeof SuiBcs;
  transactions: typeof SuiTransactions;
  verify: typeof SuiVerify;
  cryptography: typeof SuiCryptography;
  multisig: typeof SuiMultisig;
  utils: typeof SuiUtils;
  faucet: typeof SuiFaucet;
  ed25519Keypair: typeof SuiEd25519Keypair;
  secp256k1Keypair: typeof SuiSecp256k1Keypair;
  secp256r1Keypair: typeof SuiSecp256r1Keypair;
};

type IotaModules = {
  client: typeof IotaClient;
  bcs: typeof IotaBcs;
  transactions: typeof IotaTransactions;
  verify: typeof IotaVerify;
  cryptography: typeof IotaCryptography;
  multisig: typeof IotaMultisig;
  utils: typeof IotaUtils;
  faucet: typeof IotaFaucet;
  ed25519Keypair: typeof IotaEd25519Keypair;
  secp256k1Keypair: typeof IotaSecp256k1Keypair;
  secp256r1Keypair: typeof IotaSecp256r1Keypair;
};

// 統一的 SDK 類型，根據 chain 參數提供正確的類型
export type UnimoveSDK<T extends "sui" | "iota"> = T extends "sui"
  ? SuiModules & {
    // 統一的 Client 方法
    createClient: (config: { url: string }) => SuiClient.SuiClient;
    getFullnodeUrl: (network: string) => string;

    // 統一的 Transaction 方法
    createTransaction: () => SuiTransactions.Transaction;

    // 統一的 Keypair 創建方法
    createEd25519Keypair: () => SuiEd25519Keypair.Ed25519Keypair;
    createSecp256k1Keypair: () => SuiSecp256k1Keypair.Secp256k1Keypair;
    createSecp256r1Keypair: () => SuiSecp256r1Keypair.Secp256r1Keypair;

    // 統一的 Keypair 靜態方法
    Ed25519Keypair: typeof SuiEd25519Keypair.Ed25519Keypair;
    Secp256k1Keypair: typeof SuiSecp256k1Keypair.Secp256k1Keypair;
    Secp256r1Keypair: typeof SuiSecp256r1Keypair.Secp256r1Keypair;

    // 統一的私鑰解碼方法
    decodePrivateKey: (secretKey: string) => SuiCryptography.ParsedKeypair;

    // 統一的工具方法
    normalizeStructTag: typeof SuiUtils.normalizeStructTag;
    parseStructTag: typeof SuiUtils.parseStructTag;

    // 統一的 BCS 方法
    bcsSerialize: typeof SuiBcs.bcs;
  }
  : IotaModules & {
    // 統一的 Client 方法
    createClient: (config: { url: string }) => IotaClient.IotaClient;
    getFullnodeUrl: (network: string) => string;

    // 統一的 Transaction 方法
    createTransaction: () => IotaTransactions.Transaction;

    // 統一的 Keypair 創建方法
    createEd25519Keypair: () => IotaEd25519Keypair.Ed25519Keypair;
    createSecp256k1Keypair: () => IotaSecp256k1Keypair.Secp256k1Keypair;
    createSecp256r1Keypair: () => IotaSecp256r1Keypair.Secp256r1Keypair;

    // 統一的 Keypair 靜態方法
    Ed25519Keypair: typeof IotaEd25519Keypair.Ed25519Keypair;
    Secp256k1Keypair: typeof IotaSecp256k1Keypair.Secp256k1Keypair;
    Secp256r1Keypair: typeof IotaSecp256r1Keypair.Secp256r1Keypair;

    // 統一的私鑰解碼方法
    decodePrivateKey: (secretKey: string) => IotaCryptography.ParsedKeypair;

    // 統一的工具方法
    normalizeStructTag: typeof IotaUtils.normalizeStructTag;
    parseStructTag: typeof IotaUtils.parseStructTag;

    // 統一的 BCS 方法
    bcsSerialize: typeof IotaBcs.bcs;
  };

// SDK 快取，避免重複載入
const sdkCache = new Map<
  string,
  Promise<UnimoveSDK<"sui"> | UnimoveSDK<"iota">>
>();

// 重載函數定義，提供精確的類型推斷
export async function unimoveSDK(chain: "sui"): Promise<UnimoveSDK<"sui">>;
export async function unimoveSDK(chain: "iota"): Promise<UnimoveSDK<"iota">>;
export async function unimoveSDK<T extends "sui" | "iota">(
  chain: T
): Promise<UnimoveSDK<T>> {
  // 檢查快取
  if (sdkCache.has(chain)) {
    return sdkCache.get(chain)! as unknown as UnimoveSDK<T>;
  }

  // 創建載入 Promise 並加入快取
  const loadPromise = loadSDK(chain);
  sdkCache.set(chain, loadPromise);

  return loadPromise as unknown as Promise<UnimoveSDK<T>>;
}

async function loadSDK(
  chain: "sui" | "iota"
): Promise<UnimoveSDK<"sui"> | UnimoveSDK<"iota">> {
  try {
    switch (chain) {
      case "sui": {
        const [
          client,
          bcs,
          transactions,
          verify,
          cryptography,
          multisig,
          utils,
          faucet,
          ed25519Keypair,
          secp256k1Keypair,
          secp256r1Keypair,
        ] = await Promise.all([
          import("@mysten/sui/client"),
          import("@mysten/sui/bcs"),
          import("@mysten/sui/transactions"),
          import("@mysten/sui/verify"),
          import("@mysten/sui/cryptography"),
          import("@mysten/sui/multisig"),
          import("@mysten/sui/utils"),
          import("@mysten/sui/faucet"),
          import("@mysten/sui/keypairs/ed25519"),
          import("@mysten/sui/keypairs/secp256k1"),
          import("@mysten/sui/keypairs/secp256r1"),
        ]);

        // 添加統一的輔助方法
        const suiSDK = {
          client,
          bcs,
          transactions,
          verify,
          cryptography,
          multisig,
          utils,
          faucet,
          ed25519Keypair,
          secp256k1Keypair,
          secp256r1Keypair,

          // 統一的 Client 方法
          createClient: (config: { url: string }) =>
            new client.SuiClient(config),
          getFullnodeUrl: (network: string) =>
            client.getFullnodeUrl(
              network as "mainnet" | "testnet" | "devnet" | "localnet"
            ),

          // 統一的 Transaction 方法
          createTransaction: () => new transactions.Transaction(),

          // 統一的 Keypair 創建方法
          createEd25519Keypair: () => new ed25519Keypair.Ed25519Keypair(),
          createSecp256k1Keypair: () => new secp256k1Keypair.Secp256k1Keypair(),
          createSecp256r1Keypair: () => new secp256r1Keypair.Secp256r1Keypair(),

          // 統一的 Keypair 靜態方法
          Ed25519Keypair: ed25519Keypair.Ed25519Keypair,
          Secp256k1Keypair: secp256k1Keypair.Secp256k1Keypair,
          Secp256r1Keypair: secp256r1Keypair.Secp256r1Keypair,

          // 統一的私鑰解碼方法
          decodePrivateKey: (secretKey: string) => {
            try {
              return cryptography.decodeSuiPrivateKey(secretKey)
            } catch (error) {
              throw new Error(`Failed to decode Sui private key: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          },

          // 統一的工具方法
          normalizeStructTag: utils.normalizeStructTag,
          parseStructTag: utils.parseStructTag,

          // 統一的 BCS 方法
          bcsSerialize: bcs.bcs,
        };

        return suiSDK as UnimoveSDK<"sui">;
      }
      case "iota": {
        const [
          client,
          bcs,
          transactions,
          verify,
          cryptography,
          multisig,
          utils,
          faucet,
          ed25519Keypair,
          secp256k1Keypair,
          secp256r1Keypair,
        ] = await Promise.all([
          import("@iota/iota-sdk/client"),
          import("@iota/iota-sdk/bcs"),
          import("@iota/iota-sdk/transactions"),
          import("@iota/iota-sdk/verify"),
          import("@iota/iota-sdk/cryptography"),
          import("@iota/iota-sdk/multisig"),
          import("@iota/iota-sdk/utils"),
          import("@iota/iota-sdk/faucet"),
          import("@iota/iota-sdk/keypairs/ed25519"),
          import("@iota/iota-sdk/keypairs/secp256k1"),
          import("@iota/iota-sdk/keypairs/secp256r1"),
        ]);

        // 添加統一的輔助方法
        const iotaSDK = {
          client,
          bcs,
          transactions,
          verify,
          cryptography,
          multisig,
          utils,
          faucet,
          ed25519Keypair,
          secp256k1Keypair,
          secp256r1Keypair,

          // 統一的 Client 方法
          createClient: (config: { url: string }) =>
            new client.IotaClient(config),
          getFullnodeUrl: (network: string) =>
            client.getFullnodeUrl(
              network as "mainnet" | "testnet" | "devnet" | "localnet"
            ),

          // 統一的 Transaction 方法
          createTransaction: () => new transactions.Transaction(),

          // 統一的 Keypair 創建方法
          createEd25519Keypair: () => new ed25519Keypair.Ed25519Keypair(),
          createSecp256k1Keypair: () => new secp256k1Keypair.Secp256k1Keypair(),
          createSecp256r1Keypair: () => new secp256r1Keypair.Secp256r1Keypair(),

          // 統一的 Keypair 靜態方法
          Ed25519Keypair: ed25519Keypair.Ed25519Keypair,
          Secp256k1Keypair: secp256k1Keypair.Secp256k1Keypair,
          Secp256r1Keypair: secp256r1Keypair.Secp256r1Keypair,

          // 統一的私鑰解碼方法
          decodePrivateKey: (secretKey: string) => {
            try {
              return cryptography.decodeIotaPrivateKey(secretKey)
            } catch (error) {
              throw new Error(`Failed to decode IOTA private key: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          },

          // 統一的工具方法
          normalizeStructTag: utils.normalizeStructTag,
          parseStructTag: utils.parseStructTag,

          // 統一的 BCS 方法
          bcsSerialize: bcs.bcs,
        };

        return iotaSDK as UnimoveSDK<"iota">;
      }
      default:
        throw new Error(`Unsupported chain: ${chain}`);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Cannot resolve module")
    ) {
      throw new Error(
        `Failed to load ${chain} SDK. Please ensure you have installed the required peer dependencies:\n` +
        `For Sui: bun add @mysten/dapp-kit @mysten/sui\n` +
        `For IOTA: bun add @iota/dapp-kit @iota/iota-sdk\n` +
        `Original error: ${error.message}`
      );
    }
    throw error;
  }
}
