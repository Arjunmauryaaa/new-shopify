import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-line/70 animate-pulse", className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}
