import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { onAuthChanged, signInWithGoogle, signOut, switchGoogleAccount } from '../services/firebase/auth'

type AuthCtx = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<User>
  signOut: () => Promise<void>
  switchGoogleAccount: () => Promise<User>
}
const Ctx = createContext<AuthCtx>({ 
  user: null, 
  loading: true,
  signInWithGoogle: async () => { throw new Error('AuthProvider not initialized') },
  signOut: async () => { throw new Error('AuthProvider not initialized') },
  switchGoogleAccount: async () => { throw new Error('AuthProvider not initialized') }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthChanged(u => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const contextValue: AuthCtx = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    switchGoogleAccount
  }

  return <Ctx.Provider value={contextValue}>{children}</Ctx.Provider>
}

export function useAuth() {
  return useContext(Ctx)
}
