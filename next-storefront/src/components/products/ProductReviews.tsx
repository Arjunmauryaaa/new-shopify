import type { Review } from "@/types/content";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

export function ProductReviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl">Reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={rating} size={16} />
            <span className="text-charcoal text-sm">
              {rating.toFixed(1)} out of 5 &middot; {reviewCount} review{reviewCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-charcoal mt-8 text-sm">Be the first to review this product.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="border-line border p-5">
              <StarRating rating={review.rating} size={13} />
              <p className="text-ink mt-3 text-sm font-medium">{review.title}</p>
              <p className="text-charcoal mt-2 text-sm leading-relaxed">{review.body}</p>
              <p className="text-charcoal-soft mt-4 text-xs">
                {review.author} &middot; {formatDate(review.date)}
                {review.verified && " · Verified Purchase"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
