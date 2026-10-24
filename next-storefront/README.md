# VELORA storefront

A premium, international headless-commerce storefront built with Next.js
and the Shopify Storefront API. VELORA runs immediately on realistic mock
data with zero configuration, and switches to a live Shopify catalog by
changing a single environment variable — no UI code changes required.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The full site — homepage,
collections, product pages, cart, search, wishlist — works out of the box
against the bundled demo catalog (26 products, 8 collections, reviews,
journal articles, testimonials).

## Connecting a real Shopify store

See **[SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md)** for the full walkthrough.
Short version: set `DATA_SOURCE=shopify` plus your store credentials in
`.env.local` (copy `.env.example` as a starting point) and restart the
dev server.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Shopify Storefront API** (GraphQL) — server-only access
- **Framer Motion** for UI animation, **GSAP/ScrollTrigger** for the
  pinned scroll sequence on the homepage
- **React Three Fiber / Three.js** for the optional 3D hero (desktop only,
  lazy-loaded, with a static-image fallback)
- **Zod** for form validation
- **Lucide** for icons

## Architecture

```
CUSTOM FRONTEND (Next.js)
        ↓
ProductProvider interface  ──┬── MockProductProvider   (DATA_SOURCE=mock)
                              └── ShopifyProductProvider (DATA_SOURCE=shopify)
        ↓ (shopify mode only)
Shopify Storefront API (GraphQL)
        ↓
Shopify Cart → Shopify Checkout → Payment → Shopify Order
```

No page or component ever talks to Shopify or to mock data directly —
everything goes through `getProductProvider()`
(`src/lib/products/index.ts`), which picks an implementation at request
time based on `DATA_SOURCE`. Both providers return the same internal
`Product` / `Collection` / `Cart` shapes (`src/types/`), so the entire UI
layer is data-source-agnostic.

Cart works the same way: in mock mode it's `localStorage`-backed
(`src/lib/cart/`); in Shopify mode it's driven by Server Actions
(`src/lib/shopify/actions.ts`) that create/update a real Shopify cart and
persist the cart ID in a cookie. Checkout in Shopify mode redirects to
Shopify's hosted checkout. In mock/preview mode checkout is disabled: the
site does not create fake orders or claim a payment succeeded. Production
requires `DATA_SOURCE=shopify`; it will not silently publish sample catalog
data.

## Before launch

Set the brand, canonical domain, support email, policy links, and truthful
shipping/returns summaries described in [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md).
Configure payment providers in Shopify Admin. Razorpay's Shopify integration
is a payment-provider setup, not a payment-link URL embedded in the cart.
The sample journal, reviews, testimonials, and preview catalog are not
published in Shopify mode.

### Security

`SHOPIFY_STOREFRONT_PRIVATE_TOKEN` and all other Shopify calls are
confined to files marked `import "server-only"` — attempting to import
them from a Client Component fails the build, so the private token can
never end up in a browser bundle.

## Project structure

```
src/
  app/                    Routes (App Router)
  components/
    layout/               Header, Footer, AnnouncementBar, MobileMenu
    hero/                 Hero section + optional 3D scene
    home/                 Homepage sections
    products/             ProductCard, ProductGrid, gallery, info, reviews
    collections/          Collection hero, filters/sort, pagination
    cart/                 Cart drawer, cart page, line items
    search/                Search overlay
    account/, contact/     Account dashboard, contact form
    providers/             Cart / Wishlist / UI context providers
    ui/                     Reusable primitives (Button, Drawer, Modal, ...)
  lib/
    shopify/               Storefront API client, queries, mutations, cart
    products/               ProductProvider interface + mock/shopify impls
    data/                   Mock catalog, collections, reviews, journal
    analytics/              Provider-agnostic event tracking
  hooks/                   Reusable client hooks
  types/                   Shared domain types
```

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint
```

## Environment variables

See [.env.example](./.env.example) for the full list with comments.
`DATA_SOURCE` is the only one required to run locally; everything else is
optional (Shopify credentials, analytics IDs).
