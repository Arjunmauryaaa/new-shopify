import "server-only";
import type { ProductProvider } from "./product-provider";

export type { ProductProvider } from "./product-provider";

let cachedProvider: ProductProvider | null = null;

/**
 * Single switch point for the whole app: DATA_SOURCE=shopify uses the live
 * Storefront API. Local development can use mock data, but production must
 * explicitly opt into Shopify so demo products can never be sold by mistake.
 * Server-side only: Client Components should call a Server Action or Server
 * Component, never this directly.
 */
export async function getProductProvider(): Promise<ProductProvider> {
  if (cachedProvider) return cachedProvider;

  const source = process.env.DATA_SOURCE;

  if (source === "shopify") {
    if (process.env.NODE_ENV === "production") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (!siteUrl || new URL(siteUrl).hostname === "localhost") {
        throw new Error("Set NEXT_PUBLIC_SITE_URL to your public storefront domain before deploying.");
      }
    }
    const { ShopifyProductProvider } = await import("./shopify-product-provider");
    cachedProvider = new ShopifyProductProvider();
  } else {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        'Live storefront is not configured. Set DATA_SOURCE="shopify" and add the Shopify Storefront credentials before deploying.'
      );
    }
    const { MockProductProvider } = await import("./mock-product-provider");
    cachedProvider = new MockProductProvider();
  }

  return cachedProvider;
}
