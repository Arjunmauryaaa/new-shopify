const STORAGE_KEY = "velora_recently_viewed_v1";
const MAX_ITEMS = 8;

export function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function recordRecentlyViewed(handle: string): string[] {
  const current = readRecentlyViewed().filter((h) => h !== handle);
  const next = [handle, ...current].slice(0, MAX_ITEMS);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures (private browsing, quota exceeded).
    }
  }
  return next;
}
