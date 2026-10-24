export interface CartLine {
  id: string;
  merchandiseId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface Cart {
  id: string | null;
  lines: CartLine[];
  subtotal: number;
  currency: string;
  checkoutUrl: string | null;
  totalQuantity: number;
}

export const EMPTY_CART: Cart = {
  id: null,
  lines: [],
  subtotal: 0,
  currency: "USD",
  checkoutUrl: null,
  totalQuantity: 0,
};
