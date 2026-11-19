"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Deal } from "@/lib/types";
import { useCart } from "@/store/cart";
import { formatRs } from "@/lib/site";
import { Plus, Check } from "lucide-react";

const badgeStyles: Record<string, string> = {
  "PERFECT FOR ONE": "bg-tomato text-white",
  "BEST VALUE": "bg-yellow text-ink",
  "PERFECT FOR THREE": "bg-tomato text-white",
  "FAMILY TABLE": "bg-ink text-white",
  "GROUP ORDER": "bg-ink text-white",
  "SHARING COMBO": "bg-ink text-white",
  "MIXED CRAVING": "bg-ink text-white",
  "PARTY SIZE": "bg-ink text-white",
  "HUNGRY TABLE": "bg-ink text-white",
  "CHOICE BOX": "bg-wa text-white",
};

export function DealsGrid({ deals }: { deals: Deal[] }) {
  const add = useCart((s) => s.add);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {deals.map((deal, i) => (
        <DealCard key={deal.id} deal={deal} index={i} onAdd={add} />
      ))}
    </div>
  );
}

function DealCard({
  deal,
  index,
  onAdd,
}: {
  deal: Deal;
  index: number;
  onAdd: ReturnType<typeof useCart.getState>["add"];
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd({
      key: `deal-${deal.slug}`,
      kind: "deal",
      slug: deal.slug,
      name: deal.name,
      price: deal.price,
      qty: 1,
      image: deal.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const badgeClass = badgeStyles[deal.badge] ?? "bg-ink text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -4 }}
      className="cheese-drip-top group relative flex flex-col rounded-3xl bg-cream border border-border overflow-hidden shadow-card hover:shadow-pop transition-all"
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 overflow-hidden">
        { }
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        {/* Badge */}
        <span
          className={`absolute top-2.5 left-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeClass}`}
        >
          {deal.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <h3 className="font-bold text-sm sm:text-base leading-tight">
          {deal.name}
        </h3>
        <p className="text-[12px] sm:text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">
          {deal.description}
        </p>

        {/* Items list */}
        <ul className="mt-2.5 space-y-1 flex-1">
          {deal.items.slice(0, 4).map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-tomato shrink-0" />
              {it.label}
            </li>
          ))}
          {deal.items.length > 4 && (
            <li className="text-[11px] text-muted-foreground/70 italic">
              +{deal.items.length - 4} more
            </li>
          )}
        </ul>

        {/* Footer: price + add */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-extrabold text-lg sm:text-xl">
            {formatRs(deal.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-full font-bold text-xs sm:text-sm px-3.5 py-2 transition shadow-card ${
              added
                ? "bg-wa text-white"
                : "bg-yellow hover:bg-yellow-dark text-ink"
            }`}
            aria-label={`Add ${deal.name} to order`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" /> Add deal
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
