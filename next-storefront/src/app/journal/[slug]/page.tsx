import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_JOURNAL } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return process.env.DATA_SOURCE === "shopify" ? [] : MOCK_JOURNAL.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  if (process.env.DATA_SOURCE === "shopify") return { title: "Article Not Found", robots: { index: false } };
  const { slug } = await params;
  const article = MOCK_JOURNAL.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const url = `${SITE.url}/journal/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      images: [{ url: article.image }],
    },
  };
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  if (process.env.DATA_SOURCE === "shopify") notFound();
  const { slug } = await params;
  const article = MOCK_JOURNAL.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="pb-24">
      <Container className="max-w-3xl py-14">
        <p className="text-charcoal-soft text-xs tracking-wider uppercase">
          {article.category} &middot; {formatDate(article.date)} &middot; {article.readTime}
        </p>
        <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">{article.title}</h1>
      </Container>

      <Container className="max-w-4xl">
        <div className="bg-ivory-dim relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      <Container className="max-w-3xl py-12">
        <div className="text-charcoal flex flex-col gap-5 text-sm leading-relaxed sm:text-base">
          {article.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
