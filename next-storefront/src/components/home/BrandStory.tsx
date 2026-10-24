import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory({ image }: { image: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden lg:order-2">
          <Image
            src={image}
            alt="Inside the VELORA studio"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal className="lg:order-1">
          <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Our Story</p>
          <h2 className="font-display mt-3 text-4xl leading-[1.05] sm:text-5xl">
            Considered design, built to move with you.
          </h2>
          <p className="text-charcoal mt-5 max-w-lg text-sm leading-relaxed sm:text-base">
            VELORA began with a simple frustration: nothing in the market felt built for a body that actually
            moves through its day. We started as a small studio testing sole geometries against real gait
            data, and grew into a considered range of footwear and apparel worn in more than forty countries —
            without ever compromising on the materials or craft that got us here.
          </p>
          <ButtonLink href="/about" variant="secondary" size="lg" className="mt-7">
            Read Our Story
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
