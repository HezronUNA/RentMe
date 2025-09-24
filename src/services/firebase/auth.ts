import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './index'

const provider = new GoogleAuthProvider()
// Forzar selección de cuenta siempre para permitir cambio de cuenta
provider.setCustomParameters({ 
  prompt: 'select_account',
  // Fuerza mostrar el selector de cuenta incluso si ya hay una sesión activa
  hd: '*' 
})

export async function signInWithGoogle() {
  await setPersistence(auth, browserLocalPersistence)
  
  // Configurar provider con parámetros para forzar selección de cuenta
  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ 
    prompt: 'select_account',
    // Fuerza mostrar el selector de cuenta incluso si ya hay una sesión activa
    hd: '*' 
  })
  
  const result = await signInWithPopup(auth, googleProvider)
  // Puedes leer el token si lo necesitas para llamadas a APIs:
  // const idToken = await result.user.getIdToken()
  return result.user
}

export async function signOut() {
  await fbSignOut(auth)
}

export async function switchGoogleAccount() {
  // Primero cerrar sesión para limpiar cualquier estado previo
  await fbSignOut(auth)
  
  // Crear un nuevo provider con configuración específica para cambio de cuenta
  const switchProvider = new GoogleAuthProvider()
  switchProvider.setCustomParameters({ 
    prompt: 'select_account consent',
    // Fuerza que Google muestre todas las opciones de cuenta disponibles
    include_granted_scopes: 'true'
  })
  
  await setPersistence(auth, browserLocalPersistence)
  const result = await signInWithPopup(auth, switchProvider)
  return result.user
}

export function onAuthChanged(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb)
}
