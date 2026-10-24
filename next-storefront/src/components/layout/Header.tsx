"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useStickyHeader } from "@/hooks/use-sticky-header";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useUI } from "@/components/providers/UIProvider";
import { IconButton } from "@/components/ui/IconButton";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { buildMainNav } from "@/lib/constants";
import type { Collection } from "@/types/collection";

export function Header({
  collections,
  includeJournal,
}: {
  collections: Collection[];
  includeJournal: boolean;
}) {
  const { isScrolled, isVisible } = useStickyHeader();
  const { cart, openCart } = useCart();
  const { handles } = useWishlist();
  const { openSearch, toggleMenu } = useUI();
  const mainNav = buildMainNav(collections, includeJournal);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled ? "border-line bg-ivory/90 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between">
        <div className="flex items-center gap-3 lg:hidden">
          <IconButton label="Open menu" onClick={toggleMenu}>
            <Menu size={20} aria-hidden="true" />
          </IconButton>
        </div>

        <div className="flex items-center gap-10">
          <Logo />
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {mainNav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-charcoal hover:text-ink text-[11px] font-medium tracking-wider uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <IconButton label="Search" onClick={openSearch}>
            <Search size={19} aria-hidden="true" />
          </IconButton>
          <Link
            href="/account"
            aria-label="Account"
            className="text-ink hover:bg-ink/5 hidden h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 sm:inline-flex"
          >
            <User size={19} aria-hidden="true" />
          </Link>
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${handles.length} items`}
            className="text-ink hover:bg-ink/5 relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 sm:inline-flex"
          >
            <Heart size={19} aria-hidden="true" />
            {handles.length > 0 && (
              <span className="bg-ink text-ivory pointer-events-none absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium">
                {handles.length}
              </span>
            )}
          </Link>
          <IconButton label={`Cart, ${cart.totalQuantity} items`} onClick={openCart} className="relative">
            <ShoppingBag size={19} aria-hidden="true" />
            {cart.totalQuantity > 0 && (
              <span className="bg-ink text-ivory pointer-events-none absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium">
                {cart.totalQuantity}
              </span>
            )}
          </IconButton>
        </div>
      </Container>
    </motion.header>
  );
}
