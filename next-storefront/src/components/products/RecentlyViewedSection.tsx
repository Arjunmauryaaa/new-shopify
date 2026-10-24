"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { ProductRecommendations } from "./ProductRecommendations";

/**
 * Records the current product as viewed (when `recordHandle` is passed) and
 * renders the shopper's recently-viewed rail, excluding the current product.
 */
export function RecentlyViewedSection({ recordHandle }: { recordHandle?: string }) {
  const handles = useRecentlyViewed(recordHandle);
  const [products, setProducts] = useState<Product[]>([]);

  const otherHandles = handles.filter((h) => h !== recordHandle);
  const handlesKey = otherHandles.join(",");

  useEffect(() => {
    if (!handlesKey) return;
    const controller = new AbortController();
    fetch(`/api/products?handles=${handlesKey}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { products: Product[] }) => setProducts(data.products))
      .catch(() => {});
    return () => controller.abort();
  }, [handlesKey]);

  if (otherHandles.length === 0 || products.length === 0) return null;

  return <ProductRecommendations products={products} title="Recently Viewed" />;
}
