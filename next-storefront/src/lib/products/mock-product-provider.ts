import { MOCK_PRODUCTS } from "@/lib/data/products";
import { MOCK_COLLECTIONS } from "@/lib/data/collections";
import type { Product, ProductListParams, ProductListResult } from "@/types/product";
import type { Collection } from "@/types/collection";
import type { ProductProvider } from "./product-provider";
import { filterSortPaginate } from "./list-utils";

const FOOTWEAR_CATEGORIES = ["Sneakers", "Running Shoes", "Casual Shoes"];

const ALL_PRODUCTS_COLLECTION: Collection = {
  id: "gid://velora/Collection/all",
  handle: "all",
  title: "All Products",
  description: "The complete VELORA range, in one place.",
  image: MOCK_PRODUCTS[0]?.thumbnail ?? "",
};

function matchesCollection(product: Product, handle: string): boolean {
  switch (handle) {
    case "all":
      return true;
    case "new-arrivals":
      return product.newArrival;
    case "best-sellers":
      return product.bestseller;
    case "men":
    case "women":
    case "unisex":
      return product.tags.includes(handle);
    case "outerwear":
      return product.category === "Jackets";
    case "accessories":
      return product.category === "Accessories";
    case "shoes":
      return FOOTWEAR_CATEGORIES.includes(product.category);
    default:
      return false;
  }
}

export class MockProductProvider implements ProductProvider {
  async getAllProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS;
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS.filter((p) => p.featured);
  }

  async getBestsellers(): Promise<Product[]> {
    return MOCK_PRODUCTS.filter((p) => p.bestseller);
  }

  async getNewArrivals(): Promise<Product[]> {
    return MOCK_PRODUCTS.filter((p) => p.newArrival);
  }

  async getRecommendedProducts(handle: string, limit = 4): Promise<Product[]> {
    const product = await this.getProductByHandle(handle);
    if (!product) return MOCK_PRODUCTS.slice(0, limit);
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.handle !== handle &&
        (p.category === product.category || p.tags.some((t) => product.tags.includes(t)))
    ).slice(0, limit);
  }

  async searchProducts(query: string, limit = 8): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, limit);
  }

  async getCollections(): Promise<Collection[]> {
    return MOCK_COLLECTIONS.map((c) => ({
      ...c,
      productCount: MOCK_PRODUCTS.filter((p) => matchesCollection(p, c.handle)).length,
    }));
  }

  async getCollectionByHandle(
    handle: string,
    params?: ProductListParams
  ): Promise<{ collection: Collection | null; result: ProductListResult }> {
    const collection =
      handle === "all"
        ? ALL_PRODUCTS_COLLECTION
        : (MOCK_COLLECTIONS.find((c) => c.handle === handle) ?? null);
    const matched = MOCK_PRODUCTS.filter((p) => matchesCollection(p, handle));
    return {
      collection: collection ? { ...collection, productCount: matched.length } : null,
      result: filterSortPaginate(matched, params),
    };
  }
}
