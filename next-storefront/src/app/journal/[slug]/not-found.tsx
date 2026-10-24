import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function JournalArticleNotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-4xl">Article Not Found</p>
      <p className="text-charcoal mt-3 max-w-sm text-sm">This story is no longer available.</p>
      <ButtonLink href="/journal" size="lg" className="mt-8">
        Back to Journal
      </ButtonLink>
    </Container>
  );
}
