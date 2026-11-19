"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { siteConfig, formatRs } from "@/lib/site";
import { Minus, Plus, Trash2, ShoppingBag, X, MessageCircle } from "lucide-react";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const [mounted, setMounted] = useState(false);

  // mounted guard avoids SSR/client mismatch with persisted cart state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && <CartDrawer open={open} onOpenChange={setOpen} />}
    </>
  );
}

function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const lines = useCart((s) => s.lines);
  const info = useCart((s) => s.info);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const setInfo = useCart((s) => s.setInfo);
  const total = useCart((s) => s.total());
  const whatsappUrl = useCart((s) => s.whatsappUrl());
  const [copied, setCopied] = useState(false);

  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-white border-l-4 border-yellow"
      >
        {/* Header */}
        <SheetHeader className="bg-ink text-white px-5 py-4 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-yellow" />
            <div>
              <SheetTitle className="text-white text-lg font-bold leading-none">
                My Order
              </SheetTitle>
              <SheetDescription className="text-white/60 text-xs mt-1">
                {count > 0 ? `${count} item${count > 1 ? "s" : ""} in your bag` : "Your bag is empty"}
              </SheetDescription>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 hover:bg-white/10 transition"
            aria-label="Close order bag"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-yellow/15 flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-yellow" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-tomato text-white text-xs font-bold flex items-center justify-center animate-wobble">
                0
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add a pizza, burger or a deal — it lands here.
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-2 bg-yellow hover:bg-yellow-dark text-ink font-bold px-6 py-2.5 rounded-full transition shadow-yellow"
            >
              Browse the menu
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
              {lines.map((l) => (
                <div
                  key={l.key}
                  className="flex gap-3 bg-cream rounded-2xl p-3 border border-border"
                >
                  <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-muted">
                    { }
                    <img
                      src={l.image}
                      alt={l.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      {l.name}
                    </p>
                    {l.kind === "item" && l.size && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {l.size}
                      </p>
                    )}
                    {l.kind === "deal" && (
                      <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wide bg-yellow/20 text-ink px-1.5 py-0.5 rounded">
                        Deal
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-full border border-border p-0.5">
                        <button
                          onClick={() => setQty(l.key, l.qty - 1)}
                          className="w-6 h-6 rounded-full hover:bg-ink hover:text-white flex items-center justify-center transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.key, l.qty + 1)}
                          className="w-6 h-6 rounded-full hover:bg-ink hover:text-white flex items-center justify-center transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">
                        {formatRs(l.price * l.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(l.key)}
                    className="self-start text-muted-foreground hover:text-tomato transition p-1"
                    aria-label={`Remove ${l.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Optional info fields */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Order details (optional)
                </p>
                <input
                  value={info.name}
                  onChange={(e) => setInfo({ name: e.target.value })}
                  placeholder="Name"
                  className="w-full bg-cream border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow"
                />
                <input
                  value={info.address}
                  onChange={(e) => setInfo({ address: e.target.value })}
                  placeholder="Delivery address"
                  className="w-full bg-cream border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow"
                />
                <textarea
                  value={info.notes}
                  onChange={(e) => setInfo({ notes: e.target.value })}
                  placeholder="Notes (e.g. extra spicy, no onions)"
                  rows={2}
                  className="w-full bg-cream border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-yellow focus:ring-1 focus:ring-yellow resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-white px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-2xl font-extrabold">{formatRs(total)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                No online payment. Confirm your order on WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCopied(true)}
                className="flex items-center justify-center gap-2 bg-wa hover:brightness-95 text-white font-bold py-3 rounded-full transition shadow-pop"
              >
                <MessageCircle className="h-5 w-5" />
                {copied ? "Opening WhatsApp..." : "Send order on WhatsApp"}
              </a>
              <button
                onClick={clear}
                className="w-full text-xs text-muted-foreground hover:text-tomato transition font-medium"
              >
                Clear bag
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
