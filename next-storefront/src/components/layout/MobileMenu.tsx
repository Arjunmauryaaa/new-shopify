"use client";

import Link from "next/link";
import { Heart, Search, User } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { buildMainNav } from "@/lib/constants";
import type { Collection } from "@/types/collection";
import { useUI } from "@/components/providers/UIProvider";

export function MobileMenu({
  collections,
  includeJournal,
}: {
  collections: Collection[];
  includeJournal: boolean;
}) {
  const { isMenuOpen, closeMenu, openSearch } = useUI();
  const mainNav = buildMainNav(collections, includeJournal);

  return (
    <Drawer open={isMenuOpen} onClose={closeMenu} side="left" title="Menu" widthClassName="max-w-xs">
      <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="border-line font-display border-b py-4 text-2xl"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-4 flex flex-col gap-1 px-6">
        <button
          onClick={() => {
            closeMenu();
            openSearch();
          }}
          className="text-charcoal flex items-center gap-3 py-3 text-sm tracking-wide uppercase"
        >
          <Search size={17} aria-hidden="true" />
          Search
        </button>
        <Link
          href="/account"
          onClick={closeMenu}
          className="text-charcoal flex items-center gap-3 py-3 text-sm tracking-wide uppercase"
        >
          <User size={17} aria-hidden="true" />
          Account
        </Link>
        <Link
          href="/wishlist"
          onClick={closeMenu}
          className="text-charcoal flex items-center gap-3 py-3 text-sm tracking-wide uppercase"
        >
          <Heart size={17} aria-hidden="true" />
          Wishlist
        </Link>
      </div>
    </Drawer>
  );
}
