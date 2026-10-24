"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUI } from "@/components/providers/UIProvider";
import { useDebounce } from "@/hooks/use-debounce";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useIsClient } from "@/hooks/use-is-client";
import { formatPrice } from "@/lib/utils";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/product";

const TRENDING = ["Sneakers", "Running", "New Arrivals", "Hoodies", "Accessories"];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const mounted = useIsClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useLockBodyScroll(isSearchOpen);

  useEffect(() => {
    if (isSearchOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeout);
    }
    // Intentional: clear the previous search each time the overlay closes,
    // so reopening it always starts from a blank state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setResults([]);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setIsLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        setResults(data.products);
        track({ name: "search", payload: { query: debouncedQuery, resultCount: data.products.length } });
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!isSearchOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  function goToResultsPage() {
    if (!query.trim()) return;
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    goToResultsPage();
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="bg-ivory fixed inset-0 z-[90] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="border-line border-b">
            <div className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-6 sm:px-8">
              <SearchIcon size={22} className="text-charcoal-soft shrink-0" aria-hidden="true" />
              <form onSubmit={handleSubmit} className="flex-1">
                <label htmlFor="search-input" className="sr-only">
                  Search products
                </label>
                <input
                  id="search-input"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="font-display placeholder:text-charcoal-soft w-full bg-transparent text-2xl focus:outline-none sm:text-3xl"
                />
              </form>
              <button
                onClick={closeSearch}
                aria-label="Close search"
                className="shrink-0 rounded-full p-2 transition-opacity hover:opacity-60"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-5 py-8 sm:px-8">
            {!query.trim() && (
              <div>
                <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">Trending</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="border-line-strong text-ink hover:border-ink border px-4 py-2 text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && (
              <div>
                <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">
                  {isLoading ? "Searching..." : `${results.length} result${results.length === 1 ? "" : "s"}`}
                </p>

                {!isLoading && results.length === 0 && (
                  <div className="mt-10 text-center">
                    <p className="font-display text-xl">No products found.</p>
                    <p className="text-charcoal mt-1 text-sm">Try another search.</p>
                  </div>
                )}

                <div className="divide-line mt-4 flex flex-col divide-y">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 py-3"
                    >
                      <div className="bg-ivory-dim relative h-16 w-14 shrink-0 overflow-hidden">
                        <Image src={product.thumbnail} alt="" fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-ink text-sm font-medium">{product.title}</p>
                        <p className="text-charcoal-soft text-xs">{product.category}</p>
                      </div>
                      <span className="text-ink text-sm">{formatPrice(product.price, product.currency)}</span>
                    </Link>
                  ))}
                </div>

                {results.length > 0 && (
                  <button
                    onClick={goToResultsPage}
                    className="mt-6 text-sm font-medium tracking-wide uppercase underline underline-offset-4"
                  >
                    View all results
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
