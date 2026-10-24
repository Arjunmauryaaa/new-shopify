"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { EMPTY_CART, type Cart } from "@/types/cart";
import type { Product, ProductVariant } from "@/types/product";
import { readLocalCart, writeLocalCart } from "@/lib/cart/storage";
import { addLineToCart, removeLineFromCart, updateLineQuantity } from "@/lib/cart/cart-utils";
import {
  addCartLineAction,
  clearCartAction,
  fetchServerCart,
  removeCartLineAction,
  updateCartLineAction,
} from "@/lib/shopify/actions";
import { track } from "@/lib/analytics";

export type DataSource = "mock" | "shopify";

interface CartContextValue {
  cart: Cart;
  dataSource: DataSource;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    product: Product,
    variant: ProductVariant,
    quantity?: number,
    options?: { openDrawer?: boolean }
  ) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children, dataSource }: { children: ReactNode; dataSource: DataSource }) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (dataSource === "mock") {
      // Intentional: localStorage is only readable client-side, so the mock
      // cart is hydrated one tick after the server-rendered empty state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(readLocalCart());
      hydrated.current = true;
    } else {
      fetchServerCart().then((serverCart) => {
        if (!cancelled) {
          setCart(serverCart);
          hydrated.current = true;
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [dataSource]);

  useEffect(() => {
    if (dataSource === "mock" && hydrated.current) {
      writeLocalCart(cart);
    }
  }, [cart, dataSource]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (product: Product, variant: ProductVariant, quantity = 1, options?: { openDrawer?: boolean }) => {
      const shouldOpenDrawer = options?.openDrawer ?? true;
      track({
        name: "add_to_cart",
        payload: {
          product: {
            id: product.id,
            title: product.title,
            handle: product.handle,
            price: variant.price,
            currency: product.currency,
            category: product.category,
            variant: variant.title,
            quantity,
          },
        },
      });

      if (dataSource === "mock") {
        setCart((prev) => addLineToCart(prev, product, variant, quantity));
        if (shouldOpenDrawer) openCart();
        return;
      }

      setIsLoading(true);
      try {
        const updated = await addCartLineAction(variant.id, quantity);
        setCart(updated);
        if (shouldOpenDrawer) openCart();
      } finally {
        setIsLoading(false);
      }
    },
    [dataSource, openCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (dataSource === "mock") {
        setCart((prev) => updateLineQuantity(prev, lineId, quantity));
        return;
      }
      setIsLoading(true);
      try {
        const updated = await updateCartLineAction(lineId, quantity);
        setCart(updated);
      } finally {
        setIsLoading(false);
      }
    },
    [dataSource]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      const line = cart.lines.find((l) => l.id === lineId);
      if (line) {
        track({
          name: "remove_from_cart",
          payload: {
            product: {
              id: line.productId,
              title: line.title,
              handle: line.handle,
              price: line.price,
              currency: line.currency,
              variant: line.variantTitle,
              quantity: line.quantity,
            },
          },
        });
      }

      if (dataSource === "mock") {
        setCart((prev) => removeLineFromCart(prev, lineId));
        return;
      }
      setIsLoading(true);
      try {
        const updated = await removeCartLineAction(lineId);
        setCart(updated);
      } finally {
        setIsLoading(false);
      }
    },
    [cart.lines, dataSource]
  );

  const clearCart = useCallback(async () => {
    if (dataSource === "mock") {
      setCart(EMPTY_CART);
      return;
    }
    setIsLoading(true);
    try {
      const updated = await clearCartAction();
      setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }, [dataSource]);

  return (
    <CartContext.Provider
      value={{
        cart,
        dataSource,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
