"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [pendingSize, setPendingSize] = useState<string | null>(null);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const wishlisted = isWishlisted(product.handle);
  const secondaryImage = product.images[1] ?? product.images[0];
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const badge = onSale ? "Sale" : product.newArrival ? "New" : product.bestseller ? "Bestseller" : null;
  const firstColor = product.colors[0];

  async function handleQuickAdd(size: string) {
    const variant = product.variants.find(
      (v) => v.size === size && (!firstColor || v.color === firstColor.name)
    );
    if (!variant || !variant.available) return;
    setPendingSize(size);
    await addItem(product, variant, 1);
    setPendingSize(null);
    setShowQuickAdd(false);
  }

  // Products without a Size option (common outside fashion, e.g. gadgets and
  // home goods) have nothing to pick in the size panel, so add the sole/
  // default variant directly instead of opening a picker with no options.
  async function handleDirectAdd() {
    const variant = product.variants.find((v) => !firstColor || v.color === firstColor.name);
    if (!variant || !variant.available) return;
    setPendingSize(variant.id);
    await addItem(product, variant, 1);
    setPendingSize(null);
  }

  return (
    <div
      className="group relative flex flex-col"
      onMouseLeave={() => setShowQuickAdd(false)}
      data-cursor-hover
    >
      <div className="bg-ivory-dim relative aspect-[4/5] w-full overflow-hidden">
        <Link
          href={`/products/${product.handle}`}
          aria-label={product.title}
          className="relative block h-full w-full"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
            priority={priority}
            className={cn(
              "object-cover transition-opacity duration-500 ease-[var(--ease-premium)]",
              "group-hover:opacity-0"
            )}
          />
          <Image
            src={secondaryImage.url}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
            className="scale-105 object-cover opacity-0 transition-opacity duration-500 ease-[var(--ease-premium)] group-hover:opacity-100"
          />
        </Link>

        {badge && (
          <Badge tone={onSale ? "accent" : "ink"} className="absolute top-3 left-3">
            {badge}
          </Badge>
        )}

        <button
          type="button"
          onClick={() => toggle(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="bg-ivory/90 text-ink absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
        >
          <Heart size={16} className={wishlisted ? "fill-ink" : ""} aria-hidden="true" />
        </button>

        <div
          className="absolute inset-x-0 bottom-0 hidden translate-y-full transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-y-0 md:block"
          onMouseEnter={() => setShowQuickAdd(true)}
        >
          <AnimatePresence mode="wait">
            {showQuickAdd ? (
              <motion.div
                key="sizes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="bg-ivory flex flex-wrap gap-1.5 p-3"
              >
                {product.sizes.map((size) => {
                  const variant = product.variants.find(
                    (v) => v.size === size && (!firstColor || v.color === firstColor.name)
                  );
                  const available = variant?.available ?? false;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available || pendingSize === size}
                      onClick={() => handleQuickAdd(size)}
                      className={cn(
                        "border-line-strong min-w-[2.5rem] border px-2 py-1.5 text-[11px] transition-colors",
                        available
                          ? "hover:border-ink hover:bg-ink hover:text-ivory"
                          : "cursor-not-allowed opacity-30"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.button
                key="cta"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                disabled={pendingSize !== null}
                onClick={() => (product.sizes.length > 0 ? setShowQuickAdd(true) : handleDirectAdd())}
                className="bg-ink text-ivory w-full py-3 text-[11px] font-medium tracking-wider uppercase disabled:opacity-60"
              >
                Quick Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Link href={`/products/${product.handle}`} className="mt-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-charcoal-soft text-[11px] tracking-wide uppercase">{product.category}</p>
            <h3 className="text-ink mt-0.5 text-sm font-medium">{product.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm", onSale ? "text-accent" : "text-ink")}>
            {formatPrice(product.price, product.currency)}
          </span>
          {onSale && (
            <span className="text-charcoal-soft text-sm line-through">
              {formatPrice(product.compareAtPrice as number, product.currency)}
            </span>
          )}
        </div>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={11} className="mt-0.5" />
        {product.colors.length > 1 && (
          <div className="mt-1 flex items-center gap-1">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="border-line-strong h-3 w-3 rounded-full border"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
