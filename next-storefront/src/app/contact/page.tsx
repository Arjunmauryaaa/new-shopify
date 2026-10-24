import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE.name} team.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <Container className="py-14 pb-24">
      <p className="text-charcoal-soft text-xs font-medium tracking-[0.25em] uppercase">Get in Touch</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">Contact Us</h1>

      <div className="border-line bg-card mt-12 max-w-2xl border p-8">
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-charcoal-soft mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-ink text-sm font-medium">Customer support</p>
            {SITE.supportEmail ? (
              <a className="text-charcoal mt-2 inline-block text-sm underline underline-offset-4" href={`mailto:${SITE.supportEmail}`}>
                {SITE.supportEmail}
              </a>
            ) : (
              <p className="text-charcoal mt-2 text-sm">
                Support contact details haven&rsquo;t been configured yet. Add NEXT_PUBLIC_SUPPORT_EMAIL before launch.
              </p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
