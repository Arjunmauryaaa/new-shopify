import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  hasNextPage: boolean;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

function hrefForPage(basePath: string, searchParams: PaginationProps["searchParams"], page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;
    params.set(key, Array.isArray(value) ? value[0] : value);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({ page, hasNextPage, basePath, searchParams }: PaginationProps) {
  if (page === 1 && !hasNextPage) return null;

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link
          href={hrefForPage(basePath, searchParams, page - 1)}
          className="text-ink flex items-center gap-1 text-xs font-medium tracking-wider uppercase"
        >
          <ChevronLeft size={14} aria-hidden="true" /> Previous
        </Link>
      ) : (
        <span className="text-charcoal-soft/40 flex items-center gap-1 text-xs tracking-wider uppercase">
          <ChevronLeft size={14} aria-hidden="true" /> Previous
        </span>
      )}

      <span className="text-charcoal-soft text-xs">Page {page}</span>

      {hasNextPage ? (
        <Link
          href={hrefForPage(basePath, searchParams, page + 1)}
          className="text-ink flex items-center gap-1 text-xs font-medium tracking-wider uppercase"
        >
          Next <ChevronRight size={14} aria-hidden="true" />
        </Link>
      ) : (
        <span className="text-charcoal-soft/40 flex items-center gap-1 text-xs tracking-wider uppercase">
          Next <ChevronRight size={14} aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
