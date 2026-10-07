# MenuSnap — Landing Page

> **Research Less. Build Smarter.**
> MenuSnap is a restaurant menu research & menu builder SaaS for Bangladesh:
> explore menu references from 500+ restaurants and parlors, research food
> items and listed-price references, and build your own complete menu from
> one organized platform.

This repository contains the production-ready marketing site built with
**Next.js (App Router) + TypeScript + Tailwind CSS v4**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build + typecheck
npm run start     # serve the production build
npm run lint      # eslint
```

> This workspace was scaffolded with a portable Node.js runtime in
> `.tools/` (no system-wide install). Add `.tools/node-v…/` to `PATH` if
> your shell doesn't already have `node`.

## What's included

### Landing experience (single page, ~20 sections)

Navbar → Hero (interactive product mockup) → Stats → Problem →
Demo video (modal player) → How It Works → Restaurant Explorer →
Smart Search (typing demo) → Price Research (dark) → Menu Builder →
Feature bento → Benefits → Audience → Before/After → Pricing (toggle +
coupon) → Purchase flow → Testimonials (no fake reviews) → FAQ →
Final CTA → Footer, plus a sticky mobile purchase bar.

Every major mockup is a live UI: hero search/filters/add-to-menu,
explorer filtering, price-comparison tabs, menu builder (categories,
inline edit, reorder, duplicate, delete), pricing billing toggle and the
`MENUSNAP500` coupon, FAQ accordion, and demo modal.

### Frontend quality

- Server components with small client islands; no heavy animation libs
- Scroll reveal with reduced-motion + instant-jump safety
- Mobile-first responsive, zero horizontal overflow (verified 390/768/1280)
- Semantic HTML, heading hierarchy, ARIA, visible focus states, skip link
- SEO: metadata, Open Graph (generated `og.png`), Twitter, canonical,
  sitemap, robots, JSON-LD (`SoftwareApplication` + `FAQPage`)
- `prefers-reduced-motion` respected everywhere

### Architecture preparation (see `docs/ARCHITECTURE.md`)

- Data-model contracts (`src/types/index.ts`)
- API stubs: `/api/checkout`, `/api/payments/verify`,
  `/api/subscriptions/activate`, `/api/auth/setup` — real server-side
  validation, structured responses, and **501 until a gateway is
  configured**. No fake payment success, ever.
- Checkout page at `/checkout?plan=pro&period=3m&coupon=MENUSNAP500`
- Funnel analytics hooks (`src/lib/analytics.ts`)
- Secure-setup auth architecture (magic link / set-password, no plain text)

### Notes on reference data

Restaurant names, items and prices used in mockups are illustrative samples
for the UI. The product never claims ownership of third-party menus, and
displayed prices are listed-price references only. See footer microcopy and
`/legal/*`.

## Project structure

```
src/app         pages, layout, SEO routes, API stubs
src/components  section + UI components
src/lib         content data, analytics, validation, checkout client
src/types       shared data models & contracts
public          og.png, icon.svg
scripts         generate-og.mjs (OG image generator)
docs            ARCHITECTURE.md
```

## Environment

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG base URL (default `https://menusnap.app`) |
| `PAYMENT_GATEWAY` | Set to `configured` after gateway integration |
| `EMAIL_PROVIDER` | Set to `configured` after email integration |
