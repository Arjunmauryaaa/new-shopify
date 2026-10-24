import type { Metadata } from "next";
import { MailCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <MailCheck size={40} className="text-charcoal-soft" aria-hidden="true" />
      <h1 className="font-display mt-6 text-4xl">Check your order email</h1>
      <p className="text-charcoal mt-4 max-w-md text-sm">
        Shopify sends the order confirmation after checkout. This page can&rsquo;t verify payment or confirm an
        order by URL alone.
      </p>
      <ButtonLink href="/shop" size="lg" className="mt-8">
        Continue Shopping
      </ButtonLink>
    </Container>
  );
}
