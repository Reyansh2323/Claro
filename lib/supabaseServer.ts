import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  const cookieStore = await cookies()

  // Hard-coded Supabase project connection to guarantee local usage
  const supabaseUrl = 'https://ylnltxydlloiserniebp.supabase.co'
  const supabaseAnonKey = 'sb_publishable_GKLOIT3WjDGlIjns5XZlmw_0iHshOO4'

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
