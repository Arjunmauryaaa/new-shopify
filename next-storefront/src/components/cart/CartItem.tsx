"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/types/cart";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem, isLoading } = useCart();

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/products/${line.handle}`}
        className="bg-ivory-dim relative h-28 w-24 shrink-0 overflow-hidden"
      >
        <Image src={line.image} alt={line.title} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/products/${line.handle}`} className="text-ink text-sm font-medium">
              {line.title}
            </Link>
            <p className="text-charcoal-soft mt-1 text-xs">{line.variantTitle}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.id)}
            aria-label={`Remove ${line.title} from cart`}
            disabled={isLoading}
            className="text-charcoal-soft hover:text-ink transition-colors"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="border-line-strong flex items-center border">
            <button
              type="button"
              onClick={() => updateQuantity(line.id, line.quantity - 1)}
              aria-label="Decrease quantity"
              disabled={isLoading}
              className="hover:bg-ink hover:text-ivory flex h-8 w-8 items-center justify-center"
            >
              <Minus size={12} aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.id, line.quantity + 1)}
              aria-label="Increase quantity"
              disabled={isLoading}
              className="hover:bg-ink hover:text-ivory flex h-8 w-8 items-center justify-center"
            >
              <Plus size={12} aria-hidden="true" />
            </button>
          </div>
          <span className="text-ink text-sm font-medium">
            {formatPrice(line.price * line.quantity, line.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
