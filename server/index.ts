import "dotenv/config";
import express from "express";
import { db } from "../src/lib/db";

const app = express();
const port = Number(process.env.API_PORT || 5000);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Slice Hub API", city: "Bahawalpur" });
});

app.get("/api/categories", async (_req, res) => {
  try {
    const categories = await db.category.findMany({ orderBy: { sortOrder: "asc" } });
    res.json({ categories });
  } catch (error) {
    console.error("GET /api/categories error", error);
    res.status(500).json({ categories: [], error: "Failed to load categories" });
  }
});

app.get("/api/menu", async (_req, res) => {
  try {
    const items = await db.menuItem.findMany({
      orderBy: { sortOrder: "asc" },
      include: { category: true },
    });
    res.json({ items });
  } catch (error) {
    console.error("GET /api/menu error", error);
    res.status(500).json({ items: [], error: "Failed to load menu" });
  }
});

app.get("/api/deals", async (_req, res) => {
  try {
    const deals = await db.deal.findMany({
      orderBy: { sortOrder: "asc" },
      include: { items: true },
    });
    res.json({ deals });
  } catch (error) {
    console.error("GET /api/deals error", error);
    res.status(500).json({ deals: [], error: "Failed to load deals" });
  }
});

app.listen(port, () => {
  console.log(`Slice Hub API running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  await db.$disconnect();
  process.exit(0);
});
