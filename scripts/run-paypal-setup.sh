#!/usr/bin/env bash
# Run this script after pasting your PayPal credentials below.
# Usage: bash scripts/run-paypal-setup.sh

set -e

# ── PASTE YOUR VALUES HERE ──────────────────────────
PAYPAL_CLIENT_ID="AcFcIftVGS4sZ4BoqOv0TZ80YoT173EYW9AAb8XvOdqjaFEeCI-UBc5n48SFKwF1SJ3nAx9yWecwCgss"
PAYPAL_SECRET="ELatLYUEyHBRmPEKgWT-HUdhn4Y562lCIAfWDh6ZZH5js-5TCEbiLX4RND9XPX7mxayMvqLOTgi57R2Q"
# ────────────────────────────────────────────────────

if [[ -z "$PAYPAL_CLIENT_ID" || -z "$PAYPAL_SECRET" ]]; then
  echo "Error: Fill in PAYPAL_CLIENT_ID and PAYPAL_SECRET at the top of this script."
  exit 1
fi

API="https://api-m.sandbox.paypal.com"

echo "→ Step 1: Fetching access token..."
TOKEN=$(curl -s -X POST "$API/v1/oauth2/token" \
  -H "Accept: application/json" \
  -u "$PAYPAL_CLIENT_ID:$PAYPAL_SECRET" \
  -d "grant_type=client_credentials" | python3 -c "import sys,json; d=json.load(sys.stdin); t=d.get('access_token'); print(t) if t else (print('AUTH FAILED:',d) or exit(1))")

echo "✓ Token obtained."

echo ""
echo "→ Step 2: Creating PayPal Product..."
PRODUCT_ID=$(curl -s -X POST "$API/v1/catalogs/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Digital Heroes Subscription",
    "description": "Golf performance tracking with monthly charity prize draws.",
    "type": "SERVICE",
    "category": "SOFTWARE"
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR: '+str(d)))")

echo "✓ Product ID: $PRODUCT_ID"

create_plan() {
  local NAME=$1
  local AMOUNT=$2
  local INTERVAL=$3
  curl -s -X POST "$API/v1/billing/plans" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"product_id\": \"$PRODUCT_ID\",
      \"name\": \"$NAME\",
      \"status\": \"ACTIVE\",
      \"billing_cycles\": [{
        \"frequency\": { \"interval_unit\": \"$INTERVAL\", \"interval_count\": 1 },
        \"tenure_type\": \"REGULAR\",
        \"sequence\": 1,
        \"total_cycles\": 0,
        \"pricing_scheme\": { \"fixed_price\": { \"value\": \"$AMOUNT\", \"currency_code\": \"GBP\" } }
      }],
      \"payment_preferences\": {
        \"auto_bill_outstanding\": true,
        \"payment_failure_threshold\": 1
      }
    }" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id','ERROR: '+str(d)))"
}

echo ""
echo "→ Step 3: Creating 4 subscription plans..."

PLAN_BASIC_MONTHLY=$(create_plan "Digital Heroes — Hobbyist Monthly" "9.00" "MONTH")
echo "PAYPAL_PLAN_BASIC_MONTHLY=$PLAN_BASIC_MONTHLY"

PLAN_BASIC_YEARLY=$(create_plan "Digital Heroes — Hobbyist Yearly" "89.00" "YEAR")
echo "PAYPAL_PLAN_BASIC_YEARLY=$PLAN_BASIC_YEARLY"

PLAN_PRO_MONTHLY=$(create_plan "Digital Heroes — Digital Hero Monthly" "24.00" "MONTH")
echo "PAYPAL_PLAN_PRO_MONTHLY=$PLAN_PRO_MONTHLY"

PLAN_PRO_YEARLY=$(create_plan "Digital Heroes — Digital Hero Yearly" "239.00" "YEAR")
echo "PAYPAL_PLAN_PRO_YEARLY=$PLAN_PRO_YEARLY"

echo ""
echo "→ Step 4: Writing .env.local..."
cat > .env.local <<EOF
NEXT_PUBLIC_PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=$PAYPAL_SECRET
PAYPAL_SANDBOX=true
PAYPAL_PLAN_BASIC_MONTHLY=$PLAN_BASIC_MONTHLY
PAYPAL_PLAN_BASIC_YEARLY=$PLAN_BASIC_YEARLY
PAYPAL_PLAN_PRO_MONTHLY=$PLAN_PRO_MONTHLY
PAYPAL_PLAN_PRO_YEARLY=$PLAN_PRO_YEARLY
EOF
echo "✓ .env.local written."

echo ""
echo "→ Step 5: Pushing env vars to Vercel..."
echo "$PAYPAL_CLIENT_ID" | npx vercel env add NEXT_PUBLIC_PAYPAL_CLIENT_ID production --force
echo "$PAYPAL_SECRET"    | npx vercel env add PAYPAL_CLIENT_SECRET production --force
echo "true"              | npx vercel env add PAYPAL_SANDBOX production --force
echo "$PLAN_BASIC_MONTHLY" | npx vercel env add PAYPAL_PLAN_BASIC_MONTHLY production --force
echo "$PLAN_BASIC_YEARLY"  | npx vercel env add PAYPAL_PLAN_BASIC_YEARLY production --force
echo "$PLAN_PRO_MONTHLY"   | npx vercel env add PAYPAL_PLAN_PRO_MONTHLY production --force
echo "$PLAN_PRO_YEARLY"    | npx vercel env add PAYPAL_PLAN_PRO_YEARLY production --force
echo "✓ Vercel env vars set."

echo ""
echo "→ Step 6: Deploying to production..."
npx vercel --prod --yes

echo ""
echo "══════════════════════════════════════"
echo "✓ PayPal subscriptions fully live!"
echo "  Webhook URL to register in PayPal:"
echo "  https://digital-heroes-umber.vercel.app/api/webhooks/paypal"
echo "══════════════════════════════════════"
