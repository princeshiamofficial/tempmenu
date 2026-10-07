# MenuSnap — Platform Architecture

This document describes the intended production architecture behind the
landing page. The marketing site is fully implemented; everything under
"backend integration points" is prepared but intentionally **not wired to a
live payment gateway / database yet**. Nothing here is fake: API routes
validate input server-side and return structured responses, and no account
is ever activated from client-side state.

---

## 1. Repository layout

```
src/
  app/
    page.tsx                  # Landing page (all sections)
    layout.tsx                # Fonts + global SEO metadata
    checkout/page.tsx         # Checkout UI (reads ?plan&period&coupon)
    login/page.tsx            # Login placeholder (launch-gated)
    legal/[slug]/page.tsx     # Terms / Privacy / Refund outlines
    api/
      checkout/route.ts          # POST — create gateway session
      payments/verify/route.ts   # POST — server-side payment verification
      subscriptions/activate/route.ts # POST — activate subscription
      auth/setup/route.ts        # POST — send secure account-setup email
    robots.ts / sitemap.ts
  components/                # Section components (server + client islands)
  lib/
    data.ts                  # Content + sample reference data
    analytics.ts             # Funnel event tracking hooks
    checkout.ts              # Client checkout helper (endpoint contract)
    validation.ts            # Server-side input validation
  types/index.ts             # Shared data models + API contracts
```

## 2. Purchase flow (secure by design)

```
User selects plan (Pricing / Checkout)
        │
        ▼
POST /api/checkout          ← server validates name/email/BD-phone/plan/period/coupon
        │                     (see src/app/api/checkout/route.ts)
        ▼
Gateway hosted payment page (bKash / Nagad / SSLCommerz — TBD env config)
        │
        ├── browser success URL (NEVER trusted for activation)
        └── gateway webhook / IPN
                │
                ▼
POST /api/payments/verify   ← server verifies transaction with gateway SDK
        │                     marks Payment row "completed"
        ▼
POST /api/subscriptions/activate  ← transactional:
        1. Create/update User (role: customer | agency by plan)
        2. Create Subscription { plan, billingPeriod, startDate, expiryDate }
        3. Generate secure account-setup token (random ≥32 bytes, stored hashed,
           single-use, expiry ~24h)
        4. Email setup/magic-login link (POST /api/auth/setup)
        │
        ▼
User sets password (argon2id/bcrypt) or clicks magic link → dashboard
```

**Rules**

- Activation is driven **only** by the server-side verification/webhook
  path. A client-rendered "Payment successful" screen never activates an
  account.
- Payment credentials (gateway API keys, secrets) live in environment
  variables on the server only — never `NEXT_PUBLIC_*`, never in the bundle.
- Amounts are recomputed on the server from `PLANS` + billing period;
  coupon discounts are validated server-side (see `/api/checkout`).

## 3. Environment variables (expected at launch)

| Variable | Purpose |
| --- | --- |
| `PAYMENT_GATEWAY` | `"configured"` + gateway SDK envs (store id, secret, base URL) |
| `DATABASE_URL` | Postgres/MySQL connection (row-level security ready) |
| `EMAIL_PROVIDER` | `"configured"` + SMTP/transactional provider keys |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL / OG base |
| `SESSION_SECRET` | Session + CSRF signing secret |
| `AUTH_SECRET` | Account-setup token signing secret |

## 4. Data model

Defined as TypeScript contracts in `src/types/index.ts`, mirrored 1:1 to the
database schema at launch:

`User` → `Subscription` (plan, billingPeriod, start/expiry, status)
`Restaurant` → `MenuCategory` → `MenuItem` (referencePrice, lastVerifiedAt)
`UserMenu` → `UserMenuItem` (user's own prices/names/order)
`Coupon` (discountType fixed|percent, validity window, usage limit)
`Payment` (amount, status, transactionId, gateway)

**Scaling beyond 500 restaurants:** paginate `Restaurant`/`MenuItem` queries,
index `MenuItem(referencePrice, categoryId)` and `Restaurant(category,
location)`, add a search index (e.g. Postgres FTS or Meilisearch) for the
item search, and cache hot reference data (Redis or CDN) with a
`lastVerifiedAt`-driven refresh job.

## 5. Authentication

Planned flows: login, logout, forgot password, set password, session
management, optional email verification.

- **Never** store or email plain-text passwords.
- Passwords hashed server-side with a modern KDF (argon2id/bcrypt).
- Account setup via single-use expiring tokens / magic links only.
- Sessions: secure, HttpOnly, SameSite cookies; CSRF protection on state
  changes; rate limiting on login/setup endpoints.

## 6. Admin readiness

The data model + API layer is shaped so a separate admin app (or
`/admin/*` routes behind an `admin` role) can manage: restaurants, menu
categories, items, reference prices, users, subscriptions, payments,
coupons, plans, agency accounts, and content. No admin panel is bundled
into the marketing site by design.

## 7. Security checklist

- Server-side payment verification (webhook/signature) — never client state
- Input validation + sanitization on every API route (`lib/validation.ts`)
- Parameterized/safe queries via an ORM/query builder at launch
- Secure cookies, CSRF protection, rate-limiting readiness
- XSS: React escaping + sanitize any rich content
- Secrets only in server env vars; nothing exposed to the frontend

## 8. Data accuracy & legal posture

- Restaurant menus belong to their owners; MenuSnap presents them as
  **research information** ("Menu Reference", "Listed Price Reference").
- We avoid claims like "guaranteed market price" or "guaranteed profitable
  menu". The product copy and legal pages use reference language
  consistently (see footer microcopy, price disclaimer, FAQ).
- Prices may change; final pricing decisions rest with each business.

## 9. Analytics

`lib/analytics.ts` exposes `trackEvent(name, props)` pushing to
`window.dataLayer`/`gtag` (no-op if absent). Wired events:
`hero_cta_clicked`, `demo_started`, `demo_completed`, `pricing_viewed`,
`billing_period_changed`, `coupon_used`, `plan_selected`,
`checkout_started`, `payment_success`, `faq_opened`, `final_cta_clicked`,
`mobile_cta_clicked`, `add_to_menu`, `explorer_filter`.
