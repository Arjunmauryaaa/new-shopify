import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductProvider } from "@/lib/products";
import { SITE } from "@/lib/constants";
import { CollectionView } from "@/components/collections/CollectionView";
import type { CollectionSearchParams } from "@/lib/collection-params";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<CollectionSearchParams>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProductProvider();
  const { collection } = await provider.getCollectionByHandle(slug);

  if (!collection) notFound();

  const url = `${SITE.url}/collections/${collection.handle}`;
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: url },
    openGraph: { title: collection.title, description: collection.description, url },
  };
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <CollectionView handle={slug} basePath={`/collections/${slug}`} searchParams={resolvedSearchParams} />
  );
}
