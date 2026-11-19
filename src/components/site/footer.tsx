import { siteConfig } from "@/lib/site";
import { Instagram, Facebook, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

function PizzaMascot() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-32 h-32 sm:w-40 sm:h-40"
      aria-hidden="true"
    >
      {/* Pizza body */}
      <circle cx="100" cy="100" r="78" fill="#f5a623" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#e8951a" strokeWidth="4" />
      {/* Crust ring */}
      <circle cx="100" cy="100" r="68" fill="#ffd98a" />
      {/* Sauce */}
      <circle cx="100" cy="100" r="60" fill="#e63946" opacity="0.85" />
      {/* Pepperoni */}
      <circle cx="78" cy="80" r="9" fill="#b71c1c" />
      <circle cx="125" cy="88" r="8" fill="#b71c1c" />
      <circle cx="92" cy="120" r="8" fill="#b71c1c" />
      <circle cx="120" cy="125" r="9" fill="#b71c1c" />
      {/* Sunglasses */}
      <g>
        <rect x="55" y="68" width="38" height="20" rx="8" fill="#181818" />
        <rect x="107" y="68" width="38" height="20" rx="8" fill="#181818" />
        <rect x="93" y="76" width="14" height="4" fill="#181818" />
        {/* shine */}
        <rect x="60" y="72" width="10" height="4" rx="2" fill="#ffffff" opacity="0.4" />
        <rect x="112" y="72" width="10" height="4" rx="2" fill="#ffffff" opacity="0.4" />
      </g>
      {/* Smile */}
      <path d="M82 112 Q100 128 118 112" stroke="#181818" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Thumbs up hand */}
      <g>
        <rect x="150" y="120" width="26" height="16" rx="6" fill="#ffd98a" stroke="#e8951a" strokeWidth="2" transform="rotate(-15 163 128)" />
        <rect x="160" y="104" width="12" height="22" rx="5" fill="#ffd98a" stroke="#e8951a" strokeWidth="2" transform="rotate(-15 166 115)" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative bg-ink text-white mt-20">
      {/* Cheese drip top edge */}
      <div
        className="absolute -top-3 left-0 right-0 h-4 bg-yellow"
        style={{
          maskImage:
            "radial-gradient(circle 8px at 8px 8px, #0000 98%, #000) repeat-x",
          WebkitMaskImage:
            "radial-gradient(circle 8px at 8px 8px, #0000 98%, #000) repeat-x",
          maskSize: "20px 16px",
          WebkitMaskSize: "20px 16px",
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Mascot + brand */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <PizzaMascot />
            <p className="font-extrabold text-2xl mt-2">
              Slice<span className="text-yellow">Hub</span>
            </p>
            <p className="text-white/60 text-sm mt-2 max-w-xs">
              {siteConfig.tagline}. Premium pizza, burgers and shawarma in{" "}
              {siteConfig.city}. 100% halal.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2 mt-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow hover:text-ink flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow hover:text-ink flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow hover:text-ink flex items-center justify-center transition"
                aria-label="Google Maps"
              >
                <MapPin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-yellow mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "#home" },
                { label: "Menu", href: "#menu" },
                { label: "Deals", href: "#deals" },
                { label: "Signature", href: "#signature" },
                { label: "Reviews", href: "#reviews" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/70 hover:text-yellow transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our kitchen */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-yellow mb-4">
              Our Kitchen
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              A 100% halal pizza, burger and shawarma kitchen serving Bahawalpur.
              Freshness first, proper portions, and a WhatsApp counter that stays
              open late.
            </p>
            <p className="font-script text-yellow text-2xl mt-4 leading-none">
              Slice Happiness
            </p>
          </div>

          {/* Visit us */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-yellow mb-4">
              Visit Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-yellow shrink-0 mt-0.5" />
                <span className="text-white/70">{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-yellow shrink-0 mt-0.5" />
                <span className="text-white/70">{siteConfig.hours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-yellow shrink-0 mt-0.5" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-white/70 hover:text-yellow transition"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
            <a
              href={`https://wa.me/${siteConfig.phoneIntl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-wa hover:brightness-95 text-white font-bold text-sm px-4 py-2.5 rounded-full transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp orders
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Crafted with care for food lovers in {siteConfig.city}. Powered by{" "}
            <span className="text-white/70">{siteConfig.poweredBy}</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
