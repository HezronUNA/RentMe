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
// Opcional: forzar selección de cuenta siempre
// provider.setCustomParameters({ prompt: 'select_account' })

export async function signInWithGoogle() {
  await setPersistence(auth, browserLocalPersistence)
  const result = await signInWithPopup(auth, provider)
  // Puedes leer el token si lo necesitas para llamadas a APIs:
  // const idToken = await result.user.getIdToken()
  return result.user
}

export async function signOut() {
  await fbSignOut(auth)
}

export function onAuthChanged(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb)
}
