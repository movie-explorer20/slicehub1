"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-tomato">
              The Counter
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
              What are you craving?
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 rounded-full bg-white border border-border hover:bg-yellow hover:text-ink hover:border-yellow flex items-center justify-center transition shadow-card"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 rounded-full bg-white border border-border hover:bg-yellow hover:text-ink hover:border-yellow flex items-center justify-center transition shadow-card"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4"
        >
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href="#menu"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group snap-start shrink-0 w-[140px] sm:w-[170px] rounded-3xl bg-white border border-border overflow-hidden shadow-card hover:shadow-pop transition-all"
            >
              <div className="relative h-28 sm:h-32 overflow-hidden">
                { }
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
              <div className="p-3 sm:p-3.5 text-center">
                <p className="font-bold text-sm sm:text-base leading-tight">
                  {cat.name}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-tight">
                  {cat.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
