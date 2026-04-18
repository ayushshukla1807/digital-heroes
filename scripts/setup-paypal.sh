#!/usr/bin/env bash
# Setup script - run after obtaining PayPal sandbox credentials.
# Usage: bash scripts/setup-paypal.sh

set -e

echo "→ Adding PayPal environment variables to Vercel..."

read -p "NEXT_PUBLIC_PAYPAL_CLIENT_ID: " PAYPAL_CLIENT_ID
read -p "PAYPAL_CLIENT_SECRET: " PAYPAL_SECRET
read -p "PAYPAL_PLAN_BASIC_MONTHLY (P-...): " PLAN_BM
read -p "PAYPAL_PLAN_BASIC_YEARLY (P-...): " PLAN_BY
read -p "PAYPAL_PLAN_PRO_MONTHLY (P-...): " PLAN_PM
read -p "PAYPAL_PLAN_PRO_YEARLY (P-...): " PLAN_PY

echo "$PAYPAL_CLIENT_ID" | npx vercel env add NEXT_PUBLIC_PAYPAL_CLIENT_ID production
echo "$PAYPAL_SECRET"    | npx vercel env add PAYPAL_CLIENT_SECRET production
echo "true"              | npx vercel env add PAYPAL_SANDBOX production
echo "$PLAN_BM"          | npx vercel env add PAYPAL_PLAN_BASIC_MONTHLY production
echo "$PLAN_BY"          | npx vercel env add PAYPAL_PLAN_BASIC_YEARLY production
echo "$PLAN_PM"          | npx vercel env add PAYPAL_PLAN_PRO_MONTHLY production
echo "$PLAN_PY"          | npx vercel env add PAYPAL_PLAN_PRO_YEARLY production

echo ""
echo "✓ All variables set. Triggering production redeploy..."
npx vercel --prod --yes

echo ""
echo "✓ Done. PayPal subscriptions are live."
