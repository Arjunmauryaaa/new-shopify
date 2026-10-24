import { getCollectionByHandle, getCollections } from "@/lib/shopify/collections";
import {
  getProductByHandle,
  getProductRecommendations,
  getProducts,
  searchProducts,
} from "@/lib/shopify/products";
import type { Product, ProductListParams, ProductListResult } from "@/types/product";
import type { Collection } from "@/types/collection";
import type { ProductProvider } from "./product-provider";
import { filterSortPaginate } from "./list-utils";

const ALL_PRODUCTS_COLLECTION: Collection = {
  id: "shop-all",
  handle: "all",
  title: "All Products",
  description: "The complete VELORA range, in one place.",
  image: "",
};

/**
 * Talks to the real Shopify Storefront API. Every method mirrors
 * MockProductProvider's contract exactly, so swapping DATA_SOURCE never
 * requires touching a component.
 */
export class ShopifyProductProvider implements ProductProvider {
  async getAllProducts(): Promise<Product[]> {
    return getProducts();
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    return getProductByHandle(handle);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await getProducts({ query: "tag:featured" });
    return products.length ? products : (await getProducts({ first: 8 })).slice(0, 8);
  }

  async getBestsellers(): Promise<Product[]> {
    return getProducts({ query: "tag:bestseller" });
  }

  async getNewArrivals(): Promise<Product[]> {
    return getProducts({ query: "tag:new-arrival OR tag:new" });
  }

  async getRecommendedProducts(handle: string, limit = 4): Promise<Product[]> {
    const product = await this.getProductByHandle(handle);
    if (!product) return [];
    const recommendations = await getProductRecommendations(product.id);
    return recommendations.slice(0, limit);
  }

  async searchProducts(query: string, limit = 8): Promise<Product[]> {
    return searchProducts(query, limit);
  }

  async getCollections(): Promise<Collection[]> {
    return getCollections();
  }

  async getCollectionByHandle(
    handle: string,
    params?: ProductListParams
  ): Promise<{ collection: Collection | null; result: ProductListResult }> {
    // "all" (Shop All) has no guaranteed matching collection in every
    // Shopify store, so it's served from the full catalog instead of a
    // real collection query.
    if (handle === "all") {
      const products = await getProducts();
      return { collection: ALL_PRODUCTS_COLLECTION, result: filterSortPaginate(products, params) };
    }
    return getCollectionByHandle(handle, params);
  }
}
