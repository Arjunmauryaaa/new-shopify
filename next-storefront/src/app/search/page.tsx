import type { Metadata } from "next";
import { getProductProvider } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const provider = await getProductProvider();
  const results = q.trim() ? await provider.searchProducts(q, 48) : [];

  return (
    <Container className="py-14 pb-24">
      <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Search Results</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">{q ? `“${q}”` : "Search"}</h1>
      <p className="text-charcoal-soft mt-2 text-sm">
        {q
          ? `${results.length} result${results.length === 1 ? "" : "s"}`
          : "Enter a search term to get started."}
      </p>

      <div className="mt-10">
        {q && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-2xl">No products found.</p>
            <p className="text-charcoal mt-2 text-sm">Try another search.</p>
          </div>
        )}
        <ProductGrid products={results} columns={4} priorityCount={4} />
      </div>
    </Container>
  );
}
