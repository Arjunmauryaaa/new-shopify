# Connecting VELORA to Shopify

This project runs in two modes, controlled by a single environment variable:

- **`DATA_SOURCE=mock`** (default) — the site runs entirely on the bundled
  demo catalog. No Shopify account required.
- **`DATA_SOURCE=shopify`** — the site fetches real products, collections,
  and cart data from your Shopify store via the Storefront API.

Switching modes never requires touching a component — every page reads
through `getProductProvider()` in `src/lib/products/index.ts`, which
returns either `MockProductProvider` or `ShopifyProductProvider` based on
`DATA_SOURCE`. Both implement the exact same interface.

This guide walks through everything needed to go from `DATA_SOURCE=mock`
to a live Shopify-backed storefront.

---

## 1. Create a Shopify store

If you don't already have one, sign up at [shopify.com](https://www.shopify.com)
and complete the setup wizard. A free development store (created from your
[Shopify Partner dashboard](https://partners.shopify.com)) works fine for
testing — you don't need a paid plan to build against the Storefront API.

## 2. Open Shopify Admin

Log in to `https://<your-store>.myshopify.com/admin`.

## 3. Install/configure the Headless channel

Shopify's **Headless** sales channel is the modern way to issue Storefront
API credentials for a custom frontend like this one.

1. In Shopify Admin, go to **Settings → Apps and sales channels**.
2. Click **Shopify App Store**, search for **Headless**, and install it
   (or click **Add sales channel → Headless** if it's already available
   in your store).
3. Once installed, open the **Headless** channel from your sales channels
   list.

## 4. Create a storefront

Inside the Headless channel:

1. Click **Create storefront** (or select an existing one).
2. Give it a name, e.g. "VELORA Web".
3. This creates a Storefront API **public access token** automatically.

## 5. Configure Storefront API permissions

Still inside the storefront's settings in the Headless channel:

1. Review the **Storefront API scopes** — for this project you need at
   minimum: read products, read collections, read/write checkouts and
   carts (`unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`,
   and their cart equivalents). The Headless channel enables the standard
   storefront set by default — only adjust this if you've customized
   scopes.
2. If you need a **private/delegate access token** (recommended — this
   project prefers it and never sends it to the browser), generate one
   from the storefront's API credentials section.

## 6. Obtain your credentials

From the storefront's settings page, copy:

- **Store domain** — `<your-store>.myshopify.com`
- **Storefront API public access token**
- **Storefront API private access token** (if you generated one)
- **Storefront API version** currently in use (e.g. `2026-07`) — Shopify
  ships a new API version every quarter, so check what's current at
  [shopify.dev/docs/api/usage/versioning](https://shopify.dev/docs/api/usage/versioning)

## 7. Add credentials to `.env.local`

Copy `.env.example` to `.env.local` (this file is git-ignored and must
never be committed) and fill in:

```bash
DATA_SOURCE=shopify
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_PUBLIC_TOKEN=shpat_xxxxxxxxxxxxxxxxx
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=shpat_xxxxxxxxxxxxxxxxx
SHOPIFY_API_VERSION=2026-07
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

You only need one of the two tokens — if both are present, the private
token is used for server-side requests since it's more privileged.
**Never** prefix either Shopify token with `NEXT_PUBLIC_`, and never add
them to any file that's committed to source control.

## 8. Run the development server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage,
collections, and product pages should now be populated with your real
Shopify catalog. The UI is identical to demo mode — only the data source
changed.

> If a page that depends on a specific collection handle (e.g.
> `/collections/new-arrivals`, `/collections/men`) 404s, it's because
> your store doesn't have a collection with that handle yet. Create
> matching collections in Shopify Admin, or edit the handles referenced
> in `src/lib/constants.ts` and the homepage/header to match your store.

## 9. Test products

Visit `/shop` and a few `/products/<handle>` pages. Confirm images,
pricing, variants (color/size), and availability match what's configured
in Shopify Admin for each product.

## 10. Test the cart

Add an item to the cart. Under the hood this calls a Server Action
(`src/lib/shopify/actions.ts`) that creates a real Shopify cart via the
Storefront API and stores the cart ID in an httpOnly cookie. Reload the
page — the cart should persist.

## 11. Test checkout

Click **Checkout** on the `/cart` page. You should be redirected to your
store's real Shopify-hosted checkout (`checkoutUrl` returned by the
Storefront API's cart). Complete a test order using
[Shopify's test payment gateway](https://help.shopify.com/en/manual/payments/shopify-payments/testing-shopify-payments)
(enable "Bogus Gateway" on a development store, or use a test mode
payment provider).

The custom frontend never sees payment details and never fabricates an
order — Shopify's checkout is the system of record for every real order.

## 12. Deploy

Set the same environment variables (`DATA_SOURCE=shopify` and the
Shopify credentials above) in your hosting provider's environment
variable settings — Vercel, Netlify, or any Next.js-compatible host.
Never commit `.env.local`; always configure secrets through your host's
dashboard or CLI.

## 12a. Configure Razorpay for Shopify checkout

This storefront hands the cart to Shopify's hosted checkout. Configure
Razorpay as a Shopify payment provider; do not add Razorpay Checkout.js or
Payment Link URLs to the cart UI. A payment link is for collecting a
specific one-off amount and does not by itself attach a dynamic cart payment
to the Shopify checkout/order flow.

1. In Shopify Admin, open **Settings → Payments** and check which providers
   are available for your store's business country.
2. Complete Razorpay account activation/KYC. Then follow the official
   [Razorpay Secure setup steps](https://d6xcmfyh68wv8.cloudfront.net/docs/payments/payment-gateway/ecommerce-plugins/shopify/build-integration/)
   to connect the Shopify app as the store owner. Do not put Razorpay secret
   keys in `NEXT_PUBLIC_*` variables or browser code.
3. Test a real Shopify cart in Razorpay's test mode. Verify success, a
   declined or cancelled payment, the created Shopify order, and the matching
   Razorpay payment in the dashboard using Razorpay's
   [Shopify testing guide](https://d6xcmfyh68wv8.cloudfront.net/docs/payments/payment-gateway/ecommerce-plugins/shopify/test-integration/).
4. Complete the [go-live steps](https://d6xcmfyh68wv8.cloudfront.net/docs/payments/payment-gateway/ecommerce-plugins/shopify/go-live/)
   and replace test credentials with live credentials only in Shopify's
   provider connection.
5. For international currency processing, request activation from Razorpay
   Support and confirm your Shopify base currency is supported. Follow
   [Razorpay's international Shopify instructions](https://d6xcmfyh68wv8.cloudfront.net/docs/payments/payment-gateway/ecommerce-plugins/shopify/international-payments/).

The screenshot showing **Payment Links** is a Razorpay dashboard tool, not
proof that the Shopify gateway is connected. If Razorpay Secure is not listed
in Shopify's payment settings, check provider availability with Shopify and
Razorpay for your merchant country/account; do not work around it with a
manual browser checkout.

For cross-border sales, confirm the exact currencies and payment methods your
Razorpay account can process. Shopify market currency display and payment
processing are separate settings; local-currency processing depends on the
payment provider and store configuration. Configure the initial target
markets, shipping rates, tax display, and duties in Shopify Markets, then
verify the final amount and shipping destination at hosted checkout.

## 12b. Storefront identity and support settings

Set these public values in the deployment environment before launch. They
are presentation details, not secrets:

```bash
NEXT_PUBLIC_SITE_NAME=Your Brand
NEXT_PUBLIC_SITE_TAGLINE=Your short brand promise
NEXT_PUBLIC_SITE_DESCRIPTION=A truthful description of your store
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPPORT_EMAIL=help@your-domain.example
NEXT_PUBLIC_SHIPPING_SUMMARY=Delivery details shown at checkout
NEXT_PUBLIC_RETURNS_SUMMARY=See the returns policy before ordering
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-account
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/your-account
NEXT_PUBLIC_X_URL=https://x.com/your-account
NEXT_PUBLIC_PRIVACY_POLICY_URL=https://your-domain.example/policies/privacy-policy
NEXT_PUBLIC_TERMS_URL=https://your-domain.example/policies/terms-of-service
NEXT_PUBLIC_SHIPPING_POLICY_URL=https://your-domain.example/policies/shipping-policy
NEXT_PUBLIC_RETURNS_POLICY_URL=https://your-domain.example/policies/refund-policy
NEXT_PUBLIC_ANNOUNCEMENT_MESSAGE=
NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL=https://your-email-platform.example/signup
```

The mailing-list button links to your email platform's hosted signup page;
the storefront does not pretend to subscribe visitors when that URL is unset.

Only publish shipping thresholds, return windows, customer reviews, origin
stories, and performance or sustainability claims that match your actual
business and products. This project intentionally does not fabricate these
details for the live Shopify storefront.

## 13. Keep the live site in sync with Shopify (webhooks)

By default, product and collection data is cached once fetched. Without
this step, a change you make in Shopify Admin (new product, price change,
something selling out) won't appear on your deployed site until the next
deploy. This step makes changes appear within seconds instead.

1. In Shopify Admin, go to **Settings → Notifications**.
2. Scroll to the **Webhooks** section and click **Create webhook**.
3. Create one webhook for each of these events, all pointing to:
   `https://<your-deployed-domain>/api/webhooks/shopify`
   - Product creation
   - Product update
   - Product deletion
   - Collection creation
   - Collection update
   - Collection deletion
   - Inventory level update
4. Use the latest API version for each, and JSON as the format.
5. Near the bottom of the Webhooks page, Shopify shows a **signing
   secret** shared by all webhooks created here. Copy it into your
   deployment's environment variables (Vercel → Project → Settings →
   Environment Variables) as `SHOPIFY_WEBHOOK_SECRET`, then redeploy so the
   new variable takes effect.

That's it — no code changes needed. `/api/webhooks/shopify` verifies each
incoming request is genuinely from Shopify (using that signing secret)
before refreshing only the specific product or collection that changed.

---

## Reverting to demo mode

Set `DATA_SOURCE=mock` (or remove it — mock is the default) and restart
the dev server. No other changes are required.

