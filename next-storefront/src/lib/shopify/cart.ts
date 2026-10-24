import "server-only";
import { shopifyFetch } from "./client";
import { GET_CART_QUERY } from "./queries";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from "./mutations";
import { adaptCart, type ShopifyCart, type ShopifyUserError } from "./types";
import type { Cart } from "@/types/cart";

function assertNoErrors(userErrors: ShopifyUserError[]) {
  if (userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart; userErrors: ShopifyUserError[] } }>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    cache: "no-store",
  });
  assertNoErrors(data.cartCreate.userErrors);
  return adaptCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: ShopifyUserError[] } }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  assertNoErrors(data.cartLinesAdd.userErrors);
  return adaptCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: ShopifyUserError[] } }>(
    {
      query: CART_LINES_UPDATE_MUTATION,
      variables: { cartId, lines },
      cache: "no-store",
    }
  );
  assertNoErrors(data.cartLinesUpdate.userErrors);
  return adaptCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart; userErrors: ShopifyUserError[] } }>(
    {
      query: CART_LINES_REMOVE_MUTATION,
      variables: { cartId, lineIds },
      cache: "no-store",
    }
  );
  assertNoErrors(data.cartLinesRemove.userErrors);
  return adaptCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? adaptCart(data.cart) : null;
}
