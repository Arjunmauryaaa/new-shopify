import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} home`}
      className={cn(
        "font-display text-xl font-semibold tracking-[0.2em]",
        dark ? "text-ivory" : "text-ink",
        className
      )}
    >
      {SITE.name}
    </Link>
  );
}
