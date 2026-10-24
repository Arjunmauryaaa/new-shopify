import type { Product } from "@/types/product";
import { ProductGrid } from "./ProductGrid";

export function ProductRecommendations({
  products,
  title = "You May Also Like",
}: {
  products: Product[];
  title?: string;
}) {
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-8">
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
