const PAYPAL_API = process.env.PAYPAL_SANDBOX === 'true'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to get PayPal access token')
  const json = await res.json()
  return json.access_token
}

export async function verifySubscription(subscriptionId: string): Promise<{
  status: string
  planId: string
  subscriberId: string
}> {
  const token = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Failed to fetch subscription: ${subscriptionId}`)

  const data = await res.json()

  return {
    status: data.status,
    planId: data.plan_id,
    subscriberId: data.subscriber?.email_address ?? '',
  }
}

export async function cancelSubscription(subscriptionId: string, reason: string): Promise<void> {
  const token = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason }),
  })

  if (!res.ok) throw new Error(`Failed to cancel subscription: ${subscriptionId}`)
}

export const PAYPAL_PLAN_IDS: Record<string, Record<string, string>> = {
  basic: {
    monthly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_BASIC_MONTHLY ?? '',
    yearly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_BASIC_YEARLY ?? '',
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_MONTHLY ?? '',
    yearly: process.env.NEXT_PUBLIC_PAYPAL_PLAN_PRO_YEARLY ?? '',
  },
}




// PayPal Subscription plan IDs — NEXT_PUBLIC_ prefix required for client access
