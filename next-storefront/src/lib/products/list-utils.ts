import type { Product, ProductListParams, ProductListResult } from "@/types/product";

export function applyFilters(products: Product[], params?: ProductListParams): Product[] {
  const filters = params?.filters;
  if (!filters) return products;

  return products.filter((product) => {
    if (filters.colors?.length && !product.colors.some((c) => filters.colors!.includes(c.name))) {
      return false;
    }
    if (filters.sizes?.length && !product.sizes.some((s) => filters.sizes!.includes(s))) {
      return false;
    }
    if (typeof filters.priceMin === "number" && product.price < filters.priceMin) return false;
    if (typeof filters.priceMax === "number" && product.price > filters.priceMax) return false;
    if (filters.availability && product.inventory <= 0) return false;
    if (typeof filters.rating === "number" && product.rating < filters.rating) return false;
    return true;
  });
}

export function applySort(products: Product[], sort?: ProductListParams["sort"]): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case "price-low-high":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return sorted.sort((a, b) => b.price - a.price);
    case "best-selling":
      return sorted.sort(
        (a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviewCount - a.reviewCount
      );
    case "featured":
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function paginate(products: Product[], params?: ProductListParams): ProductListResult {
  const page = params?.page ?? 1;
  const perPage = params?.perPage ?? 12;
  const start = (page - 1) * perPage;
  const pageItems = products.slice(start, start + perPage);
  return {
    products: pageItems,
    total: products.length,
    page,
    perPage,
    hasNextPage: start + perPage < products.length,
  };
}

export function filterSortPaginate(products: Product[], params?: ProductListParams): ProductListResult {
  return paginate(applySort(applyFilters(products, params), params?.sort), params);
}
