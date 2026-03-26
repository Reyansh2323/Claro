import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Hard-coded Supabase project connection to guarantee local usage
  const supabaseUrl = 'https://ylnltxydlloiserniebp.supabase.co'
  const supabaseAnonKey = 'sb_publishable_GKLOIT3WjDGlIjns5XZlmw_0iHshOO4'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
