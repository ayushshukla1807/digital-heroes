# Digital Heroes — Full Stack Intern Assignment

> **Live URL:** https://digital-heroes-topaz.vercel.app
> **Role Applied:** Full Stack Intern · Digital Heroes
> **Submitted by:** Ayush Shukla

---

## Assignment Overview

Built a fully functional, production-deployed web application from scratch based on the provided PRD. The platform combines golf performance tracking, a monthly draw engine, PayPal subscription billing, and a charitable giving model.

**What makes this submission different?**
- **Brand Match:** Tailored entirely to the Digital Heroes brand using your exact cyan (`#06b6d4`), Space Grotesk typography, and "Orbital" copy language.
- **Evaluator Access Panel:** A custom-engineered floating panel that gives the evaluator instant, one-click access and copying to the 3 required roles.
- **Lucknow Heritage:** Honoring the fact that Digital Heroes is a Lucknow-born company, built by a candidate from the same city.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, Recharts |
| **Backend** | Next.js API Routes (Node.js), Server Actions |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (session-based, JWT) |
| **Payments** | PayPal REST API (Subscriptions v1) |
| **Deployment** | Vercel (CI/CD via git push) |
| **Version Control** | Git + GitHub |

---

## PRD Requirements Fulfilled

### §03 — User Roles (3 Roles)
- **Public Visitor** — Homepage, Charities directory, How It Works
- **Registered Subscriber** — Full dashboard with score entry, charity selection, draw participation, winner proof upload
- **Administrator** — Admin Terminal with 5 tabs: System Metrics, Draw Engine, Charity Manager, Winner Verification, Reports & Analytics
- **Auditor (bonus)** — Read-only transparency portal: Revenue Overview, Draw History, Charity Ledger

### §04 — Subscription & Payment
- Monthly and Yearly plans (Hobbyist ₹749/mo, Digital Hero ₹1,999/mo)
- PayPal REST API subscription plans created programmatically via script
- Webhook handler at `/api/webhooks/paypal` for `BILLING.SUBSCRIPTION.*` events
- Real-time subscription status validation on every authenticated request

### §05 — Score Management (Stableford)
- Input range: 1–45 (validated, rejects out-of-range)
- Date required on every entry
- Duplicate-date guard (one score per date, displays error message)
- Rolling 5-score buffer: new entry evicts oldest
- Displayed in reverse chronological order (newest first)
- Delete button per score card on hover

### §06 — Draw & Reward System
- Draw mode toggle: Random Generation vs. Algorithmic (weighted)
- Animated slot-machine draw simulation with per-ball reveal
- Pre-analysis / simulation mode before publishing
- Admin-controlled publish button
- Jackpot rollover alert when no 5-number match winner

### §07 — Prize Pool Logic
| Match | Pool Share | Jackpot |
|---|---|---|
| 5-Number Match | 40% | Yes (rolls over) |
| 4-Number Match | 35% | No |
| 3-Number Match | 25% | No |

Auto-calculated from active subscriber count, displayed with ₹ amounts per tier.

### §08 — Charity System
- Charity selected at signup from verified directory
- Contribution slider: 10% minimum, up to 100% (voluntary increase)
- Projected impact chart updates in real-time as slider moves
- Charity directory: search by name/description/category + 5 category filters
- Empty state shown when no results match

### §09 — Winner Verification
- Drag-and-drop proof upload (screenshot of golf scores)
- Submit for Admin Review → status: Pending → Approved → Paid
- Admin side: Approve/Reject buttons, then "Mark Paid" step
- Proof Reference column shown in settlement ledger

### §10 — User Dashboard
All 5 required modules:
1. Subscription Status (active / renewal date)
2. Score Entry & Edit (Stableford, validation)
3. Charity contribution percentage + change charity
4. Participation summary (draws entered, upcoming draw)
5. Winnings overview + proof upload (winner-only)

### §11 — Admin Dashboard
Full capabilities across 5 tabs:
- System Metrics + Audit Log
- Draw Engine (mode, prize tiers, simulate, publish)
- Charity Manager (add/edit/delete partners)
- Winner Verification (Pending → Approved → Paid flow)
- Reports & Analytics (users, prize pools, charity distribution, draw history table)

### §12 — UI/UX
- Brand synchronized: Uses Digital Heroes custom `#06b6d4` cyan, Space Grotesk fonts, and space/orbit imagery matching the main digitalheroes.co.in site.
- Emotion-driven: glassmorphism dark UI with cyan + amber accent system
- Micro-animations: draw slot machine, live ticker, chart reveals, framer-motion transitions
- Frictionless Evaluation: Floating Evaluator Access Panel globally injected for instant role-switching.

### §13 — Technical
- Mobile-first responsive layout (`sm:`, `md:`, `lg:` breakpoints throughout)
- HTTPS enforced via Vercel
- Supabase session-based auth with middleware route protection
- PayPal 256-bit SSL + vault subscriptions

### §15 — Mandatory Deliverables
- ✅ Live deployed URL (Vercel)
- ✅ New Vercel account (not personal)
- ✅ New Supabase project with schema migrations
- ✅ Environment variables properly configured
- ✅ Source code: clean, typed, structured, no code smells

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/webhooks/paypal` | PayPal event handler (BILLING.SUBSCRIPTION.*, PAYMENT.SALE.COMPLETED) |
| `POST` (Server Action) | `confirmPayPalSubscriptionAction` | Verifies subscription via PayPal REST API, upserts to Supabase |
| `POST` (Server Action) | `cancelSubscriptionAction` | Cancels active subscription via PayPal REST API |

---

## Database Schema

```sql
-- users table (managed by Supabase Auth)
-- subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  paypal_subscription_id TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL,          -- 'basic' | 'pro'
  billing_cycle TEXT NOT NULL, -- 'monthly' | 'yearly'
  status TEXT NOT NULL,        -- 'active' | 'cancelled' | 'lapsed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- scores table
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 45), -- Stableford range
  scored_at DATE NOT NULL,
  UNIQUE (user_id, scored_at) -- one score per date per user
);
```

---

## Scripts

```bash
# Create PayPal product + subscription plans (generates plan IDs)
chmod +x scripts/run-paypal-setup.sh
./scripts/run-paypal-setup.sh

# Sets NEXT_PUBLIC_PAYPAL_PLAN_* env vars on Vercel automatically
# Triggers production redeploy
```

---

## Local Development

```bash
git clone <repo>
cd digital-heroes
npm install

# Copy and fill env vars
cp .env.example .env.local

npm run dev   # http://localhost:3000
```

### Required Environment Variables

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_SANDBOX=true
NEXT_PUBLIC_PAYPAL_PLAN_BASIC_MONTHLY=
NEXT_PUBLIC_PAYPAL_PLAN_BASIC_YEARLY=
NEXT_PUBLIC_PAYPAL_PLAN_PRO_MONTHLY=
NEXT_PUBLIC_PAYPAL_PLAN_PRO_YEARLY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Evaluation Criteria — Self Assessment

| Criterion | Approach |
|---|---|
| Requirements Interpretation | Read the full PRD before starting; every section mapped to a concrete implementation |
| System Design | Next.js App Router with Server Actions, Supabase RLS, PayPal webhooks for async state |
| UI/UX Creativity | Glassmorphism dark UI, animated draw engine, motion-enhanced micro-interactions |
| Data Handling | Stableford validation, 5-score rolling buffer, prize pool auto-calculation per tier |
| Scalability Thinking | Multi-country ready (INR), Supabase RLS per user, extensible plan/tier system |
| Problem-Solving | PayPal SSR hydration crash resolved by switching to vanilla SDK via `next/script` |

---

## Test Credentials

| Role | Email | Password |
|---|---|---|
| User | user@test.com | Test@1234 |
| Admin | admin@test.com | Admin@1234 |
| Auditor | auditor@test.com | Audit@1234 |

---

## Changelog

| Version | Date | Notes |
|---|---|---|
| v1.0.0 | Apr 16, 2026 | Initial build — homepage, auth, dashboard scaffold |
| v1.1.0 | Apr 16, 2026 | PayPal integration, webhook handler, checkout flow |
| v1.2.0 | Apr 17, 2026 | Admin draw engine, winner verification, charity CRUD |
| v1.3.0 | Apr 17, 2026 | Auditor transparency portal, draw history, charity ledger |
| v1.4.0 | Apr 17, 2026 | Score validation (Stableford 1–45, duplicate date guard) |
| v1.5.0 | Apr 18, 2026 | INR currency conversion, charity search/filter, final polish |
