import { useEffect, useState } from "react";
import { readRecentlyViewed, recordRecentlyViewed } from "@/lib/recently-viewed";

export function useRecentlyViewed(recordHandle?: string): string[] {
  const [handles, setHandles] = useState<string[]>([]);

  useEffect(() => {
    // Intentional: this both reads and (when recordHandle is given) writes
    // to localStorage, which only exists client-side — it can't be
    // computed during render, and re-runs only when the viewed product
    // changes (e.g. navigating between product pages).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHandles(recordHandle ? recordRecentlyViewed(recordHandle) : readRecentlyViewed());
  }, [recordHandle]);

  return handles;
}
