import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "ink" | "accent" | "outline";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-ivory",
  accent: "bg-accent text-ivory",
  outline: "border border-line-strong text-charcoal",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "ink", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
