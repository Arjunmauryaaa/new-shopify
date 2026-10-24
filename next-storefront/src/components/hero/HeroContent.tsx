"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE } from "@/lib/constants";

const lineVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export function HeroContent() {
  return (
    <div className="text-ivory relative flex h-full flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-ivory/80 mb-4 text-xs font-medium tracking-[0.3em] uppercase"
      >
        The {SITE.name} collection
      </motion.p>

      <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[6.2vw]">
        <AnimatedLine text={SITE.name} delay={0.1} />
        <AnimatedLine text="Made to be yours" delay={0.25} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="text-ivory/85 mt-6 max-w-sm text-sm sm:text-base"
      >
        {SITE.tagline} {SITE.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-8"
      >
        <ButtonLink href="/shop" variant="outline-light" size="lg">
          Explore the collection
        </ButtonLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="text-ivory/70 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </div>
  );
}
