"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedCollection({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  function onPointerDown(event: React.PointerEvent) {
    if (!trackRef.current) return;
    dragState.current = {
      isDown: true,
      startX: event.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!dragState.current.isDown || !trackRef.current) return;
    const delta = event.clientX - dragState.current.startX;
    trackRef.current.scrollLeft = dragState.current.scrollLeft - delta;
  }

  function endDrag() {
    dragState.current.isDown = false;
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Featured</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">The New Collection</h2>
            <p className="text-charcoal mt-3 max-w-md text-sm">
              Explore pieces designed for movement, comfort, and everyday expression.
            </p>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="text-ink inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase underline underline-offset-4"
          >
            Explore Collection <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="hide-scrollbar flex cursor-grab gap-4 overflow-x-auto px-5 pb-4 active:cursor-grabbing sm:gap-6 sm:px-8 lg:px-12"
        style={{ scrollSnapType: "x proximity" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[68vw] shrink-0 sm:w-[36vw] lg:w-[23vw]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
