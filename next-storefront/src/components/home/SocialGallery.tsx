import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/SocialIcons";

export function SocialGallery({ images }: { images: string[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Community</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">@velora</h2>
          </div>
          <a
            href="#"
            className="text-ink hidden items-center gap-2 text-xs font-medium tracking-wider uppercase underline underline-offset-4 sm:inline-flex"
          >
            <InstagramIcon size={14} aria-hidden="true" /> Follow Along
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((image, i) => (
            <div key={image + i} className="group bg-ivory-dim relative aspect-square overflow-hidden">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
