import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ADMIN_EMAIL, isSupabaseConfigured, supabase } from '../lib/supabase'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      const ok =
        session?.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
      setAuthenticated(ok)
      setUser(ok ? session.user : null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const ok =
        session?.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
      setAuthenticated(ok)
      setUser(ok ? session.user : null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Check your environment variables.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) throw error

    if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      await supabase.auth.signOut()
      throw new Error('This account is not authorized for admin access.')
    }

    return true
  }, [])

  const logout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setAuthenticated(false)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ authenticated, user, loading, login, logout }),
    [authenticated, user, loading, login, logout],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
