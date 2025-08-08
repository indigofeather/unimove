// Context and Provider
export type { SupportedChain } from "./context";
export { useChain } from "./context";
export { ClientProvider } from "./providers/ClientProvider";
export { WalletProvider } from "./providers/WalletProvider";

// Components
export { ConnectButton } from "./components/ConnectButton";
export { ConnectModal } from "./components/ConnectModal";
export { ClientQuery } from "./components/ClientQuery";

// Wallet Hooks
export { useAccounts } from "./hooks/useAccounts";
export { useAutoConnectWallet } from "./hooks/useAutoConnectWallet";
export { useConnectWallet } from "./hooks/useConnectWallet";
export { useCurrentAccount } from "./hooks/useCurrentAccount";
export { useCurrentWallet } from "./hooks/useCurrentWallet";
export { useDisconnectWallet } from "./hooks/useDisconnectWallet";
export { useSignAndExecuteTransaction } from "./hooks/useSignAndExecuteTransaction";
export { useSignPersonalMessage } from "./hooks/useSignPersonalMessage";
export { useSignTransaction } from "./hooks/useSignTransaction";
export { useSwitchAccount } from "./hooks/useSwitchAccount";
export { useWallets } from "./hooks/useWallets";

// Client Hooks
export { useClient } from "./hooks/useClient";
export { useClientQuery } from "./hooks/useClientQuery";
export { useClientInfiniteQuery } from "./hooks/useClientInfiniteQuery";
export { useClientMutation } from "./hooks/useClientMutation";
export { useClientQueries } from "./hooks/useClientQueries";

// Hook Types - 新的精確類型
export type { UnimoveClientHookResult } from "./hooks/useClient";
export type { UnimoveCurrentAccountResult } from "./hooks/useCurrentAccount";
export type { UnimoveSignAndExecuteTransactionResult } from "./hooks/useSignAndExecuteTransaction";
export type { UnimoveConnectWalletResult } from "./hooks/useConnectWallet";
export type { UnimoveWalletsResult } from "./hooks/useWallets";
export type { UnimoveSignTransactionResult } from "./hooks/useSignTransaction";
export type { UnimoveSignPersonalMessageResult } from "./hooks/useSignPersonalMessage";
export type { UnimoveClientQueryResult } from "./hooks/useClientQuery";
export type { UnimoveAccountsResult } from "./hooks/useAccounts";
export type { UnimoveAutoConnectWalletResult } from "./hooks/useAutoConnectWallet";
export type { UnimoveCurrentWalletResult } from "./hooks/useCurrentWallet";
export type { UnimoveDisconnectWalletResult } from "./hooks/useDisconnectWallet";
export type { UnimoveSwitchAccountResult } from "./hooks/useSwitchAccount";
export type { UnimoveClientInfiniteQueryResult } from "./hooks/useClientInfiniteQuery";
export type { UnimoveClientMutationResult } from "./hooks/useClientMutation";
export type { UnimoveClientQueriesResult } from "./hooks/useClientQueries";

// Themes
export * from "./themes";

// SDK
export { unimoveSDK } from "./sdk";

// SDK Hook
export { useUnimoveSDK } from "./hooks/useUnimoveSDK";

// Types
export type {
  Networks,
  ChainType,
  NetworkName,
  UnimoveClientConfig,
  UnimoveGetCoinsParams,
  UnimoveGetObjectParams,
  UnimoveNetwork,
  UnimoveKeypairConfig,
  UnimoveTransactionConfig,
  UnimoveStructTag,
  UnimoveBcsOptions,
} from "./types";

// SDK Types
export type {
  UnimoveSDK,
  UnimoveClient,
  UnimoveTransaction,
  UnimoveBcs,
  UnimoveCryptography,
  UnimoveUtils,
  UnimoveEd25519Keypair,
  UnimoveSecp256k1Keypair,
  UnimoveSecp256r1Keypair,
} from "./sdk";
