"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Best pizza in Bahawalpur, hands down. The Chicken Tikka Pizza is loaded and always fresh. Delivery is fast too.",
    name: "Ahmed Raza",
    when: "2 weeks ago",
  },
  {
    text: "Ordering on WhatsApp is so easy — no app needed. The zinger burger is crispy and generous every single time.",
    name: "Sana Malik",
    when: "1 month ago",
  },
  {
    text: "Great taste and portion size. The shawarma platter is perfect for two people. Will definitely order again.",
    name: "Bilal Hussain",
    when: "3 weeks ago",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-tomato">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">
            What Our Customers Say
          </h2>
          <div className="inline-flex items-center gap-2 mt-3 bg-cream rounded-full px-4 py-2 border border-border">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 text-yellow fill-yellow" />
              ))}
            </div>
            <span className="text-sm font-bold">{siteConfig.rating} on Google</span>
            <span className="text-sm text-muted-foreground">
              ({siteConfig.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl bg-cream border border-border p-6 shadow-card hover:shadow-pop transition"
            >
              <Quote className="h-8 w-8 text-yellow/40 absolute top-4 right-4" />
              <div className="flex mb-3">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star key={j} className="h-4 w-4 text-yellow fill-yellow" />
                ))}
              </div>
              <p className="text-sm text-ink/80 leading-relaxed relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow text-ink font-bold flex items-center justify-center">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.when}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
