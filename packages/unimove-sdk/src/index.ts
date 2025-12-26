export type { ChainId, SdkRegistry } from "./chains";
export type { ModuleName } from "./chains";
export type {
  NormalizedSdk,
  NormalizedClientModule,
  NormalizedKeypairs,
} from "./sdk";

import type {
  Balance as SuiBalance,
  Checkpoint as SuiCheckpoint,
  CoinMetadata as SuiCoinMetadata,
  CoinStruct as SuiCoinStruct,
  DryRunTransactionBlockResponse as SuiDryRunTransactionBlockResponse,
  SuiEvent,
  MoveCallParams as SuiMoveCallParams,
  MoveStruct as SuiMoveStruct,
  MoveValue as SuiMoveValue,
  SuiObjectData,
  SuiObjectRef,
  SuiObjectResponse,
  OwnedObjectRef as SuiOwnedObjectRef,
  PaginatedCoins as SuiPaginatedCoins,
  PaginatedEvents as SuiPaginatedEvents,
  PaginatedObjectsResponse as SuiPaginatedObjectsResponse,
  PaginatedTransactionResponse as SuiPaginatedTransactionResponse,
  SuiTransactionBlockResponse,
} from "@mysten/sui/client";
import type {
  Balance as IotaBalance,
  Checkpoint as IotaCheckpoint,
  CoinMetadata as IotaCoinMetadata,
  CoinStruct as IotaCoinStruct,
  DryRunTransactionBlockResponse as IotaDryRunTransactionBlockResponse,
  IotaEvent,
  MoveCallParams as IotaMoveCallParams,
  MoveStruct as IotaMoveStruct,
  MoveValue as IotaMoveValue,
  IotaObjectData,
  IotaObjectRef,
  IotaObjectResponse,
  OwnedObjectRef as IotaOwnedObjectRef,
  PaginatedCoins as IotaPaginatedCoins,
  PaginatedEvents as IotaPaginatedEvents,
  PaginatedObjectsResponse as IotaPaginatedObjectsResponse,
  PaginatedTransactionResponse as IotaPaginatedTransactionResponse,
  IotaTransactionBlockResponse,
} from "@iota/iota-sdk/client";
import type {
  Transaction as SuiTransaction,
  TransactionArgument as SuiTransactionArgument,
  TransactionObjectInput as SuiTransactionObjectInput,
  TransactionResult as SuiTransactionResult,
} from "@mysten/sui/transactions";
import type {
  Transaction as IotaTransaction,
  TransactionArgument as IotaTransactionArgument,
  TransactionObjectInput as IotaTransactionObjectInput,
  TransactionResult as IotaTransactionResult,
} from "@iota/iota-sdk/transactions";

export type MoveStruct = SuiMoveStruct | IotaMoveStruct;
export type MoveValue = SuiMoveValue | IotaMoveValue;
export type ObjectData = SuiObjectData | IotaObjectData;
export type ObjectResponse = SuiObjectResponse | IotaObjectResponse;
export type Event = SuiEvent | IotaEvent;
export type TransactionBlockResponse =
  | SuiTransactionBlockResponse
  | IotaTransactionBlockResponse;
export type Checkpoint = SuiCheckpoint | IotaCheckpoint;
export type Balance = SuiBalance | IotaBalance;
export type CoinStruct = SuiCoinStruct | IotaCoinStruct;
export type CoinMetadata = SuiCoinMetadata | IotaCoinMetadata;
export type DryRunTransactionBlockResponse =
  | SuiDryRunTransactionBlockResponse
  | IotaDryRunTransactionBlockResponse;
export type MoveCallParams = SuiMoveCallParams | IotaMoveCallParams;
export type PaginatedCoins = SuiPaginatedCoins | IotaPaginatedCoins;
export type PaginatedEvents = SuiPaginatedEvents | IotaPaginatedEvents;
export type PaginatedObjectsResponse =
  | SuiPaginatedObjectsResponse
  | IotaPaginatedObjectsResponse;
export type PaginatedTransactionResponse =
  | SuiPaginatedTransactionResponse
  | IotaPaginatedTransactionResponse;
export type ObjectRef = SuiObjectRef | IotaObjectRef;
export type OwnedObjectRef = SuiOwnedObjectRef | IotaOwnedObjectRef;

export type Transaction = SuiTransaction | IotaTransaction;
export type TransactionArgument =
  | SuiTransactionArgument
  | IotaTransactionArgument;
export type TransactionResult = SuiTransactionResult | IotaTransactionResult;
export type TransactionObjectInput =
  | SuiTransactionObjectInput
  | IotaTransactionObjectInput;

export { sdkRegistry, isChainId, getModule } from "./chains";

export { createSdk } from "./sdk";

import { createKeypairAccessor, createModuleAccessor } from "./chains";
import type { ChainId, SdkRegistry } from "./chains";

export type ModulesForChain<C extends ChainId> = SdkRegistry[C]["modules"];
export type ModuleForChain<
  C extends ChainId,
  Name extends keyof ModulesForChain<C>,
> = ModulesForChain<C>[Name];
export const client = createModuleAccessor("client");
export const bcs = createModuleAccessor("bcs");
export const transactions = createModuleAccessor("transactions");
export const utils = createModuleAccessor("utils");
export const verify = createModuleAccessor("verify");
export const cryptography = createModuleAccessor("cryptography");
export const multisig = createModuleAccessor("multisig");
export const faucet = createModuleAccessor("faucet");
export const zklogin = createModuleAccessor("zklogin");
export const keypairs = createModuleAccessor("keypairs");

export const keypairEd25519 = createKeypairAccessor("ed25519");
export const keypairSecp256k1 = createKeypairAccessor("secp256k1");
export const keypairSecp256r1 = createKeypairAccessor("secp256r1");
export const keypairPasskey = createKeypairAccessor("passkey");
