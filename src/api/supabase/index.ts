/**
 * Supabase Service - Entry Point
 * 
 * Exporta todos los servicios de Supabase de forma centralizada
 * Similar a la configuración de Firebase
 */

// Cliente principal
export { supabase, supabaseAdmin } from './client'

// Configuración
export { supabaseConfig } from './config'

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
} from './auth'

// Servicios de datos
export {
  getHospedajesDestacados,
} from '../../services/hospedajes.service'
