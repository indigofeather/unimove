import { useEffect, useState } from "react";

import { unimoveSDK } from "../sdk";
import { useChain } from "../context";

type SdkModules = Awaited<ReturnType<typeof unimoveSDK>>;

export function useUnimoveSDK(chain: "sui" | "iota") {
  const contextChain = useChain();
  chain = chain || contextChain;
  const [sdk, setSdk] = useState<SdkModules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    unimoveSDK(chain)
      .then((modules) => {
        if (isMounted) {
          setSdk(modules);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chain]);

  return { sdk, loading, error };
}
