import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-charcoal-soft flex items-center gap-1.5 text-xs">
      {items.map((item, i) => (
        <span key={item.url} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
          {i === items.length - 1 ? (
            <span className="text-ink" aria-current="page">
              {item.name}
            </span>
          ) : (
            <Link href={item.url} className="hover:text-ink">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
