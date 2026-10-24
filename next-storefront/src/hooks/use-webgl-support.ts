import { useSyncExternalStore } from "react";

let cachedSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

function subscribe() {
  // WebGL support cannot change over the life of a page, so there is
  // nothing to subscribe to — this satisfies useSyncExternalStore's contract.
  return () => {};
}

/**
 * True once WebGL has been confirmed available client-side. Always false
 * during SSR and the initial client render, matching the safe (non-3D)
 * fallback until hydration can verify actual support.
 */
export function useWebglSupport(): boolean {
  return useSyncExternalStore(subscribe, detectWebGL, () => false);
}
