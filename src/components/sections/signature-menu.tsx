"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/lib/types";
import { pizzaSizes, itemPrice } from "@/lib/types";
import { useCart } from "@/store/cart";
import { formatRs } from "@/lib/site";
import { Plus, Check, ArrowRight } from "lucide-react";

const badgeStyles: Record<string, string> = {
  "BEST SELLER": "bg-yellow text-ink",
  SIGNATURE: "bg-white text-ink border border-ink/15",
  SPICY: "bg-tomato text-white",
};

export function SignatureMenu({ items }: { items: MenuItem[] }) {
  return (
    <section id="signature" className="py-12 sm:py-16 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-tomato">
              Fan Favourites
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Signature Menu
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
              The dishes {`Bahawalpur`} orders again. Pick a pizza size on the card
              before it lands in your bag.
            </p>
          </div>
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-tomato hover:gap-2.5 transition-all whitespace-nowrap"
          >
            View full menu <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <a
            href="#menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-tomato"
          >
            View full menu <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const sizes = item.hasSizes ? pizzaSizes(item) : [];
  const [sizeIdx, setSizeIdx] = useState(0);
  const currentPrice = item.hasSizes
    ? sizes[sizeIdx].price
    : itemPrice(item);

  const handleAdd = () => {
    if (item.hasSizes) {
      const sz = sizes[sizeIdx];
      add({
        key: `item-${item.slug}-${sz.short}`,
        kind: "item",
        slug: item.slug,
        name: item.name,
        size: sz.label,
        price: sz.price,
        qty: 1,
        image: item.image,
      });
    } else {
      add({
        key: `item-${item.slug}`,
        kind: "item",
        slug: item.slug,
        name: item.name,
        size: null,
        price: item.price ?? 0,
        qty: 1,
        image: item.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const badgeClass = item.badge ? badgeStyles[item.badge] ?? "bg-ink text-white" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-3xl bg-white border border-border overflow-hidden shadow-card hover:shadow-pop transition-all"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-44 overflow-hidden">
        { }
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
        {item.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeClass}`}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-tomato/80">
          {item.category.name}
        </p>
        <h3 className="font-bold text-sm sm:text-base leading-tight mt-0.5">
          {item.name}
        </h3>
        <p className="text-[12px] sm:text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">
          {item.description}
        </p>

        {/* Size pills for pizza */}
        {item.hasSizes && sizes.length > 0 && (
          <div className="flex gap-1.5 mt-3">
            {sizes.map((sz, idx) => (
              <button
                key={sz.short}
                onClick={() => setSizeIdx(idx)}
                className={`flex-1 rounded-full text-[11px] font-semibold px-2 py-1.5 transition ${
                  idx === sizeIdx
                    ? "bg-ink text-white"
                    : "bg-cream border border-border text-muted-foreground hover:border-ink/30"
                }`}
              >
                {sz.short}
                <span className="hidden sm:inline"> ({sz.label.match(/\d+/)?.[0] ?? ""}&quot;)</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-extrabold text-lg sm:text-xl">
            {formatRs(currentPrice)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-full font-bold text-xs sm:text-sm px-3.5 py-2 transition shadow-card ${
              added
                ? "bg-wa text-white"
                : "bg-yellow hover:bg-yellow-dark text-ink"
            }`}
            aria-label={`Add ${item.name} to order`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
