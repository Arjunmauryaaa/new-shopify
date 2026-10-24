"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readWishlist, writeWishlist } from "@/lib/wishlist";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";

interface WishlistContextValue {
  handles: string[];
  isWishlisted: (handle: string) => boolean;
  toggle: (product: Pick<Product, "id" | "title" | "handle" | "price" | "currency" | "category">) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [handles, setHandles] = useState<string[]>([]);

  useEffect(() => {
    // Intentional: localStorage is only readable client-side, so the
    // wishlist is hydrated one tick after the server-rendered empty state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHandles(readWishlist());
  }, []);

  const toggle = useCallback(
    (product: Pick<Product, "id" | "title" | "handle" | "price" | "currency" | "category">) => {
      setHandles((prev) => {
        const exists = prev.includes(product.handle);
        const next = exists ? prev.filter((h) => h !== product.handle) : [...prev, product.handle];
        writeWishlist(next);
        if (!exists) {
          track({ name: "wishlist_add", payload: { product } });
        }
        return next;
      });
    },
    []
  );

  const isWishlisted = useCallback((handle: string) => handles.includes(handle), [handles]);

  const value = useMemo(() => ({ handles, isWishlisted, toggle }), [handles, isWishlisted, toggle]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
