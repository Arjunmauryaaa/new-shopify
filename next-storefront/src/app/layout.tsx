import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppShell } from "@/components/providers/AppShell";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { getProductProvider } from "@/lib/products";
import { SITE } from "@/lib/constants";
import type { DataSource } from "@/components/providers/CartProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ed",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const dataSource: DataSource = process.env.DATA_SOURCE === "shopify" ? "shopify" : "mock";
  const provider = await getProductProvider();
  const [crossSellProducts, collections] = await Promise.all([
    provider.getBestsellers(),
    provider.getCollections(),
  ]);

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <Script
        id="safe-dom-mutations"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function () {
  if (typeof Node !== "function" || !Node.prototype) return;
  // Browser extensions (translators, password managers, form fillers) sometimes
  // mutate the DOM tree that React manages. When that happens, a subsequent
  // React commit can ask to remove/insert a node that's no longer where React
  // expects it, and the native DOM API throws instead of no-op'ing. Degrade
  // gracefully in that case rather than crashing the whole page.
  var removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Skipped removeChild: node was no longer a child of its expected parent.");
      }
      return child;
    }
    return removeChild.apply(this, arguments);
  };
  var insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Skipped insertBefore: reference node was no longer a child of this node.");
      }
      return newNode;
    }
    return insertBefore.apply(this, arguments);
  };
})();`,
        }}
      />
      <body className="bg-ivory text-ink flex min-h-screen flex-col">
        <AppShell
          dataSource={dataSource}
          crossSellProducts={crossSellProducts.slice(0, 6)}
          collections={collections}
        >
          {children}
        </AppShell>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
