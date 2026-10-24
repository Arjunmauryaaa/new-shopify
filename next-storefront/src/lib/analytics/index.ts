import type { AnalyticsEvent } from "./events";
import { googleAnalyticsProvider, metaPixelProvider, type AnalyticsProvider } from "./providers";

export type { AnalyticsEvent, AnalyticsProduct } from "./events";

const providers: AnalyticsProvider[] = [googleAnalyticsProvider, metaPixelProvider];

/**
 * Fire-and-forget analytics dispatch. Safe to call unconditionally —
 * providers no-op until their script has loaded (see AnalyticsScripts),
 * which only happens when the matching env var is set.
 */
export function track(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    console.debug("[analytics]", event.name, event.payload);
  }
  for (const provider of providers) {
    try {
      provider.track(event);
    } catch {
      // A misbehaving analytics script should never break the UI.
    }
  }
}
