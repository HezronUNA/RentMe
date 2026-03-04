/**
 * Supabase Authentication Service
 * 
 * Servicio de autenticación compatible con Firebase Auth
 * Proporciona métodos similares para facilitar la migración
 */

import { supabase } from './client'
import type { User, Session, AuthError } from '@supabase/supabase-js'

/**
 * Registrar intento de login en la tabla de auditoría
 */
async function logLoginAttempt(
  email: string,
  success: boolean,
  reason?: string,
  userId?: string
) {
  try {
    await supabase.from('login_attempts').insert({
      email,
      success,
      reason,
      user_id: userId,
      ip_address: null, // Se puede obtener en backend
      user_agent: navigator.userAgent,
    })
  } catch (error) {
    console.error('Error logging login attempt:', error)
  }
}

/**
 * Sign in con Google (OAuth)
 * Similar a signInWithGoogle de Firebase
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account', // Forzar selección de cuenta
        },
      },
    })

    if (error) {
      await logLoginAttempt('google-oauth', false, error.message)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

/**
 * Sign in con email y contraseña
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      await logLoginAttempt(email, false, error.message)
      throw error
    }

    if (data.user) {
      await logLoginAttempt(email, true, 'success', data.user.id)
    }

    return data
  } catch (error) {
    console.error('Error signing in with email:', error)
    throw error
  }
}

/**
 * Sign up con email y contraseña
 */
export async function signUpWithEmail(email: string, password: string, metadata?: { nombre?: string }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

/**
 * Sign out
 * Compatible con Firebase signOut
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/**
 * Cambiar cuenta de Google
 * Similar a switchGoogleAccount de Firebase
 */
export async function switchGoogleAccount() {
  try {
    // Primero cerrar sesión
    await signOut()

    // Luego iniciar sesión con selección de cuenta
    return await signInWithGoogle()
  } catch (error) {
    console.error('Error switching Google account:', error)
    throw error
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Obtener sesión actual
 */
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error getting current session:', error)
    return null
  }
}

/**
 * Listener de cambios de autenticación
 * Compatible con onAuthStateChanged de Firebase
 */
export function onAuthStateChanged(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })

  // Retornar función de cleanup
  return () => {
    subscription.unsubscribe()
  }
}

/**
 * Reset password (enviar email)
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error resetting password:', error)
    throw error
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error updating password:', error)
    throw error
  }
}
