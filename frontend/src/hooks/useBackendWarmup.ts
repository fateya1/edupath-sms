import { useCallback, useEffect, useState } from "react";
import { warmUpBackend } from "../services/warmup";

export function useBackendWarmup() {
  const [warmingUp, setWarmingUp] = useState(false);

  const warmupNow = useCallback(async () => {
    try {
      setWarmingUp(true);
      await warmUpBackend();
    } catch {
      // ignore (Render can be sleeping)
    } finally {
      setWarmingUp(false);
    }
  }, []);

  // Optional: auto-warmup when hook is used
  useEffect(() => {
    warmupNow();
  }, [warmupNow]);

  return { warmingUp, warmupNow };
}
