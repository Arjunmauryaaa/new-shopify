# AeroFlex — Shopify theme (premium single-product landing page)

This is a native Shopify theme, built on top of **Dawn** (Shopify's
open-source reference theme). It adds a custom product template and a set
of premium marketing sections so any single product can be presented as a
full landing page — hero, story, features, editorial imagery,
specifications, reviews, FAQ, shipping/returns, policies, and a final CTA
— using Shopify's own cart, checkout, and payment (no external app,
no headless frontend).

## What was added on top of Dawn

- `templates/product.landing-page.json` — an **alternate product
  template**. Assign it to one product and that product gets the full
  landing-page treatment; every other product keeps the default template.
- Custom sections (prefixed `af-` so they never collide with Dawn's own):
  `af-trust-bar`, `af-features`, `af-specifications`, `af-reviews`,
  `af-shipping-returns`, `af-final-cta`, `af-mobile-sticky-bar`.
- Reuses Dawn's own sections where they already do the job well:
  `main-product` (gallery, variant picker, buy buttons, sticky info panel),
  `image-with-text` (story), `image-banner` ×3 (editorial image story),
  `collapsible-content` ×2 (FAQ, Terms & Policies).
- `assets/af-theme.css`, `assets/af-sticky-bar.js`,
  `snippets/af-star-rating.liquid`.
- A new color scheme (`scheme-6`, dark ink + lime accent) and tuned global
  styles (`buttons_radius`, `cart_type: drawer`) in
  `config/settings_data.json`.

Everything else is stock Dawn — cart drawer, AJAX add-to-cart, dynamic
checkout buttons (Shop Pay / PayPal / etc.), accessibility, and
responsive behavior all come from Dawn's existing, battle-tested code.
Validated with `shopify theme check` — 0 errors/warnings in any of the
files listed above (the only warnings in the whole theme are pre-existing
ones in unmodified Dawn files).

## Import into your store

You have two options:

### Option A — Upload zip (matches the screen you showed me)

1. Zip the contents of this `shopify-theme/` folder (the zip's root
   should contain `assets/`, `config/`, `layout/`, etc. directly — not a
   nested folder).
2. In Shopify admin: **Online Store → Themes → Add theme → Upload zip
   file**, and select the zip.
3. Click **Publish** when you're ready to make it live, or **Preview**
   first.

### Option B — Push with Shopify CLI (recommended for iterating)

```bash
cd shopify-theme
npx @shopify/cli theme dev --store your-store.myshopify.com    # live local preview
npx @shopify/cli theme push --store your-store.myshopify.com   # push to a theme on your store
```

The first run will prompt you to log in to your Shopify Partner/store
account in the browser.

## Assign the landing-page template to a product

1. In Shopify admin, open the product you want to feature.
2. Scroll to the **Theme template** field (right sidebar).
3. Choose **product.landing-page**.
4. Save. That product now renders the full custom landing page; all
   other products keep the theme's normal product page.

## Add your content

Everything is editable in **Online Store → Customize** with that product
open:

- **Trust bar, Features, Specifications, Reviews, Shipping & Returns,
  Terms & Policies, Final CTA** — click into each section to edit
  headings, blocks (add/remove/reorder), and copy. Demo content is
  pre-filled so the page looks complete immediately.
- **Story / Image story** — these are Dawn's own `image-with-text` and
  `image-banner` sections, so upload your own photography directly in
  each section's settings.
- **Reviews** — the numbers and cards in `af-reviews` are manually
  editable demo content, clearly separate from any real review data (see
  the section's info note in the editor). For real, verified reviews,
  install a reviews app (Judge.me, Loox, Yotpo, etc.) — most either write
  a rating to the product's `reviews.rating` metafield (which the
  **rating** block already in the product template will pick up
  automatically) or ship their own section/block you can add above or
  below `af-reviews`.
- **FAQ / Policies** — edit rows directly in the `faq` and `policies`
  section instances, or link the Policies rows to your store's real
  policies under **Settings → Policies**.

## Notes

- Cart/checkout/payment are 100% native Shopify (AJAX cart drawer, Shop
  Pay / dynamic checkout buttons, real order creation) — nothing custom
  or simulated.
- The mobile sticky buy bar (`af-mobile-sticky-bar`) appears once the
  shopper scrolls past the hero and always reflects the currently
  selected variant (price, availability) via Dawn's own `variant-change`
  event — no separate/duplicated cart logic.
- To change which product uses this design, just reassign the
  **product.landing-page** template to a different product — no section
  or code changes needed.
