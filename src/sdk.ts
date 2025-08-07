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

// SDK 快取，避免重複載入
const sdkCache = new Map<string, Promise<SuiModules | IotaModules>>();

export async function unimoveSDK(
  chain: "sui" | "iota"
): Promise<SuiModules | IotaModules> {
  // 檢查快取
  if (sdkCache.has(chain)) {
    return sdkCache.get(chain)!;
  }

  // 創建載入 Promise 並加入快取
  const loadPromise = loadSDK(chain);
  sdkCache.set(chain, loadPromise);

  return loadPromise;
}

async function loadSDK(
  chain: "sui" | "iota"
): Promise<SuiModules | IotaModules> {
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
        return {
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
        };
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
        return {
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
        };
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
