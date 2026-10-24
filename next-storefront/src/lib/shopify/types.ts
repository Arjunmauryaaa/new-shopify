/**
 * Raw Shopify Storefront API GraphQL response shapes (only the fields we query),
 * plus adapters that map them onto our internal, provider-agnostic types.
 * No UI component should ever import from this file directly.
 */
import type { Product, ProductColor, ProductImage, ProductVariant } from "@/types/product";
import type { Collection } from "@/types/collection";
import type { Cart, CartLine } from "@/types/cart";

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
  sku: string | null;
}

export interface ShopifyProductOption {
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  availableForSale: boolean;
  options: ShopifyProductOption[];
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  ratingMetafield: { value: string } | null;
  ratingCountMetafield: { value: string } | null;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

export interface ShopifyCollectionWithProducts extends ShopifyCollection {
  products: {
    edges: { node: ShopifyProduct }[];
    pageInfo: { hasNextPage: boolean };
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: ShopifyMoney };
  merchandise: {
    id: string;
    title: string;
    image: ShopifyImage | null;
    price: ShopifyMoney;
    compareAtPrice: ShopifyMoney | null;
    selectedOptions: ShopifySelectedOption[];
    product: { handle: string; title: string };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney; totalAmount: ShopifyMoney };
  lines: { edges: { node: ShopifyCartLine }[] };
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

const COLOR_HEX_FALLBACK: Record<string, string> = {
  black: "#111112",
  white: "#F5F3EF",
  sand: "#C9B79C",
  stone: "#A8A399",
  charcoal: "#3A3A3C",
  olive: "#5C5A44",
  rust: "#A85C32",
  navy: "#1F2937",
  cream: "#EDE6D6",
  silver: "#C7C9CC",
};

function colorHex(name: string): string {
  return COLOR_HEX_FALLBACK[name.toLowerCase()] ?? "#8A8A8A";
}

/**
 * Reads Shopify's standard `reviews.rating` / `reviews.rating_count` product
 * metafields, kept in sync by any reviews app that follows Shopify's
 * standard product_review metaobject (e.g. Judge.me). Falls back to zero —
 * a genuinely unreviewed product — rather than fabricating a rating.
 */
function parseAggregateRating(
  ratingMetafield: { value: string } | null,
  ratingCountMetafield: { value: string } | null
): { rating: number; reviewCount: number } {
  let rating = 0;
  if (ratingMetafield?.value) {
    try {
      const parsed = JSON.parse(ratingMetafield.value) as { value?: string };
      rating = Number(parsed.value) || 0;
    } catch {
      rating = 0;
    }
  }
  const reviewCount = ratingCountMetafield?.value ? Number(ratingCountMetafield.value) || 0 : 0;
  return { rating, reviewCount };
}

export function adaptProduct(product: ShopifyProduct): Product {
  const images: ProductImage[] = product.images.edges.map(({ node }) => ({
    url: node.url,
    alt: node.altText ?? product.title,
    width: node.width ?? undefined,
    height: node.height ?? undefined,
  }));

  const variants: ProductVariant[] = product.variants.edges.map(({ node }) => {
    const colorOption = node.selectedOptions.find((o) => /colou?r/i.test(o.name));
    const sizeOption = node.selectedOptions.find((o) => /size/i.test(o.name));
    return {
      id: node.id,
      title: node.title,
      price: Number(node.price.amount),
      compareAtPrice: node.compareAtPrice ? Number(node.compareAtPrice.amount) : undefined,
      available: node.availableForSale,
      color: colorOption?.value,
      size: sizeOption?.value,
      sku: node.sku ?? undefined,
      image: node.image?.url,
    };
  });

  const colorOptionDef = product.options.find((o) => /colou?r/i.test(o.name));
  const sizeOptionDef = product.options.find((o) => /size/i.test(o.name));
  const colors: ProductColor[] = (colorOptionDef?.values ?? []).map((name) => ({
    name,
    hex: colorHex(name),
  }));

  const price = Number(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = Number(product.compareAtPriceRange.minVariantPrice.amount);
  const { rating, reviewCount } = parseAggregateRating(product.ratingMetafield, product.ratingCountMetafield);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
    currency: product.priceRange.minVariantPrice.currencyCode,
    images,
    thumbnail: images[0]?.url ?? "",
    category: product.productType || "Uncategorized",
    tags: product.tags,
    variants,
    colors,
    sizes: sizeOptionDef?.values ?? [],
    rating,
    reviewCount,
    featured: product.tags.includes("featured"),
    bestseller: product.tags.includes("bestseller"),
    newArrival: product.tags.includes("new-arrival") || product.tags.includes("new"),
    inventory: variants.reduce((sum, v) => sum + (v.available ? 1 : 0), 0),
  };
}

export function adaptCollection(collection: ShopifyCollection): Collection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: collection.image?.url ?? "",
  };
}

export function adaptCart(cart: ShopifyCart): Cart {
  const lines: CartLine[] = cart.lines.edges.map(({ node }) => ({
    id: node.id,
    merchandiseId: node.merchandise.id,
    productId: node.merchandise.product.handle,
    handle: node.merchandise.product.handle,
    title: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    price: Number(node.merchandise.price.amount),
    compareAtPrice: node.merchandise.compareAtPrice
      ? Number(node.merchandise.compareAtPrice.amount)
      : undefined,
    currency: node.merchandise.price.currencyCode,
    quantity: node.quantity,
    image: node.merchandise.image?.url ?? "",
    color: node.merchandise.selectedOptions.find((o) => /colou?r/i.test(o.name))?.value,
    size: node.merchandise.selectedOptions.find((o) => /size/i.test(o.name))?.value,
  }));

  return {
    id: cart.id,
    lines,
    subtotal: Number(cart.cost.subtotalAmount.amount),
    currency: cart.cost.subtotalAmount.currencyCode,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
  };
}
