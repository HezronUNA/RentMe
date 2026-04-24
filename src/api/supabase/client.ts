/**
 * Supabase Client
 * 
 * Cliente principal de Supabase configurado con opciones de autenticación persistente
 */

import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from './config'

/**
 * Cliente principal de Supabase para uso en el frontend
 * Incluye autenticación persistente y refresh automático de tokens
 */
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'rentme-auth',
      storage: window.localStorage,
    },
  }
)

/**
 * Cliente con service role para operaciones administrativas
 * ⚠️ SOLO USAR EN BACKEND O EDGE FUNCTIONS - NUNCA EXPONER EN CLIENTE
 */
export const supabaseAdmin = supabaseConfig.serviceRoleKey
  ? createClient(
      supabaseConfig.url,
      supabaseConfig.serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )
  : null

// Log de warning si no hay service role key configurada
if (!supabaseAdmin && import.meta.env.DEV) {
  console.warn('⚠️ Service Role Key not configured. Admin operations will be limited.')
}
