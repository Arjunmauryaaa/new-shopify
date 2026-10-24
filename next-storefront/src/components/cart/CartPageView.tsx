"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "./CartItem";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { track } from "@/lib/analytics";

export function CartPageView({ crossSellProducts }: { crossSellProducts: Product[] }) {
  const { cart, dataSource } = useCart();

  const canCheckout = cart.lines.length > 0;

  async function handleCheckout() {
    if (!canCheckout || dataSource !== "shopify") return;

    track({
      name: "begin_checkout",
      payload: { value: cart.subtotal, currency: cart.currency, itemCount: cart.totalQuantity },
    });

    if (cart.checkoutUrl) window.location.href = cart.checkoutUrl;
  }

  if (cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <ShoppingBag size={36} className="text-charcoal-soft" aria-hidden="true" />
        <p className="font-display mt-5 text-3xl">Your bag is empty</p>
        <p className="text-charcoal mt-2 text-sm">Discover something you&rsquo;ll love.</p>
        <ButtonLink href="/shop" size="lg" className="mt-8">
          Shop Now
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      <div className="divide-line border-line divide-y border-y">
        {cart.lines.map((line) => (
          <CartItem key={line.id} line={line} />
        ))}
      </div>

      <div className="border-line h-fit border p-6">
        <h2 className="font-display text-xl">Order Summary</h2>
        <div className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal">Subtotal</span>
            <span className="text-ink">{formatPrice(cart.subtotal, cart.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal">Shipping</span>
            <span className="text-charcoal-soft">Calculated at checkout</span>
          </div>
        </div>
        <div className="border-line mt-5 flex justify-between border-t pt-5 text-base font-medium">
          <span>Items subtotal</span>
          <span>{formatPrice(cart.subtotal, cart.currency)}</span>
        </div>
        <p className="text-charcoal-soft mt-3 text-xs leading-relaxed">
          Delivery and applicable taxes are confirmed at checkout. Import charges can depend on your destination.
        </p>

        <Button
          onClick={handleCheckout}
          disabled={!canCheckout || dataSource !== "shopify" || !cart.checkoutUrl}
          size="lg"
          className="mt-6 w-full"
        >
          {dataSource === "shopify" ? "Secure Checkout" : "Checkout unavailable in preview"}
        </Button>

        {dataSource === "mock" && (
          <p className="text-charcoal-soft mt-4 text-xs leading-relaxed">
            Preview catalog only. No order or payment can be placed until the Shopify store is connected.
          </p>
        )}
        {dataSource === "shopify" && (
          <p className="text-charcoal-soft mt-4 text-xs leading-relaxed">
            You&rsquo;ll continue to Shopify&rsquo;s secure checkout to choose delivery and payment.
          </p>
        )}
      </div>

      {crossSellProducts.length > 0 && (
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl">You May Also Like</h2>
          <div className="mt-8">
            <ProductGrid products={crossSellProducts} columns={4} />
          </div>
        </div>
      )}
    </div>
  );
}
