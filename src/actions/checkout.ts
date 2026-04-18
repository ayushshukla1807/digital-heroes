"use server"

import { revalidatePath } from "next/cache"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from "@/lib/database.types"
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/checkout"

export async function processCheckoutAction(data: CheckoutInput) {
  const parsed = checkoutSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
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
      .from('profiles')
      .update({
        subscription_plan: parsed.data.plan as any,
        subscription_status: 'active',
      })
      .eq('id', user.id)

    if (error) console.warn('Profile update failed:', error.message)
  }

  revalidatePath('/dashboard')
  return { success: true }
}
