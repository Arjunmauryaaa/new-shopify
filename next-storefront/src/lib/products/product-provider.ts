import type { Product, ProductListParams, ProductListResult } from "@/types/product";
import type { Collection } from "@/types/collection";

/**
 * The UI only ever depends on this interface. Whether products come from
 * in-memory mock data or the live Shopify Storefront API is decided once,
 * at the factory in `./index.ts`, based on the DATA_SOURCE env var.
 */
export interface ProductProvider {
  getAllProducts(): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getBestsellers(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getRecommendedProducts(handle: string, limit?: number): Promise<Product[]>;
  searchProducts(query: string, limit?: number): Promise<Product[]>;
  getCollections(): Promise<Collection[]>;
  getCollectionByHandle(
    handle: string,
    params?: ProductListParams
  ): Promise<{ collection: Collection | null; result: ProductListResult }>;
}
