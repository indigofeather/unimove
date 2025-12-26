import {
  createKeypairAccessor,
  createModuleAccessor,
  getModule,
} from "./chains";
import type { ChainId, ModuleName, SdkRegistry } from "./chains";

const getClientNamespace = createModuleAccessor("client");
const getBcsNamespace = createModuleAccessor("bcs");
const getTransactionsNamespace = createModuleAccessor("transactions");
const getUtilsNamespace = createModuleAccessor("utils");
const getVerifyNamespace = createModuleAccessor("verify");
const getCryptographyNamespace = createModuleAccessor("cryptography");
const getMultisigNamespace = createModuleAccessor("multisig");
const getFaucetNamespace = createModuleAccessor("faucet");
const getZkloginNamespace = createModuleAccessor("zklogin");

const getKeypairEd25519Namespace = createKeypairAccessor("ed25519");
const getKeypairSecp256k1Namespace = createKeypairAccessor("secp256k1");
const getKeypairSecp256r1Namespace = createKeypairAccessor("secp256r1");
const getKeypairPasskeyNamespace = createKeypairAccessor("passkey");

type ChainModules<C extends ChainId> = SdkRegistry[C]["modules"];

type ModuleFor<C extends ChainId, Name extends keyof ChainModules<C>> =
  ChainModules<C>[Name];

type ClientNamespace<C extends ChainId> = ModuleFor<C, "client">;

type ClientCtor<C extends ChainId> = C extends "sui"
  ? ModuleFor<"sui", "client">["SuiClient"]
  : ModuleFor<"iota", "client">["IotaClient"];

type ClientTransport<C extends ChainId> = C extends "sui"
  ? ModuleFor<"sui", "client">["SuiHTTPTransport"]
  : ModuleFor<"iota", "client">["IotaHTTPTransport"];

type ClientTransportError<C extends ChainId> = C extends "sui"
  ? ModuleFor<"sui", "client">["SuiHTTPTransportError"]
  : ModuleFor<"iota", "client">["IotaHTTPTransportError"];

type ClientGuard<C extends ChainId> = C extends "sui"
  ? ModuleFor<"sui", "client">["isSuiClient"]
  : ModuleFor<"iota", "client">["isIotaClient"];

type ClientNetworkTools<C extends ChainId> = C extends "iota"
  ? Pick<
      ModuleFor<"iota", "client">,
      | "Network"
      | "getAllNetworks"
      | "getAppsBackend"
      | "getDefaultNetwork"
      | "getGraphQLUrl"
      | "getNetwork"
    >
  : undefined;

export type NormalizedClientModule<C extends ChainId> = {
  Client: ClientCtor<C>;
  Transport: ClientTransport<C>;
  TransportError: ClientTransportError<C>;
  JsonRpcError: ClientNamespace<C>["JsonRpcError"];
  getFullnodeUrl: ClientNamespace<C>["getFullnodeUrl"];
  isClient: ClientGuard<C>;
  network: ClientNetworkTools<C>;
};

type KeypairsNamespace<C extends ChainId> = ModuleFor<C, "keypairs">;

export type NormalizedKeypairs<C extends ChainId> = {
  ed25519: KeypairsNamespace<C>["ed25519"];
  secp256k1: KeypairsNamespace<C>["secp256k1"];
  secp256r1: KeypairsNamespace<C>["secp256r1"];
  passkey: KeypairsNamespace<C>["passkey"];
};

type ZkloginModule<C extends ChainId> = C extends "sui"
  ? ModuleFor<"sui", "zklogin">
  : undefined;

export type NormalizedSdk<C extends ChainId> = {
  chain: C;
  client: NormalizedClientModule<C>;
  bcs: ModuleFor<C, "bcs">;
  transactions: ModuleFor<C, "transactions">;
  utils: ModuleFor<C, "utils">;
  verify: ModuleFor<C, "verify">;
  cryptography: ModuleFor<C, "cryptography">;
  multisig: ModuleFor<C, "multisig">;
  faucet: ModuleFor<C, "faucet">;
  zklogin: ZkloginModule<C>;
  keypairs: NormalizedKeypairs<C>;
  getModule<Name extends ModuleName>(name: Name): ModuleFor<C, Name>;
};

function normalizeClientModule<C extends ChainId>(
  chain: C
): NormalizedClientModule<C> {
  const namespace = getClientNamespace(chain) as ClientNamespace<C>;

  if (chain === "sui") {
    const suiNamespace = namespace as ModuleFor<"sui", "client">;
    return {
      Client: suiNamespace.SuiClient,
      Transport: suiNamespace.SuiHTTPTransport,
      TransportError: suiNamespace.SuiHTTPTransportError,
      JsonRpcError: suiNamespace.JsonRpcError,
      getFullnodeUrl: suiNamespace.getFullnodeUrl,
      isClient: suiNamespace.isSuiClient,
      network: undefined,
    } as NormalizedClientModule<C>;
  }

  const iotaNamespace = namespace as ModuleFor<"iota", "client">;
  return {
    Client: iotaNamespace.IotaClient,
    Transport: iotaNamespace.IotaHTTPTransport,
    TransportError: iotaNamespace.IotaHTTPTransportError,
    JsonRpcError: iotaNamespace.JsonRpcError,
    getFullnodeUrl: iotaNamespace.getFullnodeUrl,
    isClient: iotaNamespace.isIotaClient,
    network: {
      Network: iotaNamespace.Network,
      getAllNetworks: iotaNamespace.getAllNetworks,
      getAppsBackend: iotaNamespace.getAppsBackend,
      getDefaultNetwork: iotaNamespace.getDefaultNetwork,
      getGraphQLUrl: iotaNamespace.getGraphQLUrl,
      getNetwork: iotaNamespace.getNetwork,
    } as ClientNetworkTools<C>,
  } as NormalizedClientModule<C>;
}

function normalizeKeypairs<C extends ChainId>(
  chain: C
): NormalizedKeypairs<C> {
  return {
    ed25519: getKeypairEd25519Namespace(chain),
    secp256k1: getKeypairSecp256k1Namespace(chain),
    secp256r1: getKeypairSecp256r1Namespace(chain),
    passkey: getKeypairPasskeyNamespace(chain),
  } as NormalizedKeypairs<C>;
}

export function createSdk<C extends ChainId>(chain: C): NormalizedSdk<C> {
  const sdk: NormalizedSdk<C> = {
    chain,
    client: normalizeClientModule(chain),
    bcs: getBcsNamespace(chain) as ModuleFor<C, "bcs">,
    transactions: getTransactionsNamespace(chain) as ModuleFor<C, "transactions">,
    utils: getUtilsNamespace(chain) as ModuleFor<C, "utils">,
    verify: getVerifyNamespace(chain) as ModuleFor<C, "verify">,
    cryptography: getCryptographyNamespace(chain) as ModuleFor<C, "cryptography">,
    multisig: getMultisigNamespace(chain) as ModuleFor<C, "multisig">,
    faucet: getFaucetNamespace(chain) as ModuleFor<C, "faucet">,
    zklogin: (chain === "sui"
      ? (getZkloginNamespace(chain) as ModuleFor<"sui", "zklogin">)
      : undefined) as ZkloginModule<C>,
    keypairs: normalizeKeypairs(chain),
    getModule<Name extends ModuleName>(name: Name) {
      return getModule(chain, name) as ModuleFor<C, Name>;
    },
  };

  return sdk;
}
