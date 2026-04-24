/**
 * Supabase Configuration
 * 
 * Configuración centralizada para Supabase, similar a Firebase config
 */

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  serviceRoleKey: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
} as const

// Validación de variables requeridas
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file')
}
