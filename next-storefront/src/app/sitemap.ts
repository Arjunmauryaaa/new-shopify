import type { MetadataRoute } from "next";
import { getProductProvider } from "@/lib/products";
import { MOCK_JOURNAL } from "@/lib/data/journal";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const provider = await getProductProvider();
  const [products, collections] = await Promise.all([provider.getAllProducts(), provider.getCollections()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...(process.env.DATA_SOURCE === "shopify"
      ? []
      : [{ url: `${SITE.url}/journal`, changeFrequency: "weekly" as const, priority: 0.6 }]),
    { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE.url}/products/${product.handle}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${SITE.url}/collections/${collection.handle}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = (process.env.DATA_SOURCE === "shopify" ? [] : MOCK_JOURNAL).map((article) => ({
    url: `${SITE.url}/journal/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...journalRoutes];
}
