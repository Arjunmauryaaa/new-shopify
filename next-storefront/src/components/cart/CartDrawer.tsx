"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "./CartItem";
import { CartCrossSell } from "./CartCrossSell";
import type { Product } from "@/types/product";

export function CartDrawer({ crossSellProducts }: { crossSellProducts: Product[] }) {
  const { cart, isOpen, closeCart } = useCart();

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title={`Your Bag${cart.totalQuantity ? ` (${cart.totalQuantity})` : ""}`}
    >
      {cart.lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <ShoppingBag size={32} className="text-charcoal-soft" aria-hidden="true" />
          <div>
            <p className="font-display text-xl">Your bag is empty</p>
            <p className="text-charcoal mt-1 text-sm">Discover something you&rsquo;ll love.</p>
          </div>
          <ButtonLink href="/shop" onClick={closeCart} size="sm">
            Shop Now
          </ButtonLink>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="divide-line flex-1 divide-y px-6">
            {cart.lines.map((line) => (
              <CartItem key={line.id} line={line} />
            ))}
          </div>

          {crossSellProducts.length > 0 && <CartCrossSell products={crossSellProducts} />}

          <div className="border-line border-t px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-charcoal">Estimated subtotal</span>
              <span className="text-ink font-medium">{formatPrice(cart.subtotal, cart.currency)}</span>
            </div>
            <p className="text-charcoal-soft mb-4 text-xs">Shipping and taxes calculated at checkout.</p>
            <ButtonLink href="/cart" onClick={closeCart} size="lg" className="w-full">
              Checkout
            </ButtonLink>
          </div>
        </div>
      )}
    </Drawer>
  );
}
