import type { Collection } from "@/types/collection";

export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "VELORA",
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || "Designed for everyday motion.",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "A considered collection of footwear and apparel designed for everyday movement.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultCurrency: "USD",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
  shippingSummary: process.env.NEXT_PUBLIC_SHIPPING_SUMMARY || "",
  returnsSummary: process.env.NEXT_PUBLIC_RETURNS_SUMMARY || "",
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { label: "X", href: process.env.NEXT_PUBLIC_X_URL },
] as const;

export const POLICY_LINKS = [
  { label: "Privacy", href: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL },
  { label: "Terms", href: process.env.NEXT_PUBLIC_TERMS_URL },
  { label: "Shipping", href: process.env.NEXT_PUBLIC_SHIPPING_POLICY_URL },
  { label: "Returns", href: process.env.NEXT_PUBLIC_RETURNS_POLICY_URL },
] as const;

export const FOOTER_LINKS = {
  shop: [{ label: "Shop All", href: "/shop" }],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [{ label: "Contact", href: "/contact" }],
} as const;

export function buildMainNav(collections: Collection[], includeJournal = false) {
  return [
    { label: "Shop All", href: "/shop" },
    ...collections.slice(0, 4).map((collection) => ({
      label: collection.title,
      href: `/collections/${collection.handle}`,
    })),
    { label: "About", href: "/about" },
    ...(includeJournal ? [{ label: "Journal", href: "/journal" }] : []),
  ];
}

export const CATEGORIES = [
  "Sneakers",
  "Running Shoes",
  "Casual Shoes",
  "Jackets",
  "Hoodies",
  "T-Shirts",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

