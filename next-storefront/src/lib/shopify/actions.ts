"use server";

import { cookies } from "next/headers";
import { EMPTY_CART, type Cart } from "@/types/cart";
import { addCartLines, createCart, getCart, removeCartLines, updateCartLines } from "./cart";

const CART_COOKIE = "velora_cart_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function getCartId(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value;
}

async function persistCartId(id: string): Promise<void> {
  const store = await cookies();
  store.set(CART_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function fetchServerCart(): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) return EMPTY_CART;
  try {
    const cart = await getCart(cartId);
    return cart ?? EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

export async function addCartLineAction(merchandiseId: string, quantity: number): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) {
    const cart = await createCart([{ merchandiseId, quantity }]);
    if (cart.id) await persistCartId(cart.id);
    return cart;
  }
  return addCartLines(cartId, [{ merchandiseId, quantity }]);
}

export async function updateCartLineAction(lineId: string, quantity: number): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) return EMPTY_CART;
  if (quantity <= 0) return removeCartLines(cartId, [lineId]);
  return updateCartLines(cartId, [{ id: lineId, quantity }]);
}

export async function removeCartLineAction(lineId: string): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) return EMPTY_CART;
  return removeCartLines(cartId, [lineId]);
}

export async function clearCartAction(): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) return EMPTY_CART;
  const current = await getCart(cartId);
  if (!current || current.lines.length === 0) return current ?? EMPTY_CART;
  return removeCartLines(
    cartId,
    current.lines.map((line) => line.id)
  );
}
