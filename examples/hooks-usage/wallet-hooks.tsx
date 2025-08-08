/**
 * Wallet Hooks Example
 *
 * This example demonstrates all wallet-related hooks with improved type safety.
 * Each hook now provides precise type inference and supports both automatic
 * and manual chain selection.
 */

"use client";

import React from "react";
import {
  useCurrentAccount,
  useCurrentWallet,
  useAccounts,
  useConnectWallet,
  useDisconnectWallet,
  useAutoConnectWallet,
  useSwitchAccount,
  useWallets,
  type UnimoveCurrentAccountResult,
  type UnimoveCurrentWalletResult,
  type UnimoveAccountsResult,
  type UnimoveConnectWalletResult,
  type UnimoveWalletsResult,
} from "unimove-sdk";

// ✅ Automatic chain selection (based on context)
export function AutomaticChainWalletHooks() {
  // These hooks automatically use the chain from context
  const currentAccount = useCurrentAccount(); // Type inferred from context
  const currentWallet = useCurrentWallet(); // Type inferred from context
  const accounts = useAccounts(); // Type inferred from context
  const wallets = useWallets(); // Type inferred from context

  const { mutate: connectWallet, isPending: isConnecting } = useConnectWallet();
  const { mutate: disconnectWallet, isPending: isDisconnecting } =
    useDisconnectWallet();
  const { mutate: switchAccount, isPending: isSwitching } = useSwitchAccount();

  // Auto-connect hook (runs automatically)
  useAutoConnectWallet();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Automatic Chain Selection</h2>

      {/* Current Account Info */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold">Current Account</h3>
        {currentAccount ? (
          <div>
            <p>Address: {currentAccount.address}</p>
            <p>Public Key: {currentAccount.publicKey}</p>
          </div>
        ) : (
          <p>No account connected</p>
        )}
      </div>

      {/* Current Wallet Info */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold">Current Wallet</h3>
        {currentWallet ? (
          <div>
            <p>Name: {currentWallet.name}</p>
            <p>Version: {currentWallet.version}</p>
          </div>
        ) : (
          <p>No wallet connected</p>
        )}
      </div>

      {/* Available Wallets */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold">Available Wallets ({wallets.length})</h3>
        <div className="space-y-2">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => connectWallet({ walletName: wallet.name })}
              disabled={isConnecting}
              className="block w-full p-2 text-left border rounded hover:bg-gray-50"
            >
              {wallet.name} - {wallet.version}
            </button>
          ))}
        </div>
      </div>

      {/* Account Management */}
      {accounts.length > 0 && (
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Accounts ({accounts.length})</h3>
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.address}
                onClick={() => switchAccount({ account })}
                disabled={isSwitching}
                className={`block w-full p-2 text-left border rounded hover:bg-gray-50 ${
                  currentAccount?.address === account.address
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                {account.address}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disconnect Button */}
      {currentWallet && (
        <button
          onClick={() => disconnectWallet()}
          disabled={isDisconnecting}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {isDisconnecting ? "Disconnecting..." : "Disconnect Wallet"}
        </button>
      )}
    </div>
  );
}

// ✅ Manual chain selection with precise types
export function ManualChainWalletHooks() {
  // Explicitly specify chain for precise type inference
  const iotaAccount = useCurrentAccount<"iota">("iota"); // Type: UnimoveCurrentAccountResult<'iota'>
  const suiAccount = useCurrentAccount<"sui">("sui"); // Type: UnimoveCurrentAccountResult<'sui'>

  const iotaWallet = useCurrentWallet<"iota">("iota"); // Type: UnimoveCurrentWalletResult<'iota'>
  const suiWallet = useCurrentWallet<"sui">("sui"); // Type: UnimoveCurrentWalletResult<'sui'>

  const iotaAccounts = useAccounts<"iota">("iota"); // Type: UnimoveAccountsResult<'iota'>
  const suiAccounts = useAccounts<"sui">("sui"); // Type: UnimoveAccountsResult<'sui'>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manual Chain Selection</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* IOTA Column */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold text-blue-600">IOTA Chain</h3>

          <div className="mt-2">
            <h4 className="font-medium">Account:</h4>
            {iotaAccount ? (
              <p className="text-sm">{iotaAccount.address}</p>
            ) : (
              <p className="text-sm text-gray-500">Not connected</p>
            )}
          </div>

          <div className="mt-2">
            <h4 className="font-medium">Wallet:</h4>
            {iotaWallet ? (
              <p className="text-sm">{iotaWallet.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Not connected</p>
            )}
          </div>

          <div className="mt-2">
            <h4 className="font-medium">Accounts:</h4>
            <p className="text-sm">{iotaAccounts.length} available</p>
          </div>
        </div>

        {/* SUI Column */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold text-green-600">SUI Chain</h3>

          <div className="mt-2">
            <h4 className="font-medium">Account:</h4>
            {suiAccount ? (
              <p className="text-sm">{suiAccount.address}</p>
            ) : (
              <p className="text-sm text-gray-500">Not connected</p>
            )}
          </div>

          <div className="mt-2">
            <h4 className="font-medium">Wallet:</h4>
            {suiWallet ? (
              <p className="text-sm">{suiWallet.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Not connected</p>
            )}
          </div>

          <div className="mt-2">
            <h4 className="font-medium">Accounts:</h4>
            <p className="text-sm">{suiAccounts.length} available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Type-safe wallet operations
export function TypeSafeWalletOperations() {
  const currentAccount = useCurrentAccount();
  const { mutate: connectWallet, error: connectError } = useConnectWallet();
  const { mutate: disconnectWallet, error: disconnectError } =
    useDisconnectWallet();

  // Type-safe error handling
  const handleConnect = (walletName: string) => {
    connectWallet(
      { walletName },
      {
        onSuccess: (result) => {
          // result is properly typed
          console.log("Connected successfully:", result);
        },
        onError: (error) => {
          // error is properly typed
          console.error("Connection failed:", error.message);
        },
      }
    );
  };

  const handleDisconnect = () => {
    disconnectWallet(undefined, {
      onSuccess: () => {
        console.log("Disconnected successfully");
      },
      onError: (error) => {
        console.error("Disconnect failed:", error.message);
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Type-Safe Operations</h2>

      {/* Connection Status */}
      <div className="p-4 border rounded">
        <h3 className="font-semibold">Connection Status</h3>
        <p>Status: {currentAccount ? "Connected" : "Disconnected"}</p>
        {currentAccount && (
          <p className="text-sm text-gray-600">
            Address: {currentAccount.address}
          </p>
        )}
      </div>

      {/* Error Display */}
      {(connectError || disconnectError) && (
        <div className="p-4 border border-red-300 rounded bg-red-50">
          <h3 className="font-semibold text-red-700">Error</h3>
          <p className="text-red-600">
            {connectError?.message || disconnectError?.message}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-x-2">
        <button
          onClick={() => handleConnect("Sui Wallet")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Sui Wallet
        </button>

        <button
          onClick={() => handleConnect("IOTA Wallet")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Connect IOTA Wallet
        </button>

        {currentAccount && (
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}

// ✅ Complete wallet hooks example
export function CompleteWalletHooksExample() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Wallet Hooks Examples</h1>

      <AutomaticChainWalletHooks />
      <ManualChainWalletHooks />
      <TypeSafeWalletOperations />

      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-semibold">Key Improvements:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>✅ Precise type inference for each hook</li>
          <li>✅ Support for both automatic and manual chain selection</li>
          <li>✅ Eliminated confusing union types</li>
          <li>✅ Better error handling with proper types</li>
          <li>✅ Backward compatibility maintained</li>
        </ul>
      </div>
    </div>
  );
}
