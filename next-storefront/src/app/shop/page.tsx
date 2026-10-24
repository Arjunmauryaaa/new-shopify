import type { Metadata } from "next";
import { CollectionView } from "@/components/collections/CollectionView";
import type { CollectionSearchParams } from "@/lib/collection-params";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shop All",
  description: `Browse the complete ${SITE.name} collection. ${SITE.description}`,
  alternates: { canonical: `${SITE.url}/shop` },
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<CollectionSearchParams> }) {
  const resolvedSearchParams = await searchParams;
  return <CollectionView handle="all" basePath="/shop" searchParams={resolvedSearchParams} />;
}
