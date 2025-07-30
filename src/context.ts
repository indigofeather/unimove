"use client";
import { createContext, useContext } from "react";

export type SupportedChain = "sui" | "iota";

export const ChainContext = createContext<SupportedChain>("sui");
export const useChain = () => useContext(ChainContext);
