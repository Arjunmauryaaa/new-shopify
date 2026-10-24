"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-4xl">Something went wrong.</p>
      <p className="text-charcoal mt-3 max-w-sm text-sm">
        We hit an unexpected error loading this page. Please try again.
      </p>
      <Button onClick={reset} size="lg" className="mt-8">
        Try Again
      </Button>
    </Container>
  );
}
