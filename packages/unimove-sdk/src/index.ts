export type { ChainId, SdkRegistry } from "./chains";
export type { ModuleName } from "./chains";
export type {
  NormalizedSdk,
  NormalizedClientModule,
  NormalizedKeypairs,
} from "./sdk";

export {
  sdkRegistry,
  isChainId,
  getModule,
} from "./chains";

export { createSdk } from "./sdk";

import { createModuleAccessor, createKeypairAccessor } from "./chains";
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
