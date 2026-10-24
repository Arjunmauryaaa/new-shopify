import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: SITE.description,
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">About {SITE.name}</p>
      <h1 className="font-display mt-4 max-w-3xl text-5xl leading-tight sm:text-6xl">{SITE.tagline}</h1>
      <p className="text-charcoal mt-6 max-w-2xl text-base leading-relaxed">{SITE.description}</p>
      <ButtonLink href="/shop" size="lg" className="mt-9">
        Explore the collection
      </ButtonLink>
    </Container>
  );
}
