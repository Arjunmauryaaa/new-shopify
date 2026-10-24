import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, POLICY_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-line bg-ivory-dim border-t">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <p className="font-display text-2xl tracking-[0.2em]">{SITE.name}</p>
            <p className="text-charcoal mt-4 max-w-xs text-sm leading-relaxed">{SITE.description}</p>
            {SOCIAL_LINKS.some((link) => link.href) && (
              <div className="mt-6 flex items-center gap-4">
                {SOCIAL_LINKS.filter((link) => link.href).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={`${SITE.name} on ${link.label}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-charcoal hover:text-ink text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Support" links={FOOTER_LINKS.support} />
        </div>

        {SITE.supportEmail && (
          <div className="border-line mt-14 border-t pt-10">
            <p className="font-display text-lg">Stay in touch</p>
            <p className="text-charcoal mt-2 max-w-sm text-sm">
              Questions about an order? Email{" "}
              <a className="underline underline-offset-4" href={`mailto:${SITE.supportEmail}`}>
                {SITE.supportEmail}
              </a>
              .
            </p>
          </div>
        )}

        <div className="border-line text-charcoal-soft mt-14 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          {POLICY_LINKS.some((link) => link.href) && (
            <div className="flex flex-wrap gap-5">
              {POLICY_LINKS.filter((link) => link.href).map((link) => (
                <a key={link.label} href={link.href} className="hover:text-ink underline-offset-4 hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-ink text-xs font-medium tracking-wider uppercase">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-charcoal hover:text-ink text-sm transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
