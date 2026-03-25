import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Initializing Supabase with URL:', supabaseUrl)

const hasValidUrl = Boolean(supabaseUrl && supabaseUrl.startsWith('https://'))
const hasAnonKey = Boolean(supabaseAnonKey)

if (!hasValidUrl || !hasAnonKey) {
  console.error('Invalid Supabase config', {
    supabaseUrl,
    hasAnonKey,
    hasValidUrl,
  })
}

export const supabase: SupabaseClient | null =
  hasValidUrl && hasAnonKey
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : null

