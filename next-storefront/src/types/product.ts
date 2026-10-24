export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  color?: string;
  size?: string;
  sku?: string;
  image?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: ProductImage[];
  thumbnail: string;
  category: string;
  tags: string[];
  variants: ProductVariant[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  inventory: number;
  materials?: string[];
  careInstructions?: string[];
  shippingNote?: string;
  returnsNote?: string;
}

export type SortKey = "featured" | "newest" | "price-low-high" | "price-high-low" | "best-selling";

export interface ProductFilters {
  colors?: string[];
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  availability?: boolean;
  rating?: number;
}

export interface ProductListParams {
  sort?: SortKey;
  filters?: ProductFilters;
  page?: number;
  perPage?: number;
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
}
