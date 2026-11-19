import { useEffect, useState } from "react";
import { TopBar } from "@/components/site/top-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { CategoryCarousel } from "@/components/sections/category-carousel";
import { DealsGrid } from "@/components/sections/deals-grid";
import { SignatureMenu } from "@/components/sections/signature-menu";
import { FullMenu } from "@/components/sections/full-menu";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { CartProvider } from "@/components/cart/cart-provider";
import type { Category, Deal, MenuItem } from "@/lib/types";
import { ArrowRight, LoaderCircle } from "lucide-react";

const SIGNATURE_SLUGS = [
  "chicken-tikka",
  "chicken-supreme",
  "zinger-burger",
  "chicken-paratha-roll",
  "chicken-shawarma",
  "crown-crust",
];

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/menu").then((r) => r.json()),
      fetch("/api/deals").then((r) => r.json()),
    ])
      .then(([categoryData, menuData, dealData]) => {
        if (!active) return;
        setCategories(categoryData.categories ?? []);
        setAllItems(menuData.items ?? []);
        setDeals(dealData.deals ?? []);
        if (categoryData.error || menuData.error || dealData.error) setLoadError(true);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const signatureItems = SIGNATURE_SLUGS.map((slug) => allItems.find((item) => item.slug === slug)).filter(Boolean) as MenuItem[];
  const comboDeals = deals.filter((deal) => deal.section === "combo");
  const choiceDeals = deals.filter((deal) => deal.section === "choice");
  const previewDeals = comboDeals.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Hero />
        {loading ? (
          <div className="flex min-h-48 items-center justify-center gap-3 bg-cream text-muted-foreground">
            <LoaderCircle className="h-5 w-5 animate-spin" /> Loading Slice Hub menu...
          </div>
        ) : loadError ? (
          <div className="bg-cream px-4 py-8 text-center text-sm text-tomato">
            Menu data could not be loaded. Please make sure the Slice Hub API server is running.
          </div>
        ) : null}
        <CategoryCarousel categories={categories} />
        <section id="deals" className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-tomato">Limited Time</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">Today&apos;s Best Deals</h2>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-md">Great value combos, refreshed regularly. Add a few to the same bag.</p>
              </div>
              <a href="#all-deals" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-tomato hover:gap-2.5 transition-all whitespace-nowrap">View all deals <ArrowRight className="h-4 w-4" /></a>
            </div>
            <DealsGrid deals={previewDeals} />
            <div className="mt-6 text-center sm:hidden"><a href="#all-deals" className="inline-flex items-center gap-1.5 text-sm font-bold text-tomato">View all deals <ArrowRight className="h-4 w-4" /></a></div>
          </div>
        </section>
        <SignatureMenu items={signatureItems} />
        <FullMenu items={allItems} categories={categories} />
        <section id="all-deals" className="py-12 sm:py-16 bg-cream">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-tomato">Combos</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1">All Deals &amp; Choice Boxes</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto">Combo meals and choice boxes. Add a few to the same order.</p>
            </div>
            <h3 className="font-bold text-lg mb-4">Perfect Combos</h3>
            <DealsGrid deals={comboDeals} />
            <h3 className="font-bold text-lg mt-10 mb-2">Slice Hub Choice Box</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xl">One favourite, fries, a few wings or nuggets, dip and a cold drink.</p>
            <DealsGrid deals={choiceDeals} />
          </div>
        </section>
        <CtaBanner />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <CartProvider><HomePage /></CartProvider>;
}
