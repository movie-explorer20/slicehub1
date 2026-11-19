"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/store/cart";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((s) => s.count());
  const setOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-yellow text-ink font-extrabold text-xl shadow-yellow">
              S
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-tomato border-2 border-white" />
            </span>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight">
              Slice<span className="text-yellow">Hub</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full font-medium text-sm hover:bg-yellow/15 hover:text-ink transition relative group"
              >
                {l.label}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-0 group-hover:w-5 bg-yellow rounded-full transition-all" />
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-cream hover:bg-yellow/20 border border-border px-3 sm:px-4 h-10 sm:h-11 transition"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline text-sm font-semibold">
                My Order
              </span>
              {mounted && count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-tomato text-white text-xs font-bold flex items-center justify-center animate-wobble">
                  {count}
                </span>
              )}
            </button>
            <a
              href={`https://wa.me/${siteConfig.phoneIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 rounded-full bg-yellow hover:bg-yellow-dark text-ink font-bold text-sm px-5 h-11 transition shadow-yellow"
            >
              <MessageCircle className="h-4 w-4" />
              Order Now
            </a>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden h-10 w-10 rounded-full bg-cream border border-border flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="container mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl font-medium hover:bg-yellow/15 transition"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${siteConfig.phoneIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-yellow text-ink font-bold py-3"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
