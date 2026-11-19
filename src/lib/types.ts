export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  category: Category;
  image: string;
  badge: string | null;
  hasSizes: boolean;
  price: number | null;
  priceRegular: number | null;
  priceMedium: number | null;
  priceLarge: number | null;
  sortOrder: number;
};

export type DealItem = {
  id: string;
  label: string;
};

export type Deal = {
  id: string;
  slug: string;
  name: string;
  description: string;
  badge: string;
  section: string;
  price: number;
  image: string;
  sortOrder: number;
  items: DealItem[];
};

export type PizzaSize = {
  label: string;
  short: string;
  price: number;
};

export function pizzaSizes(item: MenuItem): PizzaSize[] {
  return [
    { label: 'Regular (7")', short: "Regular", price: item.priceRegular ?? 0 },
    { label: 'Medium (10")', short: "Medium", price: item.priceMedium ?? 0 },
    { label: 'Large (13")', short: "Large", price: item.priceLarge ?? 0 },
  ];
}

export function itemPrice(item: MenuItem): number {
  if (item.hasSizes) return item.priceRegular ?? 0;
  return item.price ?? 0;
}
