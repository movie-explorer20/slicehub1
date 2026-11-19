import { db } from "../src/lib/db";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const PIZZA_IMG = "photo-1513104890138-7c749659a591";
const BURGER_IMG = "photo-1606755962773-d324e0a13086";
const PASTA_IMG = "photo-1620041631703-45ddcef3dae0";
const ROLL_IMG = "photo-1626242108323-cc46c98acdea";
const SHAWARMA_IMG = "photo-1629450748686-c86699b710ac";
const PLATTER_IMG = "photo-1762631884776-e1a2e5cd6d8d";
const FRIES_IMG = "photo-1593079781310-73b62303509a";
const CHICKEN_IMG = "photo-1626645738196-c2a7c87a8f58";
const DRINK_IMG = "photo-1629186235045-80d4147d90dc";
const PIZZA2_IMG = "photo-1565299624946-b28f40a0ae38";

async function main() {
  console.log("Seeding Slice Hub database...");

  // ---------- Categories ----------
  const categories = [
    { slug: "pizza", name: "Pizza", description: "Hand-tossed pies from 7\" to 13\"", image: img(PIZZA_IMG), sortOrder: 1 },
    { slug: "burgers", name: "Burgers", description: "Crispy zinger fillets, toasted buns", image: img(BURGER_IMG), sortOrder: 2 },
    { slug: "pasta", name: "Pasta", description: "Creamy, crunchy and special plates", image: img(PASTA_IMG), sortOrder: 3 },
    { slug: "rolls", name: "Rolls", description: "Paratha rolls packed with chicken", image: img(ROLL_IMG), sortOrder: 4 },
    { slug: "shawarma", name: "Shawarma", description: "Slow-roasted, wrapped to order", image: img(SHAWARMA_IMG), sortOrder: 5 },
    { slug: "platters", name: "Platters", description: "Sharing plates for the table", image: img(PLATTER_IMG), sortOrder: 6 },
    { slug: "fries", name: "Fries", description: "Masala, loaded and mayo fries", image: img(FRIES_IMG), sortOrder: 7 },
    { slug: "fried-chicken", name: "Fried Chicken", description: "Wings, nuggets and oven bakes", image: img(CHICKEN_IMG), sortOrder: 8 },
    { slug: "drinks", name: "Drinks", description: "Chilled bottles from 300ml to 1.5L", image: img(DRINK_IMG), sortOrder: 9 },
  ];

  for (const c of categories) {
    await db.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log(`Seeded ${categories.length} categories`);

  const catMap = Object.fromEntries(
    (await db.category.findMany()).map((c) => [c.slug, c.id])
  );

  // ---------- Menu Items ----------
  const items: Array<{
    slug: string;
    name: string;
    description: string;
    category: string;
    image: string;
    badge?: string | null;
    hasSizes?: boolean;
    price?: number;
    priceRegular?: number;
    priceMedium?: number;
    priceLarge?: number;
    sortOrder: number;
  }> = [
    // Pizza (hasSizes)
    { slug: "chicken-tikka", name: "Chicken Tikka", description: "Smoky tikka chicken, onions, capsicum and mozzarella on a hand-tossed base.", category: "pizza", image: img(PIZZA_IMG), badge: "BEST SELLER", hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 1 },
    { slug: "chicken-fajita", name: "Chicken Fajita", description: "Grilled fajita chicken, peppers and a smoky chipotle-mayo drizzle.", category: "pizza", image: img(PIZZA2_IMG), badge: null, hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 2 },
    { slug: "chicken-supreme", name: "Chicken Supreme", description: "Loaded with chicken tikka, onions, capsicum, mushroom, olives and jalapeño.", category: "pizza", image: img("photo-1574071318508-1cdbdeb80afc"), badge: "SIGNATURE", hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 3 },
    { slug: "creamy-crust", name: "Creamy Crust", description: "San Marzano tomato sauce, fresh basil and double mozzarella.", category: "pizza", image: img("photo-1571997478779-2adcbbe9ab2f"), badge: null, hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 4 },
    { slug: "smoky-bbq-chicken", name: "Smoky BBQ Chicken", description: "BBQ-glazed chicken, red onion and a molten mozzarella-cheddar blend.", category: "pizza", image: img("photo-1593560708920-61dd98c46a4e"), badge: null, hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 5 },
    { slug: "chicken-tandoori", name: "Chicken Tandoori", description: "Tandoor-spiced chicken, onions and peppers under a blanket of mozzarella.", category: "pizza", image: img("photo-1604382355076-af4b0ebee036"), badge: null, hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 6 },
    { slug: "slice-hub-special", name: "Slice Hub Special", description: "A house combination of the toppings our Bahawalpur regulars ask for most.", category: "pizza", image: img("photo-1513104890138-7c749659a591"), badge: null, hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 7 },
    { slug: "behari-kabab", name: "Behari Kabab", description: "Tender beef kabab with a blend of aromatic spices.", category: "pizza", image: img("photo-1565299624946-b28f40a0ae38"), badge: null, hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 8 },
    { slug: "kabab-stuffer", name: "Kabab Stuffer", description: "Seasoned kabab and chicken with fresh vegetables, stuffed through the pie.", category: "pizza", image: img("photo-1574071318508-1cdbdeb80afc"), badge: null, hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 9 },
    { slug: "malai-boti", name: "Malai Boti", description: "Creamy malai boti chicken, mild spices and melted cheese on a hand-tossed base.", category: "pizza", image: img("photo-1593560708920-61dd98c46a4e"), badge: null, hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 10 },
    { slug: "crown-crust", name: "Crown Crust", description: "A cheese-stuffed crown crust with mozzarella, cheddar and the house special topping.", category: "pizza", image: img("photo-1604382355076-af4b0ebee036"), badge: null, hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 11 },
    { slug: "peri-peri-chicken", name: "Peri Peri Chicken", description: "Mozzarella, cheddar, chicken tikka, onions and a fiery peri peri sauce.", category: "pizza", image: img("photo-1571997478779-2adcbbe9ab2f"), badge: "SPICY", hasSizes: true, priceRegular: 650, priceMedium: 1250, priceLarge: 1600, sortOrder: 12 },
    { slug: "kabab-bite", name: "Kabab Bite", description: "Bite-size beef kabab, onions and warm spices over mozzarella.", category: "pizza", image: img("photo-1513104890138-7c749659a591"), badge: null, hasSizes: true, priceRegular: 550, priceMedium: 1150, priceLarge: 1400, sortOrder: 13 },

    // Burgers
    { slug: "zinger-burger", name: "Zinger Burger", description: "Crispy fried chicken fillet, iceberg lettuce and house mayo in a toasted bun.", category: "burgers", image: img(BURGER_IMG), badge: "BEST SELLER", hasSizes: false, price: 350, sortOrder: 1 },
    { slug: "zinger-cheese-burger", name: "Zinger Cheese Burger", description: "Crispy fried chicken fillet, melted cheese, iceberg lettuce and house mayo in a toasted bun.", category: "burgers", image: img("photo-1571091718767-18b5b1457add"), badge: null, hasSizes: false, price: 400, sortOrder: 2 },
    { slug: "reggy-burger", name: "Reggy Burger", description: "Crispy fried chicken fillet, lettuce, tomato and house sauce in a toasted bun.", category: "burgers", image: img("photo-1550547660-d9450f859349"), badge: null, hasSizes: false, price: 250, sortOrder: 3 },
    { slug: "reggy-cheese-burger", name: "Reggy Cheese Burger", description: "Crispy fried chicken fillet, melted cheese, iceberg lettuce and house mayo in a toasted bun.", category: "burgers", image: img("photo-1551782450-a2132b4ba21d"), badge: "SPICY", hasSizes: false, price: 300, sortOrder: 4 },
    { slug: "tower-burger", name: "Tower Burger", description: "Chicken patty smothered in molten cheddar and caramelised onions.", category: "burgers", image: img("photo-1550317138-10000687a72b"), badge: null, hasSizes: false, price: 480, sortOrder: 5 },
    { slug: "double-zinger-burger", name: "Double Zinger Burger", description: "Two crispy fried chicken fillets, melted cheese, iceberg lettuce and house mayo in a toasted bun.", category: "burgers", image: img("photo-1606755962773-d324e0a13086"), badge: null, hasSizes: false, price: 550, sortOrder: 6 },

    // Pasta
    { slug: "special-pasta", name: "Special Pasta", description: "A loaded pasta plate with the house sauce, chicken and a golden finish.", category: "pasta", image: img(PASTA_IMG), badge: null, hasSizes: false, price: 700, sortOrder: 1 },
    { slug: "crunchy-pasta", name: "Crunchy Pasta", description: "Pasta tossed in sauce and finished with a crisp, savoury crunch.", category: "pasta", image: img("photo-1473093295043-cdd812d0e601"), badge: null, hasSizes: false, price: 650, sortOrder: 2 },
    { slug: "creamy-pasta", name: "Creamy Pasta", description: "A rich, velvety cream pasta with a slow, savoury sauce.", category: "pasta", image: img("photo-1620041631703-45ddcef3dae0"), badge: null, hasSizes: false, price: 650, sortOrder: 3 },

    // Rolls
    { slug: "2-bihari-rolls", name: "2-Bihari Rolls", description: "Two bihari-spiced rolls with crispy chicken and tangy mayo.", category: "rolls", image: img(ROLL_IMG), badge: null, hasSizes: false, price: 600, sortOrder: 1 },
    { slug: "2-malai-boti-rolls", name: "2-Malai Boti Rolls", description: "Two rolls of creamy malai boti chicken in a flaky paratha.", category: "rolls", image: img("photo-1626082927389-6cd65c9a8590"), badge: null, hasSizes: false, price: 600, sortOrder: 2 },
    { slug: "zinger-paratha-roll", name: "Zinger Paratha Roll", description: "Crispy chicken fillet wrapped in a flaky paratha with tangy mayo.", category: "rolls", image: img("photo-1601050690597-df0568f6c7e7"), badge: null, hasSizes: false, price: 270, sortOrder: 3 },
    { slug: "zinger-cheese-paratha-roll", name: "Zinger Cheese Paratha Roll", description: "Crispy chicken fillet, melted cheese and tangy mayo in a flaky paratha.", category: "rolls", image: img("photo-1626242108323-cc46c98acdea"), badge: null, hasSizes: false, price: 320, sortOrder: 4 },
    { slug: "chicken-paratha-roll", name: "Chicken Paratha Roll", description: "Grilled chicken, cheese and a trio of house sauces rolled together.", category: "rolls", image: img("photo-1601050690597-df0568f6c7e7"), badge: null, hasSizes: false, price: 270, sortOrder: 5 },
    { slug: "chicken-cheese-paratha-roll", name: "Chicken Cheese Paratha Roll", description: "Grilled chicken, melted cheese and a trio of house sauces rolled together.", category: "rolls", image: img("photo-1626082927389-6cd65c9a8590"), badge: null, hasSizes: false, price: 300, sortOrder: 6 },

    // Shawarma
    { slug: "chicken-shawarma", name: "Chicken Shawarma", description: "Slow-roasted spiced chicken, garlic sauce and pickles in soft Arabic bread.", category: "shawarma", image: img(SHAWARMA_IMG), badge: "BEST SELLER", hasSizes: false, price: 220, sortOrder: 1 },
    { slug: "chicken-cheese-shawarma", name: "Chicken Cheese Shawarma", description: "Slow-roasted spiced chicken, melted cheese, garlic sauce and pickles in soft Arabic bread.", category: "shawarma", image: img("photo-1606491196677-7c0ca8f35155"), badge: null, hasSizes: false, price: 240, sortOrder: 2 },
    { slug: "zinger-shawarma", name: "Zinger Shawarma", description: "Crispy fried chicken fillet, garlic sauce and pickles in soft Arabic bread.", category: "shawarma", image: img("photo-1633321079001-2c1b3b3b3b3b"), badge: null, hasSizes: false, price: 270, sortOrder: 3 },
    { slug: "zinger-cheese-shawarma", name: "Zinger Cheese Shawarma", description: "Crispy fried chicken fillet, melted cheese, garlic sauce and pickles in soft Arabic bread.", category: "shawarma", image: img("photo-1629450748686-c86699b710ac"), badge: null, hasSizes: false, price: 290, sortOrder: 4 },

    // Platters
    { slug: "chicken-platter", name: "Chicken Platter", description: "Crispy chicken wings (4 pc), a Behari roll, masala fries, dip sauce and a 300ml drink.", category: "platters", image: img(PLATTER_IMG), badge: null, hasSizes: false, price: 1000, sortOrder: 1 },

    // Fries
    { slug: "loaded-fries", name: "Loaded Fries", description: "Crispy fries topped with cheese sauce, jalapeños and spiced beef.", category: "fries", image: img("photo-1573080496219-bb080dd4f877"), badge: null, hasSizes: false, price: 800, sortOrder: 1 },
    { slug: "regular-masala-fries", name: "Regular Masala Fries", description: "Golden fries tossed in a warm, savoury masala seasoning.", category: "fries", image: img(FRIES_IMG), badge: null, hasSizes: false, price: 200, sortOrder: 2 },
    { slug: "large-fries-with-mayo", name: "Large Fries with Mayo", description: "A large tray of crispy fries finished with cool house mayo.", category: "fries", image: img("photo-1576107232684-1279f390859f"), badge: null, hasSizes: false, price: 400, sortOrder: 3 },

    // Fried Chicken
    { slug: "crispy-hot-wings", name: "Crispy Hot Wings", description: "10 pieces of crispy chicken wings tossed in a spicy hot sauce.", category: "fried-chicken", image: img(CHICKEN_IMG), badge: "SPICY", hasSizes: false, price: 700, sortOrder: 1 },
    { slug: "peri-peri-wings", name: "Peri Peri Wings", description: "10 pieces of crispy chicken wings tossed in a fiery peri peri sauce.", category: "fried-chicken", image: img("photo-1527477396000-e5ed9028e4e9"), badge: null, hasSizes: false, price: 700, sortOrder: 2 },
    { slug: "oven-baked-wings", name: "Oven Baked Wings", description: "10 pieces of tender chicken wings baked until the edges caramelise.", category: "fried-chicken", image: img("photo-1608032077018-c9aad9565d29"), badge: null, hasSizes: false, price: 700, sortOrder: 3 },
    { slug: "chicken-nuggets", name: "Chicken Nuggets", description: "10 pieces of crispy chicken nuggets served with your choice of dip.", category: "fried-chicken", image: img("photo-1606755962773-d324e0a13086"), badge: null, hasSizes: false, price: 650, sortOrder: 4 },

    // Drinks
    { slug: "300ml-soft-drink", name: "300ml Soft Drink", description: "A chilled 300ml soft drink, ice-cold from the fridge.", category: "drinks", image: img(DRINK_IMG), badge: null, hasSizes: false, price: 100, sortOrder: 1 },
    { slug: "500ml-soft-drink", name: "500ml Soft Drink", description: "A chilled 500ml soft drink for a solo meal.", category: "drinks", image: img("photo-1622495966227-cb9f3d3e3e3d"), badge: null, hasSizes: false, price: 130, sortOrder: 2 },
    { slug: "1-liter-soft-drink", name: "1 Liter Soft Drink", description: "A 1 litre bottle of chilled soft drink for sharing.", category: "drinks", image: img("photo-1629186235045-80d4147d90dc"), badge: null, hasSizes: false, price: 150, sortOrder: 3 },
    { slug: "1-5-liter-soft-drink", name: "1.5 Liter Soft Drink", description: "A 1.5 litre bottle of chilled soft drink for the whole table.", category: "drinks", image: img("photo-1437418747332-7d649c93b3e4"), badge: null, hasSizes: false, price: 200, sortOrder: 4 },
  ];

  for (const it of items) {
    const { category, ...data } = it;
    await db.menuItem.upsert({
      where: { slug: data.slug },
      update: { ...data, categoryId: catMap[category] },
      create: { ...data, categoryId: catMap[category] },
    });
  }
  console.log(`Seeded ${items.length} menu items`);

  // ---------- Deals ----------
  const deals: Array<{
    slug: string;
    name: string;
    description: string;
    badge: string;
    section: string;
    price: number;
    image: string;
    sortOrder: number;
    items: string[];
  }> = [
    // Combos
    { slug: "deal-1", name: "Deal-1: Regular Pizza & Drink", description: "1 Regular Pizza + 300ml Cold Drink — perfect for one.", badge: "PERFECT FOR ONE", section: "combo", price: 630, image: img(PIZZA_IMG), sortOrder: 1, items: ["1 Regular Pizza", "300ml Cold Drink"] },
    { slug: "deal-2", name: "Deal-2: Medium Pizza & Drink", description: "1 Medium Pizza + 500ml Cold Drink — perfect for the duo.", badge: "BEST VALUE", section: "combo", price: 1250, image: img(PIZZA2_IMG), sortOrder: 2, items: ["1 Medium Pizza", "500ml Cold Drink"] },
    { slug: "deal-3", name: "Deal-3: Large Pizza & Drink", description: "1 Large Pizza + 1L Cold Drink — perfect for a trio.", badge: "PERFECT FOR THREE", section: "combo", price: 1450, image: img("photo-1593560708920-61dd98c46a4e"), sortOrder: 3, items: ["1 Large Pizza", "1L Cold Drink"] },
    { slug: "deal-4", name: "Deal-4: Regular Pizza & Chicken Combo", description: "2 regular pizzas, 5 hot wings, 5 nuggets, regular fries and a 1L drink.", badge: "FAMILY TABLE", section: "combo", price: 2050, image: img(PLATTER_IMG), sortOrder: 4, items: ["2 Regular Pizzas", "5 pc wings", "5 pc nuggets", "Regular Fries", "1L Soft Drink"] },
    { slug: "deal-5", name: "Deal-5: Zinger Burger Combo", description: "5 Zinger Burgers and a 1.5L soft drink.", badge: "GROUP ORDER", section: "combo", price: 1850, image: img(BURGER_IMG), sortOrder: 5, items: ["5 Zinger Burgers", "1.5L Soft Drink"] },
    { slug: "deal-6", name: "Deal-6: Regular Pizzas & Pasta Combo", description: "2 regular pizzas, 1 large special pasta and a 1L soft drink.", badge: "SHARING COMBO", section: "combo", price: 1850, image: img(PASTA_IMG), sortOrder: 6, items: ["2 Regular Pizzas", "1 Large Special Pasta", "1L Soft Drink"] },
    { slug: "deal-7", name: "Deal-7: Medium Pizza & Burger Combo", description: "1 medium pizza, 2 zinger burgers and a 1L soft drink.", badge: "MIXED CRAVING", section: "combo", price: 1900, image: img("photo-1565299624946-b28f40a0ae38"), sortOrder: 7, items: ["1 Medium Pizza", "2 Zinger Burgers", "1L Soft Drink"] },
    { slug: "deal-8", name: "Deal-8: Large Pizzas Combo", description: "2 large pizzas and a 1.5L soft drink.", badge: "PARTY SIZE", section: "combo", price: 2850, image: img("photo-1604382355076-af4b0ebee036"), sortOrder: 8, items: ["2 Large Pizzas", "1.5L Soft Drink"] },
    { slug: "deal-9", name: "Deal-9: XL Pizza Deal", description: "1 extra large pizza and a 1.5L soft drink.", badge: "HUNGRY TABLE", section: "combo", price: 1900, image: img("photo-1571997478779-2adcbbe9ab2f"), sortOrder: 9, items: ["1 Extra Large Pizza", "1.5L Soft Drink"] },

    // Choice Box
    { slug: "alpha", name: "Alpha: Shawarma Combo", description: "Chicken shawarma, regular masala fries, 3 wings or nuggets, dip sauce and a 300ml drink.", badge: "CHOICE BOX", section: "choice", price: 750, image: img(SHAWARMA_IMG), sortOrder: 10, items: ["1 Chicken Shawarma", "Regular Fries", "3 pc Wings or Nuggets", "Dip Sauce", "300ml Cold Drink"] },
    { slug: "bravo", name: "Bravo: Paratha Roll Combo", description: "Paratha roll, regular masala fries, 3 wings or nuggets, dip sauce and a 300ml drink.", badge: "CHOICE BOX", section: "choice", price: 800, image: img(ROLL_IMG), sortOrder: 11, items: ["1 Paratha Roll", "Regular Fries", "3 pc Wings or Nuggets", "Dip Sauce", "300ml Cold Drink"] },
    { slug: "charlie", name: "Charlie: Zinger Burger Combo", description: "Zinger burger, regular masala fries, 3 wings or nuggets, dip sauce and a 300ml drink.", badge: "CHOICE BOX", section: "choice", price: 900, image: img(BURGER_IMG), sortOrder: 12, items: ["1 Zinger Burger", "Regular Fries", "3 pc Wings or Nuggets", "Dip Sauce", "300ml Cold Drink"] },
    { slug: "ultimate", name: "Ultimate: Pizza Combo", description: "Regular pizza, regular masala fries, 3 wings or nuggets, dip sauce and a 300ml drink.", badge: "CHOICE BOX", section: "choice", price: 1000, image: img(PIZZA_IMG), sortOrder: 13, items: ["1 Regular Pizza", "Regular Fries", "3 pc Wings or Nuggets", "Dip Sauce", "300ml Cold Drink"] },
    { slug: "extreme", name: "Extreme: Pasta Combo", description: "Large creamy pasta, regular masala fries, 3 wings or nuggets, dip sauce and a 300ml drink.", badge: "CHOICE BOX", section: "choice", price: 1050, image: img(PASTA_IMG), sortOrder: 14, items: ["1 Large Creamy Pasta", "Regular Fries", "3 pc Wings or Nuggets", "Dip Sauce", "300ml Cold Drink"] },
  ];

  for (const d of deals) {
    const { items: ditems, ...ddata } = d;
    const deal = await db.deal.upsert({
      where: { slug: ddata.slug },
      update: ddata,
      create: ddata,
    });
    await db.dealItem.deleteMany({ where: { dealId: deal.id } });
    for (const label of ditems) {
      await db.dealItem.create({ data: { dealId: deal.id, label } });
    }
  }
  console.log(`Seeded ${deals.length} deals`);

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
