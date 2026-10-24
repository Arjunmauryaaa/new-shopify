import { ButtonLink } from "@/components/ui/ButtonLink";

export function NewsletterForm() {
  const signupUrl = process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL;
  if (!signupUrl) return null;

  return (
    <ButtonLink href={signupUrl} variant="secondary" size="lg" target="_blank" rel="noreferrer">
      Join the list
    </ButtonLink>
  );
}
