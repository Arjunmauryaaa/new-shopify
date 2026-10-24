import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide uppercase transition-colors duration-300 ease-[var(--ease-premium)] disabled:pointer-events-none disabled:opacity-40 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-charcoal",
  secondary: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-ivory",
  ghost: "bg-transparent text-ink hover:text-charcoal underline underline-offset-4 decoration-line-strong",
  "outline-light": "bg-transparent text-ivory border border-ivory/70 hover:bg-ivory hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[11px]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return <button ref={ref} className={buttonClasses(variant, size, className)} {...props} />;
  }
);
Button.displayName = "Button";
