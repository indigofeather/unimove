/**
 * Unified API Example
 *
 * This example demonstrates the unified API that works consistently
 * across both SUI and IOTA chains with complete type safety.
 */

import { unimoveSDK } from "unimove-sdk/server";
import type {
  UnimoveSDK,
  UnimoveClient,
  UnimoveTransaction,
  UnimoveNetwork,
  UnimoveStructTag,
} from "unimove-sdk";

// ✅ Unified API methods - same interface for both chains
export async function demonstrateUnifiedAPI() {
  console.log("🔄 Demonstrating Unified API...");

  // Both SDKs have identical API surface
  const iotaSDK = await unimoveSDK("iota");
  const suiSDK = await unimoveSDK("sui");

  // 1. Client Creation (unified)
  const iotaClient = iotaSDK.createClient({
    url: iotaSDK.getFullnodeUrl("testnet"),
  });
  const suiClient = suiSDK.createClient({
    url: suiSDK.getFullnodeUrl("testnet"),
  });

  // 2. Transaction Creation (unified)
  const iotaTransaction = iotaSDK.createTransaction();
  const suiTransaction = suiSDK.createTransaction();

  // 3. Keypair Creation (unified)
  const iotaKeypair = iotaSDK.createEd25519Keypair();
  const suiKeypair = suiSDK.createEd25519Keypair();

  console.log("✅ All unified methods work identically across chains");

  return {
    iota: {
      client: iotaClient,
      transaction: iotaTransaction,
      keypair: iotaKeypair,
    },
    sui: {
      client: suiClient,
      transaction: suiTransaction,
      keypair: suiKeypair,
    },
  };
}

// ✅ Network operations with type safety
export async function networkOperations() {
  const networks: UnimoveNetwork[] = [
    "mainnet",
    "testnet",
    "devnet",
    "localnet",
  ];

  for (const chain of ["iota", "sui"] as const) {
    const sdk = await unimoveSDK(chain);

    console.log(`\n🌐 ${chain.toUpperCase()} Network URLs:`);

    for (const network of networks) {
      try {
        const url = sdk.getFullnodeUrl(network);
        console.log(`  ${network}: ${url}`);
      } catch (error) {
        console.log(`  ${network}: Not available`);
      }
    }
  }
}

// ✅ Utility methods comparison
export async function utilityMethodsComparison() {
  const iotaSDK = await unimoveSDK("iota");
  const suiSDK = await unimoveSDK("sui");

  // Same struct tag format works for both chains
  const iotaStructTag: UnimoveStructTag = {
    address: "0x2",
    module: "coin",
    name: "Coin",
    typeParams: ["0x2::iota::IOTA"],
  };

  const suiStructTag: UnimoveStructTag = {
    address: "0x2",
    module: "coin",
    name: "Coin",
    typeParams: ["0x2::sui::SUI"],
  };

  // Unified utility methods
  const iotaNormalized = iotaSDK.normalizeStructTag(iotaStructTag);
  const suiNormalized = suiSDK.normalizeStructTag(suiStructTag);

  const iotaParsed = iotaSDK.parseStructTag("0x2::coin::Coin<0x2::iota::IOTA>");
  const suiParsed = suiSDK.parseStructTag("0x2::coin::Coin<0x2::sui::SUI>");

  console.log("🏗️ IOTA normalized:", iotaNormalized);
  console.log("🏗️ SUI normalized:", suiNormalized);
  console.log("📝 IOTA parsed:", iotaParsed);
  console.log("📝 SUI parsed:", suiParsed);

  return {
    iota: { normalized: iotaNormalized, parsed: iotaParsed },
    sui: { normalized: suiNormalized, parsed: suiParsed },
  };
}

// ✅ BCS operations with unified interface
export async function bcsOperations() {
  const iotaSDK = await unimoveSDK("iota");
  const suiSDK = await unimoveSDK("sui");

  // Both SDKs provide the same BCS interface
  const iotaBcs = iotaSDK.bcsSerialize;
  const suiBcs = suiSDK.bcsSerialize;

  // Example: Serialize an address (same API for both chains)
  const address = "0x1234567890abcdef1234567890abcdef12345678";

  try {
    const iotaSerialized = iotaBcs.serialize("address", address);
    const suiSerialized = suiBcs.serialize("address", address);

    console.log("🔢 IOTA BCS serialized:", iotaSerialized);
    console.log("🔢 SUI BCS serialized:", suiSerialized);

    return { iotaSerialized, suiSerialized };
  } catch (error) {
    console.log("ℹ️ BCS serialization example (interface is unified)");
    return null;
  }
}

// ✅ Keypair operations across chains
export async function keypairOperations() {
  const chains = ["iota", "sui"] as const;
  const keypairTypes = ["Ed25519", "Secp256k1", "Secp256r1"] as const;

  for (const chain of chains) {
    const sdk = await unimoveSDK(chain);

    console.log(`\n🔑 ${chain.toUpperCase()} Keypair Creation:`);

    // All keypair types available with unified API
    const ed25519 = sdk.createEd25519Keypair();
    const secp256k1 = sdk.createSecp256k1Keypair();
    const secp256r1 = sdk.createSecp256r1Keypair();

    console.log("  ✅ Ed25519 keypair created");
    console.log("  ✅ Secp256k1 keypair created");
    console.log("  ✅ Secp256r1 keypair created");
  }
}

// ✅ Complete unified workflow
export async function completeUnifiedWorkflow(chain: "iota" | "sui") {
  console.log(`\n🔄 Complete workflow for ${chain.toUpperCase()}:`);

  // 1. Initialize SDK
  const sdk = await unimoveSDK(chain);
  console.log("  1️⃣ SDK initialized");

  // 2. Create client
  const client = sdk.createClient({
    url: sdk.getFullnodeUrl("testnet"),
  });
  console.log("  2️⃣ Client created");

  // 3. Create transaction
  const transaction = sdk.createTransaction();
  console.log("  3️⃣ Transaction created");

  // 4. Create keypair
  const keypair = sdk.createEd25519Keypair();
  console.log("  4️⃣ Keypair created");

  // 5. Use utilities
  const structTag = sdk.parseStructTag(
    `0x2::coin::Coin<0x2::${chain}::${chain.toUpperCase()}>`
  );
  console.log("  5️⃣ Struct tag parsed");

  // 6. Access BCS
  const bcs = sdk.bcsSerialize;
  console.log("  6️⃣ BCS serializer accessed");

  console.log(`✅ Complete ${chain} workflow finished`);

  return { sdk, client, transaction, keypair, structTag, bcs };
}

// Example usage
async function runUnifiedAPIExamples() {
  try {
    await demonstrateUnifiedAPI();
    await networkOperations();
    await utilityMethodsComparison();
    await bcsOperations();
    await keypairOperations();

    // Run complete workflow for both chains
    await completeUnifiedWorkflow("iota");
    await completeUnifiedWorkflow("sui");

    console.log("\n🎉 All unified API examples completed successfully!");
  } catch (error) {
    console.error("❌ Unified API example failed:", error);
  }
}

// Uncomment to run
// runUnifiedAPIExamples();
