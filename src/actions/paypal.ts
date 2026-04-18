"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "@/lib/database.types"
import { verifySubscription } from "@/lib/paypal"

type ConfirmResult = { success: true } | { success: false; error: string }

export async function confirmPayPalSubscriptionAction(
  subscriptionId: string,
  plan: "basic" | "pro",
  billingCycle: "monthly" | "yearly"
): Promise<ConfirmResult> {
  if (!subscriptionId) {
    return { success: false, error: "Missing subscription ID." }
  }

  let subscriptionData: { status: string; planId: string; subscriberId: string }

  try {
    subscriptionData = await verifySubscription(subscriptionId)
  } catch {
    return { success: false, error: "Could not verify subscription with PayPal." }
  }

  if (subscriptionData.status !== "ACTIVE") {
    return { success: false, error: `Subscription is not active (status: ${subscriptionData.status}).` }
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

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_plan: plan as any,
        subscription_status: "active",
        paypal_subscription_id: subscriptionId,
      } as any)
      .eq("id", user.id)

    if (error) console.warn("Supabase profile update failed:", error.message)
  }

  revalidatePath("/dashboard")
  return { success: true }
}
