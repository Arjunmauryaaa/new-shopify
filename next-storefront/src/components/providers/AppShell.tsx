"use client";

import type { ReactNode } from "react";
import { CartProvider, type DataSource } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";
import { UIProvider } from "./UIProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import type { Product } from "@/types/product";
import type { Collection } from "@/types/collection";

interface AppShellProps {
  children: ReactNode;
  dataSource: DataSource;
  crossSellProducts: Product[];
  collections: Collection[];
}

export function AppShell({ children, dataSource, crossSellProducts, collections }: AppShellProps) {
  return (
    <UIProvider>
      <CartProvider dataSource={dataSource}>
        <WishlistProvider>
          <a
            href="#main-content"
            className="focus:bg-ink focus:text-ivory sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <AnnouncementBar
            message={
              dataSource === "shopify"
                ? process.env.NEXT_PUBLIC_ANNOUNCEMENT_MESSAGE
                : "Preview store · sample catalog · checkout disabled"
            }
          />
          <Header collections={collections} includeJournal={dataSource === "mock"} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileMenu collections={collections} includeJournal={dataSource === "mock"} />
          <CartDrawer crossSellProducts={crossSellProducts} />
          <SearchOverlay />
        </WishlistProvider>
      </CartProvider>
    </UIProvider>
  );
}
