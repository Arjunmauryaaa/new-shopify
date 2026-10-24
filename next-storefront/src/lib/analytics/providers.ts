import type { AnalyticsEvent } from "./events";

export interface AnalyticsProvider {
  name: string;
  track: (event: AnalyticsEvent) => void;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA_EVENT_MAP: Partial<Record<AnalyticsEvent["name"], string>> = {
  page_view: "page_view",
  product_view: "view_item",
  search: "search",
  add_to_cart: "add_to_cart",
  remove_from_cart: "remove_from_cart",
  view_cart: "view_cart",
  begin_checkout: "begin_checkout",
  purchase: "purchase",
  wishlist_add: "add_to_wishlist",
};

export const googleAnalyticsProvider: AnalyticsProvider = {
  name: "google-analytics",
  track(event) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    const gaEventName = GA_EVENT_MAP[event.name] ?? event.name;
    window.gtag("event", gaEventName, flattenPayload(event));
  },
};

const META_EVENT_MAP: Partial<Record<AnalyticsEvent["name"], string>> = {
  page_view: "PageView",
  product_view: "ViewContent",
  search: "Search",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  wishlist_add: "AddToWishlist",
};

export const metaPixelProvider: AnalyticsProvider = {
  name: "meta-pixel",
  track(event) {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    const metaEventName = META_EVENT_MAP[event.name];
    if (!metaEventName) return;
    window.fbq("track", metaEventName, flattenPayload(event));
  },
};

function flattenPayload(event: AnalyticsEvent): Record<string, unknown> {
  const { product, ...rest } = event.payload as Record<string, unknown>;
  if (product && typeof product === "object") {
    return { ...rest, ...(product as Record<string, unknown>) };
  }
  return rest;
}
