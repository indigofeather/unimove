import * as suiClient from "@mysten/sui/client";
import * as suiBcs from "@mysten/sui/bcs";
import * as suiTransactions from "@mysten/sui/transactions";
import * as suiUtils from "@mysten/sui/utils";
import * as suiVerify from "@mysten/sui/verify";
import * as suiCryptography from "@mysten/sui/cryptography";
import * as suiMultisig from "@mysten/sui/multisig";
import * as suiFaucet from "@mysten/sui/faucet";
import * as suiZklogin from "@mysten/sui/zklogin";
import * as suiKeypairEd25519 from "@mysten/sui/keypairs/ed25519";
import * as suiKeypairSecp256k1 from "@mysten/sui/keypairs/secp256k1";
import * as suiKeypairSecp256r1 from "@mysten/sui/keypairs/secp256r1";
import * as suiKeypairPasskey from "@mysten/sui/keypairs/passkey";

import * as iotaClient from "@iota/iota-sdk/client";
import * as iotaBcs from "@iota/iota-sdk/bcs";
import * as iotaTransactions from "@iota/iota-sdk/transactions";
import * as iotaUtils from "@iota/iota-sdk/utils";
import * as iotaVerify from "@iota/iota-sdk/verify";
import * as iotaCryptography from "@iota/iota-sdk/cryptography";
import * as iotaMultisig from "@iota/iota-sdk/multisig";
import * as iotaFaucet from "@iota/iota-sdk/faucet";
import * as iotaKeypairEd25519 from "@iota/iota-sdk/keypairs/ed25519";
import * as iotaKeypairSecp256k1 from "@iota/iota-sdk/keypairs/secp256k1";
import * as iotaKeypairSecp256r1 from "@iota/iota-sdk/keypairs/secp256r1";
import * as iotaKeypairPasskey from "@iota/iota-sdk/keypairs/passkey";

export const sdkRegistry = {
  sui: {
    id: "sui" as const,
    modules: {
      client: suiClient,
      bcs: suiBcs,
      transactions: suiTransactions,
      utils: suiUtils,
      verify: suiVerify,
      cryptography: suiCryptography,
      multisig: suiMultisig,
      faucet: suiFaucet,
      zklogin: suiZklogin,
      keypairs: {
        ed25519: suiKeypairEd25519,
        secp256k1: suiKeypairSecp256k1,
        secp256r1: suiKeypairSecp256r1,
        passkey: suiKeypairPasskey,
      },
    },
  },
  iota: {
    id: "iota" as const,
    modules: {
      client: iotaClient,
      bcs: iotaBcs,
      transactions: iotaTransactions,
      utils: iotaUtils,
      verify: iotaVerify,
      cryptography: iotaCryptography,
      multisig: iotaMultisig,
      faucet: iotaFaucet,
      zklogin: undefined,
      keypairs: {
        ed25519: iotaKeypairEd25519,
        secp256k1: iotaKeypairSecp256k1,
        secp256r1: iotaKeypairSecp256r1,
        passkey: iotaKeypairPasskey,
      },
    },
  },
} as const;

export type SdkRegistry = typeof sdkRegistry;
export type ChainId = keyof SdkRegistry;
