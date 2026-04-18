# Digital Heroes — Submission

**Candidate:** Ayush Shukla
**Role:** Full Stack Intern
**Deadline:** April 18, 2026 — 9:00 AM
**Submitted:** On time ✅

---

## Live URL

> **https://digital-heroes-umber.vercel.app**

---

## GitHub Repository

> **https://github.com/ayushshukla1807/digital-heroes**

---

## Quick Demo Guide (For Evaluator)

### 1. User Flow
1. Visit [/signup](https://digital-heroes-umber.vercel.app/signup)
2. Create account → select a charity → confirm
3. You land on [/dashboard](https://digital-heroes-umber.vercel.app/dashboard)
4. Enter a golf score (1–45 Stableford) with today's date
5. Notice duplicate-date validation if you add the same date again
6. Adjust charity contribution slider (10%–100%)
7. Go to [/dashboard/checkout](https://digital-heroes-umber.vercel.app/dashboard/checkout) → choose Monthly/Yearly → PayPal

### 2. Admin Flow
1. Visit [/admin](https://digital-heroes-umber.vercel.app/admin)
2. **Draw Engine tab** → Toggle Random/Algorithmic → click "Simulate / Pre-Analysis" → watch animated number reveal → "Publish Results"
3. **Winner Verification tab** → click "Approve" on a winner → then "Mark Paid" — this is the Pending → Paid flow
4. **Charity Manager tab** → Add a new partner org with the form → watch it appear → delete it
5. **Reports & Analytics tab** → View prize pool by draw, charity totals, draw stats table

### 3. Auditor Flow (Bonus Role)
1. Visit [/auditor](https://digital-heroes-umber.vercel.app/auditor) — read-only revenue overview with Recharts chart
2. [/auditor/draws](https://digital-heroes-umber.vercel.app/auditor/draws) — expand any draw to see winner breakdown
3. [/auditor/charities](https://digital-heroes-umber.vercel.app/auditor/charities) — see fund flow per charity with transfer status

---

## What Sets This Apart

| Feature | Most Candidates | This Submission |
|---|---|---|
| Subscription payment | Skip or mock | Real PayPal REST API with sandbox plans |
| Roles | 2 (User + Admin) | **3 + bonus Auditor** read-only transparency role |
| Draw Engine | Static button | Animated slot-machine simulation with publish gate |
| Score Validation | Basic input | **1–45 range + duplicate date guard + delete** |
| Charity page | List only | **Search bar + 5 category filters** |
| Prize Pool | Single amount | **3-tier breakdown (40/35/25%)** with jackpot rollover |
| Winner flow | Basic table | **Pending → Approved → Paid** with proof upload |
| Currency | Generic £ | **₹ INR with accurate Indian pricing** |
| Docs | Minimal | Full README with API docs, DB schema, test credentials |

---

## Technical Highlights

```
Next.js 14 App Router + TypeScript
Supabase PostgreSQL + Row Level Security
PayPal REST API — Subscriptions v1 (real sandbox plans)
Framer Motion — draw engine animation, micro-interactions
Recharts — revenue timeline, Stableford trend
Server Actions — no exposed API routes for mutation
Webhook handler — async event lifecycle (BILLING.SUBSCRIPTION.*)
```

---

## Test Credentials

| Role | Email | Password | Access |
|---|---|---|---|
| User | user@test.com | Test@1234 | Dashboard, Checkout, Proof Upload |
| Admin | admin@test.com | Admin@1234 | Admin Terminal (all 5 tabs) |
| Auditor | auditor@test.com | Audit@1234 | Read-only Transparency Portal |
