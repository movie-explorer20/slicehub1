"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { siteConfig, waLink } from "@/lib/site";

export type CartLine =
  | {
      key: string;
      kind: "item";
      slug: string;
      name: string;
      size: string | null; // e.g. "Regular (7\")"
      price: number;
      qty: number;
      image: string;
    }
  | {
      key: string;
      kind: "deal";
      slug: string;
      name: string;
      price: number;
      qty: number;
      image: string;
    };

type CheckoutInfo = {
  name: string;
  address: string;
  notes: string;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  info: CheckoutInfo;
  add: (line: CartLine) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  setInfo: (patch: Partial<CheckoutInfo>) => void;
  count: () => number;
  total: () => number;
  whatsappUrl: () => string;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      info: { name: "", address: "", notes: "" },
      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.key === line.key);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.key === line.key ? { ...l, qty: l.qty + line.qty } : l
              ),
              open: true,
            };
          }
          return { lines: [...s.lines, line], open: true };
        }),
      remove: (key) =>
        set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
      setInfo: (patch) =>
        set((s) => ({ info: { ...s.info, ...patch } })),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      total: () => get().lines.reduce((n, l) => n + l.qty * l.price, 0),
      whatsappUrl: () => {
        const { lines, info, total } = get();
        const t = total();
        const body = [
          `*Slice Hub Order*`,
          `Hello ${siteConfig.name}, I would like to place this order:`,
          ``,
          ...lines.map((l, i) => {
            const label =
              l.kind === "item"
                ? `${l.name}${l.size ? ` — ${l.size}` : ""}`
                : `${l.name}`;
            return `${i + 1}. ${label} × ${l.qty} — Rs. ${(l.price * l.qty).toLocaleString(
              "en-PK"
            )}`;
          }),
          ``,
          `*Total: Rs. ${t.toLocaleString("en-PK")}*`,
          ``,
          info.name ? `Name: ${info.name}` : "",
          info.address ? `Address: ${info.address}` : "",
          info.notes ? `Notes: ${info.notes}` : "",
          ``,
          `Please confirm availability and delivery time. Thank you!`,
        ]
          .filter(Boolean)
          .join("\n");
        return waLink(body);
      },
    }),
    { name: "slicehub-cart" }
  )
);
