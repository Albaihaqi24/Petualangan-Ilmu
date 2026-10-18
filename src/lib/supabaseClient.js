import { createClient } from '@supabase/supabase-js'
import { readConfig } from './config'
let singleton
export function getSupabaseClient() {
  const config = readConfig()
  if (config.mode !== 'supabase' || config.error)
    throw new Error(config.error || 'Mode Supabase belum aktif.')
  singleton ||= createClient(config.url, config.key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  })
  return singleton
}
