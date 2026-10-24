import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductProvider } from "@/lib/products";
import { MOCK_REVIEWS } from "@/lib/data/reviews";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductRecommendations } from "@/components/products/ProductRecommendations";
import { RecentlyViewedSection } from "@/components/products/RecentlyViewedSection";
import { ProductViewTracker } from "@/components/products/ProductViewTracker";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProductProvider();
  const product = await provider.getProductByHandle(slug);

  if (!product) notFound();

  const url = `${SITE.url}/products/${product.handle}`;

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description: product.description,
      url,
      images: product.images.slice(0, 1).map((img) => ({ url: img.url, alt: product.title })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: product.images.slice(0, 1).map((img) => img.url),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const provider = await getProductProvider();
  const product = await provider.getProductByHandle(slug);

  if (!product) notFound();

  const [recommended, reviews] = await Promise.all([
    provider.getRecommendedProducts(slug, 4),
    Promise.resolve(
      process.env.DATA_SOURCE === "shopify" ? [] : MOCK_REVIEWS.filter((r) => r.productId === product.id)
    ),
  ]);

  const breadcrumbs = [
    { name: "Shop", url: "/shop" },
    { name: product.category, url: `/collections/${product.category.toLowerCase().replace(/\s+/g, "-")}` },
    { name: product.title, url: `/products/${product.handle}` },
  ];

  return (
    <div className="pb-24">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <ProductViewTracker product={product} />

      <Container className="py-6">
        <Breadcrumbs items={breadcrumbs} />
      </Container>

      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </Container>

      <Container className="mt-20 flex flex-col gap-20">
        <ProductReviews reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} />
        <ProductRecommendations products={recommended} />
        <RecentlyViewedSection recordHandle={product.handle} />
      </Container>
    </div>
  );
}
