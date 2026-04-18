import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://tdlcddnbjgoajytfgwvh.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbGNkZG5iamdvYWp5dGZnd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjg4NDMsImV4cCI6MjA5MTkwNDg0M30.kSrKkLVnhQKZ2HgKLqIZRBOcYEtRoV1jG255DPvzNWc',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
