import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ** Permanent Supabase key reset - hardcoded to exact approved values **
const supabaseUrl = 'https://ylnltxydlloiserniebp.supabase.co'
const supabaseAnonKey = 'sb_publishable_GKLOIT3WjDGlIjns5XZlmw_0iHshOO4'

console.log('Initializing Supabase with URL:', supabaseUrl)

const hasValidUrl = supabaseUrl.startsWith('https://')
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
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

