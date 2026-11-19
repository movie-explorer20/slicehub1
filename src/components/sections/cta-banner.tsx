import { siteConfig } from "@/lib/site";
import { MessageCircle, ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-12 sm:py-16 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-yellow p-8 sm:p-12 lg:p-16 shadow-yellow">
          {/* Curved organic shape */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-yellow-dark/40" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-yellow-dark/30" />

          {/* Floating pizza emoji decorations */}
          <div className="absolute top-6 right-8 text-4xl opacity-30 animate-float-slow">🍕</div>
          <div className="absolute bottom-8 right-16 text-3xl opacity-30 animate-float-medium">🍔</div>

          <div className="relative grid lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-ink/70">
                No app · No signup
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-2 leading-tight text-ink">
                Craving Something Fresh?
              </h2>
              <p className="text-base sm:text-lg text-ink/80 mt-3 max-w-lg mx-auto lg:mx-0">
                Order in seconds — build a bag here, then send it on WhatsApp. Hot
                pizza, crisp zingers and shawarma, made to order.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={`https://wa.me/${siteConfig.phoneIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-ink/90 text-white font-bold px-7 py-3.5 rounded-full transition shadow-pop"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order Now on WhatsApp
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream text-ink font-bold px-7 py-3.5 rounded-full transition shadow-card"
                >
                  Explore Menu
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="hidden lg:flex lg:col-span-2 justify-center">
              <div className="relative w-52 h-80 rounded-[2rem] bg-ink p-2 shadow-pop rotate-3">
                <div className="w-full h-full rounded-[1.5rem] bg-cream overflow-hidden flex flex-col">
                  <div className="bg-ink text-white text-center text-[10px] py-1.5 font-bold">
                    Slice Hub
                  </div>
                  <div className="flex-1 p-2.5 flex flex-col gap-2">
                    <div className="bg-white rounded-lg p-2 shadow-card">
                      <div className="h-12 bg-yellow/30 rounded mb-1.5" />
                      <div className="h-2 w-3/4 bg-ink/20 rounded mb-1" />
                      <div className="h-2 w-1/2 bg-ink/10 rounded" />
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-card flex gap-2">
                      <div className="w-10 h-10 bg-tomato/30 rounded" />
                      <div className="flex-1">
                        <div className="h-2 w-3/4 bg-ink/20 rounded mb-1" />
                        <div className="h-2 w-1/3 bg-yellow rounded" />
                      </div>
                    </div>
                    <div className="mt-auto bg-wa text-white text-[10px] font-bold text-center py-2 rounded-lg">
                      Send on WhatsApp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
