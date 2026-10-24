import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function ProductNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-4xl">Product Not Found</p>
      <p className="text-charcoal mt-3 max-w-sm text-sm">
        The product you&rsquo;re looking for is no longer available.
      </p>
      <ButtonLink href="/shop" size="lg" className="mt-8">
        Back to Shop
      </ButtonLink>
    </Container>
  );
}
