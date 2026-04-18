import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://tdlcddnbjgoajytfgwvh.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbGNkZG5iamdvYWp5dGZnd3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjg4NDMsImV4cCI6MjA5MTkwNDg0M30.kSrKkLVnhQKZ2HgKLqIZRBOcYEtRoV1jG255DPvzNWc'
  )
}
