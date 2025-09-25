import { sdkRegistry } from "./registry";
import type { ChainId, SdkRegistry } from "./registry";

export function isChainId(value: unknown): value is ChainId {
  return typeof value === "string" && value in sdkRegistry;
}

export type ModuleName = keyof SdkRegistry[ChainId]["modules"];

export function createModuleAccessor<Name extends ModuleName>(name: Name) {
  return (chain: ChainId) => sdkRegistry[chain].modules[name];
}

export function createKeypairAccessor<
  Algorithm extends keyof SdkRegistry[ChainId]["modules"]["keypairs"],
>(algorithm: Algorithm) {
  return (chain: ChainId) => sdkRegistry[chain].modules.keypairs[algorithm];
}

export function getModule<C extends ChainId, Name extends ModuleName>(
  chain: C,
  name: Name
) {
  return sdkRegistry[chain].modules[name];
}
