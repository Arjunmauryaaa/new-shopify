import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export function CartCrossSell({ products }: { products: Product[] }) {
  return (
    <div className="border-line border-t px-6 py-5">
      <p className="text-charcoal-soft mb-3 text-xs font-medium tracking-wider uppercase">
        You may also like
      </p>
      <div className="hide-scrollbar flex gap-3 overflow-x-auto">
        {products.slice(0, 4).map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`} className="w-24 shrink-0">
            <div className="bg-ivory-dim relative aspect-[4/5] w-full overflow-hidden">
              <Image src={product.thumbnail} alt={product.title} fill sizes="96px" className="object-cover" />
            </div>
            <p className="text-ink mt-2 truncate text-xs">{product.title}</p>
            <p className="text-charcoal-soft text-xs">{formatPrice(product.price, product.currency)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
