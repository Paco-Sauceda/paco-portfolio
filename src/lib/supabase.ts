import { createClient } from '@supabase/supabase-js'

const fallbackUrl = 'https://demo.supabase.co'
const fallbackPublishableKey = 'demo-publishable-key'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? fallbackUrl
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  fallbackPublishableKey

export const hasSupabaseConfig =
  supabaseUrl !== fallbackUrl && supabasePublishableKey !== fallbackPublishableKey

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})