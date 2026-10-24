"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";

export function ProductViewTracker({ product }: { product: Product }) {
  useEffect(() => {
    track({
      name: "product_view",
      payload: {
        product: {
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: product.price,
          currency: product.currency,
          category: product.category,
        },
      },
    });
    // Only re-fire when navigating to a different product.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return null;
}
