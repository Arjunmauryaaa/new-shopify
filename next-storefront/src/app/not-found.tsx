import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-charcoal-soft text-sm tracking-[0.3em] uppercase">404</p>
      <p className="font-display mt-4 text-4xl sm:text-5xl">Page Not Found</p>
      <p className="text-charcoal mt-3 max-w-sm text-sm">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <ButtonLink href="/" size="lg" className="mt-8">
        Back to Home
      </ButtonLink>
    </Container>
  );
}
