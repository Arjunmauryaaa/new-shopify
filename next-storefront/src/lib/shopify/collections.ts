import "server-only";
import { shopifyFetch } from "./client";
import { GET_COLLECTION_BY_HANDLE_QUERY, GET_COLLECTIONS_QUERY } from "./queries";
import {
  adaptCollection,
  adaptProduct,
  type ShopifyCollection,
  type ShopifyCollectionWithProducts,
} from "./types";
import type { Collection } from "@/types/collection";
import type { Product, ProductListParams, ProductListResult } from "@/types/product";

interface CollectionsQueryResponse {
  collections: { edges: { node: ShopifyCollection }[] };
}

interface CollectionByHandleResponse {
  collection: ShopifyCollectionWithProducts | null;
}

const SORT_KEY_MAP: Record<NonNullable<ProductListParams["sort"]>, { sortKey: string; reverse: boolean }> = {
  featured: { sortKey: "MANUAL", reverse: false },
  newest: { sortKey: "CREATED", reverse: true },
  "price-low-high": { sortKey: "PRICE", reverse: false },
  "price-high-low": { sortKey: "PRICE", reverse: true },
  "best-selling": { sortKey: "BEST_SELLING", reverse: false },
};

export async function getCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<CollectionsQueryResponse>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 24 },
    tags: ["collections"],
  });
  return data.collections.edges.map((e) => adaptCollection(e.node));
}

function buildShopifyFilters(filters?: ProductListParams["filters"]) {
  if (!filters) return undefined;
  const shopifyFilters: Record<string, unknown>[] = [];
  filters.colors?.forEach((color) => shopifyFilters.push({ variantOption: { name: "Color", value: color } }));
  filters.sizes?.forEach((size) => shopifyFilters.push({ variantOption: { name: "Size", value: size } }));
  if (filters.availability) shopifyFilters.push({ available: true });
  if (typeof filters.priceMin === "number" || typeof filters.priceMax === "number") {
    shopifyFilters.push({
      price: { min: filters.priceMin ?? 0, max: filters.priceMax ?? 100000 },
    });
  }
  return shopifyFilters.length ? shopifyFilters : undefined;
}

export async function getCollectionByHandle(
  handle: string,
  params?: ProductListParams
): Promise<{ collection: Collection | null; result: ProductListResult }> {
  const { sortKey, reverse } = SORT_KEY_MAP[params?.sort ?? "featured"];
  const perPage = params?.perPage ?? 24;

  const data = await shopifyFetch<CollectionByHandleResponse>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: {
      handle,
      first: perPage,
      sortKey,
      reverse,
      filters: buildShopifyFilters(params?.filters),
    },
    tags: [`collection-${handle}`],
  });

  if (!data.collection) {
    return {
      collection: null,
      result: { products: [], total: 0, page: 1, perPage, hasNextPage: false },
    };
  }

  const products: Product[] = data.collection.products.edges.map((e) => adaptProduct(e.node));

  return {
    collection: adaptCollection(data.collection),
    result: {
      products,
      total: products.length,
      page: params?.page ?? 1,
      perPage,
      hasNextPage: data.collection.products.pageInfo.hasNextPage,
    },
  };
}
