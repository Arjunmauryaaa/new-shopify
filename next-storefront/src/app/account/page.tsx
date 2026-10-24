import type { Metadata } from "next";
import { UserCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { AccountDashboard } from "@/components/account/AccountDashboard";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  const dataSource = process.env.DATA_SOURCE === "shopify" ? "shopify" : "mock";

  if (dataSource === "shopify") {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <UserCircle2 size={36} className="text-charcoal-soft" aria-hidden="true" />
        <p className="font-display mt-5 text-3xl">Customer Accounts</p>
        <p className="text-charcoal mt-3 max-w-md text-sm">
          This store is connected to Shopify. Sign-in will use the Shopify Customer Account API once
          it&rsquo;s configured for this storefront — we don&rsquo;t simulate authentication.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-8">
          Continue Shopping
        </ButtonLink>
      </Container>
    );
  }

  return (
    <Container className="py-14 pb-24">
      <h1 className="font-display text-4xl sm:text-5xl">My Account</h1>
      <p className="text-charcoal-soft mt-2 text-sm">Demo mode — showing sample account data.</p>
      <div className="mt-10">
        <AccountDashboard />
      </div>
    </Container>
  );
}
