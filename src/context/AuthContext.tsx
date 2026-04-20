import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { hasSupabaseConfig, supabase } from '../lib/supabase'

interface AuthContextValue {
  user: User | null
  session: Session | null
  isAdmin: boolean
  loading: boolean
  hasSupabaseConfig: boolean
  signInAdmin: (email: string, password: string) => Promise<string | null>
  signOutAdmin: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
  .split(',')
  .map((value: string) => value.trim().toLowerCase())
  .filter(Boolean)

const canAccessAdmin = (email?: string | null) => {
  if (!email) {
    return false
  }

  const normalizedEmail = email.toLowerCase()

  if (adminEmails.length === 0) {
    return true
  }

  return adminEmails.includes(normalizedEmail)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const isAdmin = canAccessAdmin(user?.email)

  useEffect(() => {
    let isMounted = true

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) {
          return
        }

        setSession(data.session)
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setSession(null)
        setUser(null)
        setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return
      }

      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInAdmin = async (email: string, password: string) => {
    if (!hasSupabaseConfig) {
      return 'Configura VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY para activar el acceso admin.'
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        return error.message
      }

      if (!canAccessAdmin(data.user?.email)) {
        await supabase.auth.signOut()
        return 'Tu usuario no tiene permisos para el panel admin.'
      }

      return null
    } catch {
      return 'No fue posible conectar con Supabase. Revisa tus variables de entorno.'
    }
  }

  const signOutAdmin = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        hasSupabaseConfig,
        signInAdmin,
        signOutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}