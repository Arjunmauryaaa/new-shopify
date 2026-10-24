"use client";

import dynamic from "next/dynamic";
import { HeroBackgroundImage } from "./HeroBackgroundImage";
import { HeroContent } from "./HeroContent";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWebglSupport } from "@/hooks/use-webgl-support";
import { useMediaQuery } from "@/hooks/use-media-query";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

interface HeroSectionProps {
  fallbackImage: string;
  fallbackAlt: string;
}

export function HeroSection({ fallbackImage, fallbackAlt }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const webglSupported = useWebglSupport();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const show3D = webglSupported && isDesktop && !prefersReducedMotion;

  return (
    <section className="bg-ink relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      {show3D ? <Hero3D /> : <HeroBackgroundImage src={fallbackImage} alt={fallbackAlt} />}
      <HeroContent />
    </section>
  );
}
