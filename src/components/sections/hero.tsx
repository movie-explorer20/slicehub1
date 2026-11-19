"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { MessageCircle, Play, Star, ShieldCheck, Zap, Leaf } from "lucide-react";

const trustBadges = [
  { icon: Star, label: `${siteConfig.rating} Google Rating` },
  { icon: ShieldCheck, label: "100% Halal Ingredients" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: Leaf, label: "Freshly Prepared" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream pt-10 pb-16 sm:pt-16 sm:pb-24"
    >
      {/* Yellow splash shape behind hero */}
      <div
        className="absolute top-1/4 -right-32 w-[480px] h-[480px] rounded-full bg-yellow/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-tomato/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl px-4 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-ink text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow" />
              {siteConfig.city.toUpperCase()} · 100% HALAL
            </span>

            <h1 className="mt-5 font-extrabold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
              <span className="block">{siteConfig.heroHeadline[0]}</span>
              <span className="block mt-1.5">
                <span className="highlight-yellow">{siteConfig.heroHeadline[1]}</span>
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {siteConfig.heroSubtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={`https://wa.me/${siteConfig.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow hover:bg-yellow-dark text-ink font-bold px-7 py-3.5 rounded-full transition shadow-yellow"
              >
                <MessageCircle className="h-5 w-5" />
                Order Now on WhatsApp
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream text-ink font-bold px-7 py-3.5 rounded-full border-2 border-ink/10 transition shadow-card"
              >
                <Play className="h-4 w-4 fill-current" />
                Explore Menu
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
              {trustBadges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shadow-card">
                    <b.icon className="h-4.5 w-4.5 text-yellow" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-muted-foreground leading-tight">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column - floating pizza composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative h-[360px] sm:h-[460px] lg:h-[520px] hidden sm:block"
          >
            {/* Yellow curved shape behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-yellow to-yellow-dark shadow-yellow animate-spin-slow opacity-90" />
            </div>

            {/* Main pizza */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ ["--rot" as string]: "0deg" }}
            >
              <div className="animate-float-slow">
                { }
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"
                  alt="Fresh wood-fired pizza with melting cheese"
                  className="w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] object-cover rounded-full shadow-pop border-8 border-white"
                />
              </div>
            </div>

            {/* Floating ingredients */}
            <div
              className="absolute top-4 left-4 animate-float-medium"
              style={{ ["--rot" as string]: "-12deg" }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-tomato shadow-card flex items-center justify-center text-2xl">
                🍅
              </div>
            </div>
            <div
              className="absolute top-10 right-2 animate-float-slow"
              style={{ ["--rot" as string]: "15deg", animationDelay: "0.8s" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-card flex items-center justify-center text-2xl">
                🧀
              </div>
            </div>
            <div
              className="absolute bottom-12 left-0 animate-float-medium"
              style={{ ["--rot" as string]: "8deg", animationDelay: "0.4s" }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-wa/90 shadow-card flex items-center justify-center text-xl">
                🌿
              </div>
            </div>
            <div
              className="absolute bottom-4 right-8 animate-float-slow"
              style={{ ["--rot" as string]: "-8deg", animationDelay: "1.2s" }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8b4513] shadow-card flex items-center justify-center text-xl">
                🫒
              </div>
            </div>

            {/* Rating badge floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-pop px-4 py-2.5 flex items-center gap-2"
            >
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 text-yellow fill-yellow"
                  />
                ))}
              </div>
              <div className="text-xs leading-none">
                <p className="font-bold">{siteConfig.rating}</p>
                <p className="text-muted-foreground">{siteConfig.reviewCount} reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
