import type { Testimonial } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";

export function CustomerReviews({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="mb-12 text-center">
          <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">
            Word on the Street
          </p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">What Our Customers Say</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, i) => (
            <Reveal
              key={testimonial.id}
              delay={i * 0.08}
              className="border-line bg-card flex flex-col gap-4 border p-6"
            >
              <StarRating rating={testimonial.rating} size={13} />
              <p className="text-charcoal flex-1 text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-ink text-sm font-medium">{testimonial.author}</p>
                <p className="text-charcoal-soft text-xs">{testimonial.location}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
