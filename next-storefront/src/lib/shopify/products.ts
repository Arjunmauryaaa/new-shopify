import "server-only";
import { shopifyFetch } from "./client";
import {
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./queries";
import { adaptProduct, type ShopifyProduct } from "./types";
import type { Product } from "@/types/product";

interface ProductsQueryResponse {
  products: { edges: { node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean } };
}

interface ProductByHandleResponse {
  product: ShopifyProduct | null;
}

export async function getProducts(params?: { first?: number; query?: string }): Promise<Product[]> {
  const data = await shopifyFetch<ProductsQueryResponse>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: params?.first ?? 48, query: params?.query },
    tags: ["products"],
  });
  return data.products.edges.map((e) => adaptProduct(e.node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<ProductByHandleResponse>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  return data.product ? adaptProduct(data.product) : null;
}

export async function searchProducts(query: string, first = 8): Promise<Product[]> {
  if (!query.trim()) return [];
  const data = await shopifyFetch<ProductsQueryResponse>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first },
    cache: "no-store",
  });
  return data.products.edges.map((e) => adaptProduct(e.node));
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    tags: [`recommendations-${productId}`],
  });
  return data.productRecommendations.map(adaptProduct);
}
