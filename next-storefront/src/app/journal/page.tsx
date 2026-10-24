import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MOCK_JOURNAL } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Journal",
  description: `Notes on design, materials, and craft from the ${SITE.name} studio.`,
  alternates: { canonical: `${SITE.url}/journal` },
};

export default function JournalPage() {
  if (process.env.DATA_SOURCE === "shopify") notFound();

  return (
    <Container className="py-14 pb-24">
      <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">The Journal</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">Stories From the Studio</h1>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_JOURNAL.map((article, i) => (
          <Reveal key={article.id} delay={i * 0.05}>
            <Link href={`/journal/${article.slug}`} className="group block">
              <div className="bg-ivory-dim relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-charcoal-soft mt-4 text-xs tracking-wider uppercase">
                {article.category} &middot; {formatDate(article.date)}
              </p>
              <h2 className="font-display mt-2 text-xl leading-snug">{article.title}</h2>
              <p className="text-charcoal mt-2 text-sm leading-relaxed">{article.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
