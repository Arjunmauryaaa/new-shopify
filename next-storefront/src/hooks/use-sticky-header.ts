import { useEffect, useRef, useState } from "react";

interface StickyHeaderState {
  isScrolled: boolean;
  isVisible: boolean;
}

/**
 * Drives the header's "intelligent" sticky behavior: it gains a background
 * once the page scrolls past the hero, and hides on scroll-down / reappears
 * on scroll-up so it never fights the user for viewport space.
 */
export function useStickyHeader(threshold = 24): StickyHeaderState {
  const [state, setState] = useState<StickyHeaderState>({ isScrolled: false, isVisible: true });
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const isScrolled = currentY > threshold;
      const scrollingDown = currentY > lastY.current + 4;
      const scrollingUp = currentY < lastY.current - 4;
      const isVisible = currentY < threshold || scrollingUp || !scrollingDown;

      setState((prev) => {
        if (prev.isScrolled === isScrolled && prev.isVisible === isVisible) return prev;
        return { isScrolled, isVisible };
      });

      lastY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
