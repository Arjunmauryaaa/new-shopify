import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, reviewCount, size = 14, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-ink text-ink" : "text-line-strong fill-transparent"}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          );
        })}
      </div>
      {typeof reviewCount === "number" && <span className="text-charcoal-soft text-xs">({reviewCount})</span>}
    </div>
  );
}
