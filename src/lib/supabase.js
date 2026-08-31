import { createClient } from '@supabase/supabase-js'

/** Public client config — anon key is safe to ship in the frontend bundle. */
const DEFAULT_URL = 'https://onmrhwoabafsaocwbxjb.supabase.co'
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubXJod29hYmFmc2FvY3dieGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNjc0MjYsImV4cCI6MjEwMzc0MzQyNn0.DYYhSPtuckhuswhwrwYx3H9YrO78ygf15kvvMiPnzWs'

const url = import.meta.env.VITE_SUPABASE_URL || DEFAULT_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

export const ADMIN_EMAIL = 'haider@gmail.com'

export function getPublicStorageUrl(bucket, path) {
  if (!url || !path) return path
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path
  }
  return `${url}/storage/v1/object/public/${bucket}/${path.replace(/^\//, '')}`
}
