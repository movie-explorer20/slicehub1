# Slice Hub — React + Vite

Slice Hub has been migrated from Next.js to React 19 + Vite. The existing UI components, styling, menu data, SQLite database, cart, and WhatsApp order flow are retained. The Prisma API now runs as a separate Express server.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install

```powershell
npm install
npx prisma generate --schema prisma/schema.prisma
```

The SQLite database is stored at `db/custom.db`. The `.env` file points Prisma to it using `DATABASE_URL="file:../db/custom.db"` (the path is relative to `prisma/schema.prisma`).

## Run in VS Code

Open two terminals in the project folder.

Terminal 1 — API + SQLite/Prisma:

```powershell
npm run server
```

Terminal 2 — React website:

```powershell
npm run dev
```

Open http://localhost:5173

The Vite development server forwards `/api` requests to the Express API at http://localhost:5000.

## Production build

```powershell
npm run build
```

## Database commands

```powershell
npm run db:generate
npm run db:push
npm run db:seed
```

Do not run `db:push` with destructive options or reset the database unless you intentionally want to change or recreate the database.
