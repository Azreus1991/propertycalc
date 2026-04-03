import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
  return createClient<Database>(supabaseUrl, serviceKey)
}
