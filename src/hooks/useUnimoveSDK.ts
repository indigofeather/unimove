import { useEffect, useState } from "react";

import { unimoveSDK, type UnimoveSDK } from "../sdk";
import { useChain } from "../context";

// 重載函數定義，提供精確的類型推斷
export function useUnimoveSDK(chain: "sui"): {
  sdk: UnimoveSDK<"sui"> | null;
  loading: boolean;
  error: Error | null;
};
export function useUnimoveSDK(chain: "iota"): {
  sdk: UnimoveSDK<"iota"> | null;
  loading: boolean;
  error: Error | null;
};
export function useUnimoveSDK<T extends "sui" | "iota">(
  chain: T
): {
  sdk: UnimoveSDK<T> | null;
  loading: boolean;
  error: Error | null;
} {
  const contextChain = useChain();
  const finalChain = chain || contextChain;
  const [sdk, setSdk] = useState<UnimoveSDK<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // 使用類型斷言來處理動態 chain 值
    const loadSDK = async () => {
      try {
        let modules: UnimoveSDK<T>;
        if (finalChain === "sui") {
          modules = (await unimoveSDK("sui")) as UnimoveSDK<T>;
        } else {
          modules = (await unimoveSDK("iota")) as UnimoveSDK<T>;
        }
        if (isMounted) {
          setSdk(modules);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSDK();

    return () => {
      isMounted = false;
    };
  }, [finalChain]);

  return { sdk, loading, error };
}
