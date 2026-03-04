/**
 * Supabase Service - Entry Point
 * 
 * Exporta todos los servicios de Supabase de forma centralizada
 * Similar a la configuración de Firebase
 */

// Cliente principal
export { supabase, supabaseAdmin } from '@/api/supabase/client'

// Configuración
export { supabaseConfig } from '@/api/supabase/config'

// Servicios de autenticación
export {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  switchGoogleAccount,
  getCurrentUser,
  getCurrentSession,
  onAuthStateChanged,
  resetPassword,
  updatePassword,
} from '@/api/supabase/auth'

// Servicios de datos
export {
  getHospedajesDestacados,
} from '@/services/hospedajes.service'

