"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { PRICE_PRESETS, type PricePresetKey } from "@/lib/collection-params";
import type { ProductColor } from "@/types/product";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

interface FilterSortBarProps {
  availableColors: ProductColor[];
  availableSizes: string[];
  resultCount: number;
}

export function FilterSortBar({ availableColors, availableSizes, resultCount }: FilterSortBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentSort = searchParams.get("sort") ?? "featured";
  const currentColors = searchParams.get("color")?.split(",").filter(Boolean) ?? [];
  const currentSizes = searchParams.get("size")?.split(",").filter(Boolean) ?? [];
  const currentPrice = searchParams.get("price") ?? "";
  const currentAvailability = searchParams.get("availability") === "true";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleListParam(key: string, current: string[], value: string) {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateParam(key, next.length ? next.join(",") : null);
  }

  function clearFilters() {
    router.push(pathname, { scroll: false });
    setIsFilterOpen(false);
  }

  const activeFilterCount =
    currentColors.length + currentSizes.length + (currentPrice ? 1 : 0) + (currentAvailability ? 1 : 0);

  return (
    <div className="border-line flex items-center justify-between border-b px-5 py-4 sm:px-8 lg:px-12">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="text-ink flex items-center gap-2 text-xs font-medium tracking-wider uppercase"
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <span className="text-charcoal-soft hidden text-xs sm:inline">{resultCount} products</span>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-charcoal-soft text-xs">
          Sort
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value === "featured" ? null : e.target.value)}
          className="border-line-strong text-ink border bg-transparent px-2 py-1.5 text-xs"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <Drawer open={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filters">
        <div className="flex flex-col gap-8 px-6 py-4">
          {availableColors.length > 0 && (
            <div>
              <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleListParam("color", currentColors, color.name)}
                    aria-pressed={currentColors.includes(color.name)}
                    className={cn(
                      "flex items-center gap-2 border px-3 py-2 text-xs",
                      currentColors.includes(color.name) ? "border-ink" : "border-line-strong"
                    )}
                  >
                    <span
                      className="border-line-strong h-3 w-3 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && (
            <div>
              <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleListParam("size", currentSizes, size)}
                    aria-pressed={currentSizes.includes(size)}
                    className={cn(
                      "min-w-[2.75rem] border px-3 py-2 text-xs",
                      currentSizes.includes(size) ? "border-ink bg-ink text-ivory" : "border-line-strong"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">Price</p>
            <div className="mt-3 flex flex-col gap-2">
              {(Object.keys(PRICE_PRESETS) as PricePresetKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => updateParam("price", currentPrice === key ? null : key)}
                  aria-pressed={currentPrice === key}
                  className={cn(
                    "border px-3 py-2.5 text-left text-sm",
                    currentPrice === key ? "border-ink bg-ink text-ivory" : "border-line-strong"
                  )}
                >
                  {PRICE_PRESETS[key].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-ink flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={currentAvailability}
                onChange={(e) => updateParam("availability", e.target.checked ? "true" : null)}
                className="accent-ink h-4 w-4"
              />
              In stock only
            </label>
          </div>

          <div className="border-line flex gap-3 border-t pt-6">
            <Button variant="secondary" onClick={clearFilters} className="flex-1">
              Clear All
            </Button>
            <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
              Show {resultCount} Results
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
