# Portfolio — Amaïa Mescco

Personal portfolio built with **Next.js 15** (App Router) and **TypeScript**.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 – App Router |
| Language | TypeScript |
| Styling | CSS Modules + global CSS variables |
| Fonts | Instrument Sans & Instrument Serif via `next/font` |
| Database | SQLite via `better-sqlite3` |
| Email | Nodemailer (SMTP) |

## Architecture

The project follows an **MVC pattern** with one controller, service, and repository per entity.

```
app/                        # Views — Next.js pages and layouts
components/                 # Shared React components
  layout/                   # Navbar, Footer, SubNav
  contact/                  # Contact form
controllers/                # Orchestration per entity — exposes singleton instances
services/                   # Business logic per entity
repositories/               # SQLite queries per entity
models/                     # TypeScript classes representing DB entities
lib/
  database.ts               # SQLite connection singleton
  email-sender.ts           # IEmailSender interface + NodemailerEmailSender
db/
  init.mjs                  # Schema + seed — run once with: node db/init.mjs
```

Pages are **Server Components** by default — they call controllers directly with no REST API layer.

## Getting started

```bash
npm install
node db/init.mjs      # create and seed portfolio.db
npm run dev
```

Copy `.env.local.example` to `.env.local` and fill in your SMTP credentials to enable the contact form.

Open [http://localhost:3000](http://localhost:3000).

## Architecture decisions

### Next.js App Router

App Router provides Server Components, file-based routing, and native Server Actions. Server Components run exclusively on the server, which allows direct synchronous SQLite access without a REST API layer — the controller is called directly inside the page function.

### SQLite + better-sqlite3 over Prisma / Drizzle

For a read-mostly portfolio with a fixed schema and a single owner, SQLite avoids the need for a separate database server. `better-sqlite3` has a **synchronous API** that aligns naturally with Server Components (no `await` required in the data layer). Using raw SQL over an ORM gives full control over queries and is more instructive for learning.

### OOP / MVC architecture over standard Next.js conventions

Most Next.js applications query the database directly from Server Components (typically via Prisma). The MVC layering here is intentional over-engineering — the goal is to practise clean architecture patterns: separation of concerns, single responsibility, and constructor-based dependency injection. A concrete secondary benefit is extensibility: adding a protected admin interface in the future (create/update projects and roles via a form) will not require restructuring the data layer.

### No dependency injection container

Angular-style DI libraries (tsyringe, InversifyJS) require `experimentalDecorators` and `reflect-metadata`, which can conflict with Next.js internals. Given the small number of classes and the absence of mutable shared state, manual constructor injection — wired once at the top of each controller file — achieves the same decoupling without the overhead of a container.

### CSS Modules over Tailwind

Component-scoped CSS keeps styles co-located with their component, avoids class-name collisions, and produces readable CSS close to the standard. Global design tokens (colours, spacing, typography scale) are declared once in `app/globals.css` as CSS custom properties and reused everywhere.

## Key conventions

- Files: `kebab-case` — Classes/Components/Types: `PascalCase` — Variables/functions: `camelCase`
- No inline comments — JSDoc on every exported class and method
- CSS custom properties in `app/globals.css`, component styles in co-located `.module.css` files
- SOLID principles applied to all service and library classes
