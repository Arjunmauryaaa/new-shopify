import { getProductProvider } from "@/lib/products";
import { MOCK_TESTIMONIALS } from "@/lib/data/testimonials";
import { IMAGE_POOL, unsplash } from "@/lib/images";
import { SITE } from "@/lib/constants";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { ProductSection } from "@/components/home/ProductSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default async function HomePage() {
  const provider = await getProductProvider();
  const [featured, bestsellers, newArrivals, collections] = await Promise.all([
    provider.getFeaturedProducts(),
    provider.getBestsellers(),
    provider.getNewArrivals(),
    provider.getCollections(),
  ]);

  const categories = collections
    .filter((collection) => collection.image)
    .slice(0, 4)
    .map((collection) => ({
      title: collection.title,
      href: `/collections/${collection.handle}`,
      image: collection.image,
    }));
  const heroImage = featured[0]?.images[0]?.url;
  const showHero = process.env.DATA_SOURCE !== "shopify" || Boolean(heroImage);

  return (
    <>
      {showHero && (
        <HeroSection
          fallbackImage={heroImage || unsplash(IMAGE_POOL.editorial[9], 2400)}
          fallbackAlt={`${SITE.name} featured collection`}
        />
      )}

      <FeaturedCollection products={featured} />

      <ProductSection
        eyebrow="Best Sellers"
        title="Community Favorites"
        description="Explore popular pieces from the collection."
        products={bestsellers}
        href="/shop"
        tone="dim"
      />

      <ProductSection
        eyebrow="Just In"
        title="New Arrivals"
        description="Fresh off the line — the latest additions to the range."
        products={newArrivals}
        href="/shop"
      />

      {categories.length > 0 && <CategoryCards categories={categories} />}

      {process.env.DATA_SOURCE !== "shopify" && <CustomerReviews testimonials={MOCK_TESTIMONIALS} />}

      <NewsletterSection />
    </>
  );
}
