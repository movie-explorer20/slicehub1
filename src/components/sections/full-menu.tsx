"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem, Category } from "@/lib/types";
import { pizzaSizes, itemPrice } from "@/lib/types";
import { useCart } from "@/store/cart";
import { formatRs } from "@/lib/site";
import { Search, Plus, Check, SlidersHorizontal } from "lucide-react";

const badgeStyles: Record<string, string> = {
  "BEST SELLER": "bg-yellow text-ink",
  SIGNATURE: "bg-white text-ink border border-ink/15",
  SPICY: "bg-tomato text-white",
};

export function FullMenu({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchCat = active === "all" || it.category.slug === active;
      const matchQuery =
        query.trim() === "" ||
        it.name.toLowerCase().includes(query.toLowerCase()) ||
        it.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [items, active, query]);

  return (
    <section id="menu" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-tomato">
            Our Menu
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
            Every Dish, Freshly Made
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Search or filter by category to find your next favourite.
          </p>
        </div>

        {/* Search + filter */}
        <div className="max-w-2xl mx-auto mb-5">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu..."
              className="w-full bg-cream border border-border rounded-full pl-11 pr-4 h-12 text-sm focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow/30"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          <button
            onClick={() => setActive("all")}
            className={`flex items-center gap-1.5 rounded-full text-xs sm:text-sm font-semibold px-3.5 py-2 transition ${
              active === "all"
                ? "bg-ink text-white"
                : "bg-cream border border-border text-muted-foreground hover:border-ink/30"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.slug)}
              className={`rounded-full text-xs sm:text-sm font-semibold px-3.5 py-2 transition ${
                active === cat.slug
                  ? "bg-ink text-white"
                  : "bg-cream border border-border text-muted-foreground hover:border-ink/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground mb-4 text-center">
          {filtered.length} dish{filtered.length !== 1 ? "es" : ""}
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filtered.map((item, i) => (
              <FullMenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-medium">No dishes found.</p>
            <p className="text-sm mt-1">Try another search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function FullMenuCard({ item, index }: { item: MenuItem; index: number }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const sizes = item.hasSizes ? pizzaSizes(item) : [];
  const [sizeIdx, setSizeIdx] = useState(0);
  const currentPrice = item.hasSizes ? sizes[sizeIdx].price : itemPrice(item);

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

  const badgeClass = item.badge
    ? badgeStyles[item.badge] ?? "bg-ink text-white"
    : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.02, 0.2) }}
      whileHover={{ y: -3 }}
      className="group flex flex-col rounded-2xl bg-cream border border-border overflow-hidden shadow-card hover:shadow-pop transition-all"
    >
      <div className="flex gap-3 p-3">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden">
          { }
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.badge && (
            <span
              className={`absolute top-1 left-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${badgeClass}`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="text-[9px] font-bold uppercase tracking-widest text-tomato/80">
            {item.category.name}
          </p>
          <h3 className="font-bold text-sm leading-tight mt-0.5 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Size pills for pizza */}
      {item.hasSizes && sizes.length > 0 && (
        <div className="flex gap-1.5 px-3">
          {sizes.map((sz, idx) => (
            <button
              key={sz.short}
              onClick={() => setSizeIdx(idx)}
              className={`flex-1 rounded-full text-[10px] font-semibold px-2 py-1 transition ${
                idx === sizeIdx
                  ? "bg-ink text-white"
                  : "bg-white border border-border text-muted-foreground hover:border-ink/30"
              }`}
            >
              {sz.short}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto px-3 py-2.5 border-t border-border">
        <span className="font-extrabold text-base">
          {formatRs(currentPrice)}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1 rounded-full font-bold text-xs px-3 py-1.5 transition shadow-card ${
            added
              ? "bg-wa text-white"
              : "bg-yellow hover:bg-yellow-dark text-ink"
          }`}
          aria-label={`Add ${item.name} to order`}
        >
          {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </motion.div>
  );
}
