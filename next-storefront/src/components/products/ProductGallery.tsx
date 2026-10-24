"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { ProductImage } from "@/types/product";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goTo = (index: number) => setActiveIndex((index + images.length) % images.length);
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  useLockBodyScroll(isLightboxOpen);

  useEffect(() => {
    if (!isLightboxOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, activeIndex]);

  function handleTouchStart(event: React.TouchEvent) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) prev();
      else next();
    }
    setTouchStartX(null);
  }

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
        {images.map((image, i) => (
          <button
            key={image.url + i}
            onClick={() => goTo(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-current={i === activeIndex}
            className={cn(
              "bg-ivory-dim relative h-20 w-16 shrink-0 overflow-hidden transition-opacity lg:h-24 lg:w-20",
              i === activeIndex ? "ring-ink opacity-100 ring-1" : "opacity-60 hover:opacity-100"
            )}
          >
            <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div
        className="group bg-ivory-dim relative aspect-[4/5] flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt || title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="bg-ivory/80 absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="bg-ivory/80 absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}

        <button
          onClick={() => setIsLightboxOpen(true)}
          aria-label="View fullscreen"
          className="bg-ivory/80 absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        >
          <Expand size={16} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — fullscreen gallery`}
            className="bg-ink fixed inset-0 z-[95] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen gallery"
              className="bg-ivory/90 absolute top-5 right-5 z-10 rounded-full p-2"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="bg-ivory/90 absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:left-6"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <div className="relative h-[80vh] w-[90vw] sm:w-[70vw]">
              <Image
                src={images[activeIndex].url}
                alt={images[activeIndex].alt || title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <button
              onClick={next}
              aria-label="Next image"
              className="bg-ivory/90 absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:right-6"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <p className="text-ivory/70 absolute bottom-6 left-1/2 -translate-x-1/2 text-xs">
              {activeIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
