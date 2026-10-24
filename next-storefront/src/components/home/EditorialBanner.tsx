import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

interface EditorialBannerProps {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  align?: "left" | "right";
}

export function EditorialBanner({
  image,
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  align = "left",
}: EditorialBannerProps) {
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="from-ink/70 via-ink/10 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div
        className={`relative flex h-full flex-col justify-end px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24 ${
          align === "right" ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <Reveal className="text-ivory max-w-lg">
          <p className="text-ivory/80 text-xs font-medium tracking-[0.25em] uppercase">{eyebrow}</p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
          <p className="text-ivory/85 mt-4 text-sm sm:text-base">{description}</p>
          <ButtonLink href={ctaHref} variant="outline-light" size="lg" className="mt-7">
            {ctaLabel}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
