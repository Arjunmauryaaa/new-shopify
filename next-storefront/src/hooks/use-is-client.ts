import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/**
 * True once mounted in the browser, false during SSR and the initial
 * client render. Used to defer portal-based UI (createPortal into
 * document.body) until it's safe to reference the DOM.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
