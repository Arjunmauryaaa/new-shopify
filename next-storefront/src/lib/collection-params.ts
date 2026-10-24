import type { Product, ProductColor, ProductListParams, SortKey } from "@/types/product";

export const PRICE_PRESETS = {
  "under-50": { min: 0, max: 50, label: "Under $50" },
  "50-100": { min: 50, max: 100, label: "$50 – $100" },
  "100-200": { min: 100, max: 200, label: "$100 – $200" },
  "200-plus": { min: 200, max: undefined, label: "$200+" },
} as const;

export type PricePresetKey = keyof typeof PRICE_PRESETS;

const VALID_SORT_KEYS: SortKey[] = ["featured", "newest", "price-low-high", "price-high-low", "best-selling"];

export type CollectionSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseCollectionParams(searchParams: CollectionSearchParams): ProductListParams {
  const sortParam = first(searchParams.sort);
  const sort: SortKey = VALID_SORT_KEYS.includes(sortParam as SortKey) ? (sortParam as SortKey) : "featured";

  const colors = first(searchParams.color)?.split(",").filter(Boolean);
  const sizes = first(searchParams.size)?.split(",").filter(Boolean);
  const pricePreset = first(searchParams.price) as PricePresetKey | undefined;
  const price = pricePreset && PRICE_PRESETS[pricePreset] ? PRICE_PRESETS[pricePreset] : undefined;
  const availability = first(searchParams.availability) === "true";
  const ratingParam = first(searchParams.rating);
  const rating = ratingParam ? Number(ratingParam) : undefined;
  const page = Number(first(searchParams.page)) || 1;

  return {
    sort,
    page,
    perPage: 24,
    filters: {
      colors: colors?.length ? colors : undefined,
      sizes: sizes?.length ? sizes : undefined,
      priceMin: price?.min,
      priceMax: price?.max,
      availability: availability || undefined,
      rating,
    },
  };
}

export function extractFacets(products: Product[]): { colors: ProductColor[]; sizes: string[] } {
  const colorMap = new Map<string, ProductColor>();
  const sizeSet = new Set<string>();

  for (const product of products) {
    for (const color of product.colors) colorMap.set(color.name, color);
    for (const size of product.sizes) sizeSet.add(size);
  }

  return {
    colors: Array.from(colorMap.values()),
    sizes: Array.from(sizeSet.values()),
  };
}
