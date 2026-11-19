import { siteConfig } from "@/lib/site";
import { Clock, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-ink text-white text-xs sm:text-sm">
      <div className="container mx-auto max-w-6xl px-4 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-wa" />
          </span>
          <span className="font-medium">
            Open now · closes {siteConfig.closingTime}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-white/70">
            <Clock className="h-3.5 w-3.5" />
            {siteConfig.hours}
          </span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 font-semibold hover:text-yellow transition"
          >
            <Phone className="h-3.5 w-3.5" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
