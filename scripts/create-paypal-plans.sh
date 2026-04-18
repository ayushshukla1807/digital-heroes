#!/usr/bin/env bash
# Creates the 4 required PayPal subscription plans via REST API.
# Run ONCE after getting your sandbox credentials.
#
# Usage: PAYPAL_CLIENT_ID=xxx PAYPAL_SECRET=yyy bash scripts/create-paypal-plans.sh

set -e

CLIENT_ID="${PAYPAL_CLIENT_ID:-$1}"
CLIENT_SECRET="${PAYPAL_SECRET:-$2}"
API="https://api-m.sandbox.paypal.com"

if [[ -z "$CLIENT_ID" || -z "$CLIENT_SECRET" ]]; then
  echo "Error: Set PAYPAL_CLIENT_ID and PAYPAL_SECRET env vars before running."
  exit 1
fi

echo "→ Fetching access token..."
TOKEN=$(curl -s -X POST "$API/v1/oauth2/token" \
  -H "Accept: application/json" \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d "grant_type=client_credentials" | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

echo "✓ Token obtained."

create_plan() {
  local NAME=$1
  local DESC=$2
  local AMOUNT=$3
  local INTERVAL=$4
  local INTERVAL_COUNT=$5

  curl -s -X POST "$API/v1/billing/plans" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"product_id\": \"DIGITAL_HEROES_GOLF\",
      \"name\": \"$NAME\",
      \"description\": \"$DESC\",
      \"billing_cycles\": [{
        \"frequency\": { \"interval_unit\": \"$INTERVAL\", \"interval_count\": $INTERVAL_COUNT },
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
echo "→ Creating 4 subscription plans..."
echo ""

echo -n "PAYPAL_PLAN_BASIC_MONTHLY="; create_plan "Digital Heroes — Hobbyist Monthly" "1 Draw Entry, Track 5 Scores, Basic Charity Selection" "9.00" "MONTH" 1
echo -n "PAYPAL_PLAN_BASIC_YEARLY=";  create_plan "Digital Heroes — Hobbyist Yearly"  "1 Draw Entry, Track 5 Scores, Basic Charity Selection" "89.00" "YEAR" 1
echo -n "PAYPAL_PLAN_PRO_MONTHLY=";   create_plan "Digital Heroes — Digital Hero Monthly" "3 Draw Entries, Priority Charity, Advanced Analytics" "24.00" "MONTH" 1
echo -n "PAYPAL_PLAN_PRO_YEARLY=";    create_plan "Digital Heroes — Digital Hero Yearly"  "3 Draw Entries, Priority Charity, Advanced Analytics" "239.00" "YEAR" 1

echo ""
echo "✓ Copy the P- plan IDs above and run: bash scripts/setup-paypal.sh"
