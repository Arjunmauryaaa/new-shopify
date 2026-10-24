export interface AnalyticsProduct {
  id: string;
  title: string;
  handle: string;
  price: number;
  currency: string;
  category?: string;
  variant?: string;
  quantity?: number;
}

export type AnalyticsEvent =
  | { name: "page_view"; payload: { path: string } }
  | { name: "product_view"; payload: { product: AnalyticsProduct } }
  | { name: "search"; payload: { query: string; resultCount: number } }
  | { name: "add_to_cart"; payload: { product: AnalyticsProduct } }
  | { name: "remove_from_cart"; payload: { product: AnalyticsProduct } }
  | { name: "view_cart"; payload: { value: number; currency: string; itemCount: number } }
  | { name: "begin_checkout"; payload: { value: number; currency: string; itemCount: number } }
  | { name: "purchase"; payload: { orderId: string; value: number; currency: string } }
  | { name: "wishlist_add"; payload: { product: AnalyticsProduct } };

export type AnalyticsEventName = AnalyticsEvent["name"];
