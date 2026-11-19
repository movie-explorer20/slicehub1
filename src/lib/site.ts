export const siteConfig = {
  name: "Slice Hub",
  tagline: "Where Every Slice Starts a Story",
  heroHeadline: ["GOOD FOOD.", "GOOD MOOD."],
  heroSubtitle:
    "Delicious pizzas, burgers, shawarma and more — now just a WhatsApp away! Freshly prepared, 100% halal, delivered fast in Bahawalpur.",
  phone: "0312657489",
  phoneIntl: "92312657489",
  address: "Bahawalpur, Punjab, Pakistan",
  hours: "02:00 PM – 01:30 AM, Every Day",
  closingTime: "01:30 AM",
  city: "Bahawalpur (BWP)",
  rating: "4.8",
  reviewCount: "50+",
  social: {
    instagram: "https://instagram.com/slicehub.pk",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com/@slicehubpk",
    maps: "https://maps.google.com/?q=Bahawalpur+Punjab+Pakistan",
  },
  poweredBy: "Neptabolt Technologies",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${siteConfig.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export function formatRs(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
