"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/types/product";
import { SITE } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

export function ProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const router = useRouter();

  const { addItem, isLoading } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.handle);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.color === selectedColor && v.size === selectedSize) ?? null,
    [product.variants, selectedColor, selectedSize]
  );

  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;

  function availabilityForSize(size: string) {
    return product.variants.find((v) => v.color === selectedColor && v.size === size)?.available ?? false;
  }

  async function handleAdd(navigateToCart: boolean) {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    if (!selectedVariant || !selectedVariant.available) return;

    await addItem(product, selectedVariant, quantity, { openDrawer: !navigateToCart });
    if (navigateToCart) {
      router.push("/cart");
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-charcoal-soft text-xs tracking-wider uppercase">{product.category}</p>
      <h1 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{product.title}</h1>

      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className={cn("text-2xl", onSale ? "text-accent" : "text-ink")}>
          {formatPrice(product.price, product.currency)}
        </span>
        {onSale && (
          <span className="text-charcoal-soft text-lg line-through">
            {formatPrice(product.compareAtPrice as number, product.currency)}
          </span>
        )}
      </div>

      <p className="text-charcoal mt-5 max-w-md text-sm leading-relaxed">{product.description}</p>

      {product.colors.length > 0 && (
        <div className="mt-7">
          <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">
            Color — <span className="text-ink">{selectedColor}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColor(color.name);
                  setSelectedSize(undefined);
                }}
                aria-label={color.name}
                aria-pressed={selectedColor === color.name}
                className={cn(
                  "h-9 w-9 rounded-full border transition-shadow",
                  selectedColor === color.name
                    ? "ring-ink ring-offset-ivory ring-2 ring-offset-2"
                    : "border-line-strong"
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">Size</p>
            {sizeError && <p className="text-error text-xs">Please select a size</p>}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const available = availabilityForSize(size);
              return (
                <button
                  key={size}
                  disabled={!available}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  aria-pressed={selectedSize === size}
                  className={cn(
                    "min-w-[3rem] border px-3 py-2.5 text-sm transition-colors",
                    !available && "border-line text-charcoal-soft/40 cursor-not-allowed line-through",
                    available && selectedSize === size && "border-ink bg-ink text-ivory",
                    available && selectedSize !== size && "border-line-strong text-ink hover:border-ink"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center gap-4">
        <div className="border-line-strong flex items-center border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="hover:bg-ink hover:text-ivory flex h-12 w-11 items-center justify-center"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span className="w-10 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="hover:bg-ink hover:text-ivory flex h-12 w-11 items-center justify-center"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
        </div>

        <button
          onClick={() => toggle(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="border-line-strong hover:border-ink flex h-12 w-12 items-center justify-center border transition-colors"
        >
          <Heart size={18} className={wishlisted ? "fill-ink" : ""} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => handleAdd(false)}
          disabled={isLoading || (selectedVariant !== null && !selectedVariant.available)}
          size="lg"
          className="flex-1"
        >
          {selectedVariant && !selectedVariant.available ? "Out of Stock" : "Add to Bag"}
        </Button>
        <Button
          onClick={() => handleAdd(true)}
          disabled={isLoading || (selectedVariant !== null && !selectedVariant.available)}
          variant="secondary"
          size="lg"
          className="flex-1"
        >
          Buy Now
        </Button>
      </div>

      {(SITE.shippingSummary || SITE.returnsSummary) && (
        <div className="border-line text-charcoal mt-7 flex flex-col gap-3 border-y py-5 text-xs">
          {SITE.shippingSummary && <div className="flex items-center gap-2"><Truck size={16} aria-hidden="true" />{SITE.shippingSummary}</div>}
          {SITE.returnsSummary && <div className="flex items-center gap-2"><RotateCcw size={16} aria-hidden="true" />{SITE.returnsSummary}</div>}
        </div>
      )}
      <p className="text-charcoal-soft mt-4 flex items-center gap-2 text-xs">
        <ShieldCheck size={16} aria-hidden="true" /> Payment is completed through Shopify&rsquo;s secure checkout.
      </p>

      <div className="mt-2">
        {product.materials && (
          <Accordion title="Materials & Care">
            <ul className="text-charcoal flex flex-col gap-1.5 text-sm">
              {product.materials.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {product.careInstructions?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Accordion>
        )}
        {(SITE.shippingSummary || product.shippingNote) && (
          <Accordion title="Shipping">
            <p className="text-charcoal text-sm">{SITE.shippingSummary || product.shippingNote}</p>
          </Accordion>
        )}
        {(SITE.returnsSummary || product.returnsNote) && (
          <Accordion title="Returns">
            <p className="text-charcoal text-sm">{SITE.returnsSummary || product.returnsNote}</p>
          </Accordion>
        )}
      </div>
    </div>
  );
}
