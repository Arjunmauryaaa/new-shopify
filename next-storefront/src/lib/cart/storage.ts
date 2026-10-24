import { EMPTY_CART, type Cart } from "@/types/cart";

const STORAGE_KEY = "velora_cart_v1";

export function readLocalCart(): Cart {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed = JSON.parse(raw) as Cart;
    if (!parsed || !Array.isArray(parsed.lines)) return EMPTY_CART;
    return parsed;
  } catch {
    return EMPTY_CART;
  }
}

export function writeLocalCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can fail in private browsing / quota-exceeded scenarios.
    // The in-memory state still works for the current session.
  }
}
