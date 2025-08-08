/**
 * Multi-Chain Switcher Example
 *
 * This example demonstrates how to build a complete multi-chain application
 * that can switch between SUI and IOTA at runtime while maintaining
 * type safety and unified API usage.
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  ClientProvider,
  WalletProvider,
  ConnectButton,
  useCurrentAccount,
  useClientQuery,
  useChain,
  unimoveSDK,
  type Networks,
  type ChainType,
  type UnimoveSDK,
} from "unimove-sdk";

// ✅ Chain store for state management
interface ChainStore {
  currentChain: ChainType;
  networks: Record<ChainType, Networks>;
  sdks: Record<ChainType, UnimoveSDK<ChainType> | null>;
  isLoading: boolean;
  error: string | null;
}

// ✅ Multi-chain provider component
function MultiChainProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<ChainStore>({
    currentChain: "sui",
    networks: { sui: {}, iota: {} },
    sdks: { sui: null, iota: null },
    isLoading: true,
    error: null,
  });

  // Initialize networks for both chains
  useEffect(() => {
    const initializeNetworks = async () => {
      try {
        setStore((prev) => ({ ...prev, isLoading: true, error: null }));

        // Load both SDKs in parallel
        const [suiSDK, iotaSDK] = await Promise.all([
          unimoveSDK("sui"),
          unimoveSDK("iota"),
        ]);

        // Configure networks for both chains
        const networks: Record<ChainType, Networks> = {
          sui: {
            mainnet: { url: suiSDK.getFullnodeUrl("mainnet") },
            testnet: { url: suiSDK.getFullnodeUrl("testnet") },
            devnet: { url: suiSDK.getFullnodeUrl("devnet") },
          },
          iota: {
            mainnet: { url: iotaSDK.getFullnodeUrl("mainnet") },
            testnet: { url: iotaSDK.getFullnodeUrl("testnet") },
            devnet: { url: iotaSDK.getFullnodeUrl("devnet") },
          },
        };

        setStore((prev) => ({
          ...prev,
          networks,
          sdks: { sui: suiSDK, iota: iotaSDK },
          isLoading: false,
        }));
      } catch (error) {
        setStore((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : "Failed to initialize",
          isLoading: false,
        }));
      }
    };

    initializeNetworks();
  }, []);

  // Switch chain function
  const switchChain = (newChain: ChainType) => {
    setStore((prev) => ({ ...prev, currentChain: newChain }));
  };

  if (store.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Initializing multi-chain SDK...</p>
        </div>
      </div>
    );
  }

  if (store.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {store.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ClientProvider
      chain={store.currentChain}
      networks={store.networks[store.currentChain]}
      defaultNetwork="testnet"
    >
      <WalletProvider autoConnect>
        <ChainSwitcherContext.Provider value={{ store, switchChain }}>
          {children}
        </ChainSwitcherContext.Provider>
      </WalletProvider>
    </ClientProvider>
  );
}

// ✅ Context for chain switching
const ChainSwitcherContext = React.createContext<{
  store: ChainStore;
  switchChain: (chain: ChainType) => void;
} | null>(null);

const useChainSwitcher = () => {
  const context = React.useContext(ChainSwitcherContext);
  if (!context) {
    throw new Error("useChainSwitcher must be used within MultiChainProvider");
  }
  return context;
};

// ✅ Chain switcher UI component
function ChainSwitcherUI() {
  const { store, switchChain } = useChainSwitcher();
  const currentChain = useChain();

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
      <span className="font-medium">Chain:</span>

      <button
        onClick={() => switchChain("sui")}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentChain === "sui"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        SUI
      </button>

      <button
        onClick={() => switchChain("iota")}
        className={`px-4 py-2 rounded-md transition-colors ${
          currentChain === "iota"
            ? "bg-purple-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        IOTA
      </button>

      <div className="ml-4 text-sm text-gray-600">
        Current: <span className="font-medium capitalize">{currentChain}</span>
      </div>
    </div>
  );
}

// ✅ Multi-chain portfolio component
function MultiChainPortfolio() {
  const currentAccount = useCurrentAccount();
  const currentChain = useChain();

  // Query balance for current chain
  const { data: balance, isLoading: balanceLoading } = useClientQuery(
    "getBalance",
    { owner: currentAccount?.address },
    { enabled: !!currentAccount?.address }
  );

  // Query owned objects
  const { data: objects, isLoading: objectsLoading } = useClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address,
      options: { showContent: true, showType: true },
      limit: 10,
    },
    { enabled: !!currentAccount?.address }
  );

  if (!currentAccount) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 mb-4">
          Connect your wallet to view portfolio
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          {currentChain.toUpperCase()} Portfolio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Info */}
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Account</h3>
            <p className="text-sm text-gray-600 break-all">
              {currentAccount.address}
            </p>
          </div>

          {/* Balance */}
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Balance</h3>
            {balanceLoading ? (
              <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
            ) : balance ? (
              <p className="text-lg font-mono">
                {balance.totalBalance} {currentChain.toUpperCase()}
              </p>
            ) : (
              <p className="text-gray-500">Unable to load balance</p>
            )}
          </div>
        </div>
      </div>

      {/* Owned Objects */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Owned Objects</h3>

        {objectsLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-16 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        ) : objects?.data?.length ? (
          <div className="space-y-3">
            {objects.data.slice(0, 5).map((obj) => (
              <div key={obj.data?.objectId} className="p-3 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-sm text-gray-600">
                      {obj.data?.objectId}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {obj.data?.type}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Owned
                  </span>
                </div>
              </div>
            ))}

            {objects.data.length > 5 && (
              <p className="text-sm text-gray-500 text-center">
                ... and {objects.data.length - 5} more objects
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No objects found</p>
        )}
      </div>
    </div>
  );
}

// ✅ Main multi-chain app component
export function MultiChainApp() {
  return (
    <MultiChainProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Multi-Chain Portfolio</h1>
            <p className="text-gray-600 mb-6">
              Switch between SUI and IOTA chains seamlessly with unified API
            </p>

            <ChainSwitcherUI />
          </div>

          <MultiChainPortfolio />

          {/* Feature highlights */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Key Features Demonstrated:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Runtime chain switching
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Type-safe SDK operations
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Unified API across chains
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Persistent wallet connections
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Optimized network loading
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Error boundary handling
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MultiChainProvider>
  );
}
