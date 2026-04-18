import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "@/lib/database.types"

const WEBHOOK_EVENTS = {
  BILLING_SUBSCRIPTION_ACTIVATED: "BILLING.SUBSCRIPTION.ACTIVATED",
  BILLING_SUBSCRIPTION_CANCELLED: "BILLING.SUBSCRIPTION.CANCELLED",
  BILLING_SUBSCRIPTION_EXPIRED: "BILLING.SUBSCRIPTION.EXPIRED",
  BILLING_SUBSCRIPTION_SUSPENDED: "BILLING.SUBSCRIPTION.SUSPENDED",
  PAYMENT_SALE_COMPLETED: "PAYMENT.SALE.COMPLETED",
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  let event: any

  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )

  const subscriptionId = event?.resource?.id as string | undefined

  switch (event.event_type) {
    case WEBHOOK_EVENTS.BILLING_SUBSCRIPTION_ACTIVATED: {
      if (subscriptionId) {
        await (supabase as any)
          .from("profiles")
          .update({ subscription_status: "active" })
          .eq("paypal_subscription_id", subscriptionId)
      }
      break
    }
    case WEBHOOK_EVENTS.BILLING_SUBSCRIPTION_CANCELLED:
    case WEBHOOK_EVENTS.BILLING_SUBSCRIPTION_EXPIRED:
    case WEBHOOK_EVENTS.BILLING_SUBSCRIPTION_SUSPENDED: {
      if (subscriptionId) {
        await (supabase as any)
          .from("profiles")
          .update({ subscription_status: "inactive", subscription_plan: "free" })
          .eq("paypal_subscription_id", subscriptionId)
      }
      break
    }
    case WEBHOOK_EVENTS.PAYMENT_SALE_COMPLETED: {
      console.log("Payment received for subscription:", subscriptionId)
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
