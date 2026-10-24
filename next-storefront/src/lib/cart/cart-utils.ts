import type { Cart, CartLine } from "@/types/cart";
import type { Product, ProductVariant } from "@/types/product";

function computeTotals(lines: CartLine[]): Pick<Cart, "subtotal" | "totalQuantity"> {
  return {
    subtotal: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}

export function addLineToCart(cart: Cart, product: Product, variant: ProductVariant, quantity: number): Cart {
  const existing = cart.lines.find((line) => line.merchandiseId === variant.id);
  let lines: CartLine[];

  if (existing) {
    lines = cart.lines.map((line) =>
      line.merchandiseId === variant.id ? { ...line, quantity: line.quantity + quantity } : line
    );
  } else {
    const newLine: CartLine = {
      id: variant.id,
      merchandiseId: variant.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      currency: product.currency,
      quantity,
      image: variant.image ?? product.thumbnail,
      color: variant.color,
      size: variant.size,
    };
    lines = [...cart.lines, newLine];
  }

  return { ...cart, lines, ...computeTotals(lines) };
}

export function updateLineQuantity(cart: Cart, lineId: string, quantity: number): Cart {
  const lines =
    quantity <= 0
      ? cart.lines.filter((line) => line.id !== lineId)
      : cart.lines.map((line) => (line.id === lineId ? { ...line, quantity } : line));

  return { ...cart, lines, ...computeTotals(lines) };
}

export function removeLineFromCart(cart: Cart, lineId: string): Cart {
  const lines = cart.lines.filter((line) => line.id !== lineId);
  return { ...cart, lines, ...computeTotals(lines) };
}
