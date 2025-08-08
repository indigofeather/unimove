/**
 * Basic SDK Initialization Example
 *
 * This example shows how to initialize the Unimove SDK with improved type safety.
 * The SDK now provides precise type inference and eliminates all 'any' types.
 */

import {
  unimoveSDK,
  type UnimoveSDK,
  type UnimoveClient,
} from "unimove-sdk/server";

// ✅ Type-safe SDK initialization
export async function basicSDKSetup() {
  console.log("🚀 Initializing Unimove SDK...");

  // The SDK now provides precise type inference based on chain selection
  const iotaSDK = await unimoveSDK("iota"); // Type: UnimoveSDK<'iota'>
  const suiSDK = await unimoveSDK("sui"); // Type: UnimoveSDK<'sui'>

  console.log("✅ SDK initialized successfully");

  return { iotaSDK, suiSDK };
}

// ✅ Using the unified API
export async function unifiedAPIExample() {
  const sdk = await unimoveSDK("iota");

  // All these methods are now unified across chains
  const rpcUrl = sdk.getFullnodeUrl("testnet");
  const client = sdk.createClient({ url: rpcUrl });
  const transaction = sdk.createTransaction();
  const keypair = sdk.createEd25519Keypair();

  console.log("🔗 RPC URL:", rpcUrl);
  console.log("📱 Client created:", !!client);
  console.log("📝 Transaction created:", !!transaction);
  console.log("🔑 Keypair created:", !!keypair);

  return { client, transaction, keypair };
}

// ✅ Type-safe client operations
export async function clientOperations() {
  const sdk = await unimoveSDK("iota");
  const client = sdk.createClient({
    url: sdk.getFullnodeUrl("testnet"),
  });

  // Now with complete type safety - no more 'any' types!
  try {
    const coins = await client.getCoins({
      owner:
        "0x35450c61e01abc7946d27da3846d8f3d184a8dc6ba2e96bab97c476623515684",
      limit: 10,
    });

    console.log("💰 Coins found:", coins.data.length);
    return coins;
  } catch (error) {
    console.error("❌ Error fetching coins:", error);
    throw error;
  }
}

// ✅ Advanced SDK features
export async function advancedFeatures() {
  const sdk = await unimoveSDK("sui");

  // Access to all 11 modules with proper types
  const modules = {
    client: sdk.client, // typeof SuiClient
    bcs: sdk.bcs, // typeof SuiBcs
    transactions: sdk.transactions, // typeof SuiTransactions
    verify: sdk.verify, // typeof SuiVerify
    cryptography: sdk.cryptography, // typeof SuiCryptography
    multisig: sdk.multisig, // typeof SuiMultisig
    utils: sdk.utils, // typeof SuiUtils
    faucet: sdk.faucet, // typeof SuiFaucet
    ed25519Keypair: sdk.ed25519Keypair, // typeof SuiEd25519Keypair
    secp256k1Keypair: sdk.secp256k1Keypair, // typeof SuiSecp256k1Keypair
    secp256r1Keypair: sdk.secp256r1Keypair, // typeof SuiSecp256r1Keypair
  };

  // Unified utility methods
  const structTag = sdk.parseStructTag("0x2::coin::Coin<0x2::sui::SUI>");
  const normalizedTag = sdk.normalizeStructTag(structTag);

  console.log("🏗️ Parsed struct tag:", structTag);
  console.log("🔧 Normalized tag:", normalizedTag);

  return { modules, structTag, normalizedTag };
}

// ✅ Error handling with types
export async function errorHandlingExample() {
  try {
    const sdk = await unimoveSDK("iota");
    const client = sdk.createClient({
      url: "https://invalid-url.com",
    });

    // This will throw a typed error
    await client.getCoins({
      owner: "invalid-address",
    });
  } catch (error) {
    // Error is properly typed
    if (error instanceof Error) {
      console.error("🚨 Typed error:", error.message);
    }
    throw error;
  }
}

// Example usage
async function runExamples() {
  try {
    await basicSDKSetup();
    await unifiedAPIExample();
    await clientOperations();
    await advancedFeatures();
  } catch (error) {
    console.error("Example failed:", error);
  }
}

// Uncomment to run
// runExamples();
