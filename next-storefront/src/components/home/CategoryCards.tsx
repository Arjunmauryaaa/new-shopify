import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface Category {
  title: string;
  href: string;
  image: string;
}

export function CategoryCards({ categories }: { categories: Category[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10">
          <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">
            Shop by Category
          </p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">Find Your Fit</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.href} delay={i * 0.08}>
              <Link
                href={category.href}
                className="group bg-ivory-dim relative block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-105"
                />
                <div className="from-ink/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                <span className="font-display text-ivory absolute bottom-5 left-5 text-xl">
                  {category.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
