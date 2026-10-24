import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  href: string;
  tone?: "ivory" | "dim";
}

export function ProductSection({
  eyebrow,
  title,
  description,
  products,
  href,
  tone = "ivory",
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={tone === "dim" ? "bg-ivory-dim py-20 sm:py-28" : "py-20 sm:py-28"}>
      <Container>
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">{eyebrow}</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">{title}</h2>
            {description && <p className="text-charcoal mt-3 max-w-md text-sm">{description}</p>}
          </div>
          <Link
            href={href}
            className="text-ink inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase underline underline-offset-4"
          >
            View All <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>

        <ProductGrid products={products.slice(0, 8)} columns={4} />
      </Container>
    </section>
  );
}
