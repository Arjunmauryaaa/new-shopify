import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "./NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

export function NewsletterSection() {
  if (!process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL) return null;

  return (
    <section className="bg-ivory-dim py-20 sm:py-28">
      <Container className="text-center">
        <Reveal className="mx-auto max-w-lg">
          <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Stay Connected</p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">Join our list</h2>
          <p className="text-charcoal mt-4 text-sm sm:text-base">
            New arrivals, restocks, and considered stories from the studio. No noise.
          </p>
          <div className="mt-7 flex justify-center">
            <NewsletterForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
