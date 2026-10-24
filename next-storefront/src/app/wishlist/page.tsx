"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProductGrid, ProductGridSkeleton } from "@/components/products/ProductGrid";
import type { Product } from "@/types/product";

export default function WishlistPage() {
  const { handles } = useWishlist();
  const [products, setProducts] = useState<Product[] | null>(null);
  const handlesKey = handles.join(",");

  useEffect(() => {
    if (!handlesKey) return;
    const controller = new AbortController();
    fetch(`/api/products?handles=${handlesKey}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { products: Product[] }) => setProducts(data.products))
      .catch(() => {});
    return () => controller.abort();
  }, [handlesKey]);

  const isEmpty = handles.length === 0;
  const isLoading = !isEmpty && products === null;
  const items = products ?? [];

  return (
    <Container className="py-14 pb-24">
      <h1 className="font-display text-4xl sm:text-5xl">Wishlist</h1>
      <p className="text-charcoal-soft mt-2 text-sm">
        {isLoading ? "" : `${items.length} item${items.length === 1 ? "" : "s"}`}
      </p>

      <div className="mt-10">
        {isLoading && <ProductGridSkeleton count={4} />}

        {!isLoading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={32} className="text-charcoal-soft" aria-hidden="true" />
            <p className="font-display mt-5 text-2xl">Your wishlist is empty</p>
            <p className="text-charcoal mt-2 text-sm">Save the pieces you love for later.</p>
            <ButtonLink href="/shop" size="lg" className="mt-8">
              Shop Now
            </ButtonLink>
          </div>
        )}

        {!isLoading && !isEmpty && items.length > 0 && <ProductGrid products={items} columns={4} />}
      </div>
    </Container>
  );
}
