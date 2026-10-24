import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
}

const COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function ProductGrid({ products, columns = 4, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <div className={`grid ${COLS[columns]} gap-x-4 gap-y-10 sm:gap-x-6`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, columns = 4 }: { count?: number; columns?: 2 | 3 | 4 }) {
  return (
    <div className={`grid ${COLS[columns]} gap-x-4 gap-y-10 sm:gap-x-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
