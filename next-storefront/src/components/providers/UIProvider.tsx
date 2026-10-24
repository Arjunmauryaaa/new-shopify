"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface UIContextValue {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openSearch = useCallback(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openMenu = useCallback(() => {
    setIsSearchOpen(false);
    setIsMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isSearchOpen, openSearch, closeSearch, isMenuOpen, openMenu, closeMenu, toggleMenu }),
    [isSearchOpen, openSearch, closeSearch, isMenuOpen, openMenu, closeMenu, toggleMenu]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
