"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Container } from "@/components/ui/Container";

export interface CraftPanel {
  title: string;
  body: string;
  image: string;
}

function PanelContent({ panel }: { panel: CraftPanel }) {
  return (
    <div className="grid h-full w-full grid-rows-[1fr_auto] gap-8 py-16 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-16 lg:py-0">
      <div className="relative h-full min-h-[220px] w-full overflow-hidden lg:h-[60vh]">
        <Image
          src={panel.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-md">
        <h3 className="font-display text-3xl sm:text-4xl">{panel.title}</h3>
        <p className="text-ivory/80 mt-4 text-sm leading-relaxed sm:text-base">{panel.body}</p>
      </div>
    </div>
  );
}

export function CraftsmanshipScroll({ panels }: { panels: CraftPanel[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const enablePinning = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    if (!enablePinning || !containerRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const scrollDistance = track.scrollWidth - container.clientWidth;
      if (scrollDistance <= 0) return;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [enablePinning]);

  if (!enablePinning) {
    return (
      <section className="bg-ink text-ivory py-20 sm:py-28">
        <Container className="flex flex-col gap-16">
          {panels.map((panel) => (
            <PanelContent key={panel.title} panel={panel} />
          ))}
        </Container>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="bg-ink text-ivory relative h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full w-max">
        {panels.map((panel) => (
          <div key={panel.title} className="flex h-full w-screen shrink-0 items-center px-8 lg:px-20">
            <PanelContent panel={panel} />
          </div>
        ))}
      </div>
    </section>
  );
}
