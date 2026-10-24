import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductProvider } from "@/lib/products";
import { extractFacets, parseCollectionParams, type CollectionSearchParams } from "@/lib/collection-params";
import { collectionJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/ui/Container";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { FilterSortBar } from "@/components/collections/FilterSortBar";
import { Pagination } from "@/components/collections/Pagination";
import { ProductGrid } from "@/components/products/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";

export async function CollectionView({
  handle,
  basePath,
  searchParams,
}: {
  handle: string;
  basePath: string;
  searchParams: CollectionSearchParams;
}) {
  const listParams = parseCollectionParams(searchParams);

  const provider = await getProductProvider();
  const [{ collection, result }, { result: unfilteredResult }] = await Promise.all([
    provider.getCollectionByHandle(handle, listParams),
    provider.getCollectionByHandle(handle, { perPage: 500 }),
  ]);

  if (!collection) notFound();

  const facets = extractFacets(unfilteredResult.products);

  return (
    <div className="pb-24">
      <JsonLd data={collectionJsonLd(collection.title, collection.description, basePath)} />

      <CollectionHero
        title={collection.title}
        description={collection.description}
        image={collection.image}
        productCount={unfilteredResult.total}
      />

      <Suspense>
        <FilterSortBar
          availableColors={facets.colors}
          availableSizes={facets.sizes}
          resultCount={result.total}
        />
      </Suspense>

      <Container className="mt-10">
        {result.products.length > 0 ? (
          <ProductGrid products={result.products} columns={4} priorityCount={4} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-2xl">No products found.</p>
            <p className="text-charcoal mt-2 text-sm">Try adjusting your filters.</p>
          </div>
        )}

        <Pagination
          page={result.page}
          hasNextPage={result.hasNextPage}
          basePath={basePath}
          searchParams={searchParams}
        />
      </Container>
    </div>
  );
}
