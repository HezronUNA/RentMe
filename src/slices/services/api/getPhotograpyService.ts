import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { PhotographyService } from '../sections/photograpyService/type'

const COLLECTION = 'fotografia'

export async function getPhotographyServices(): Promise<PhotographyService[]> {
  const colRef = collection(db, COLLECTION)
  const snap = await getDocs(colRef)
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as PhotographyService) }))
}

export async function getPhotographyServiceById(id: string): Promise<PhotographyService | null> {
  const ref = doc(db, COLLECTION, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...(snap.data() as PhotographyService) }
}

export function onPhotographyServiceSnapshot(id: string, cb: (data: PhotographyService | null) => void) {
  const ref = doc(db, COLLECTION, id)
  return onSnapshot(ref, snap => {
    if (!snap.exists()) {
      cb(null)
      return
    }
    cb({ id: snap.id, ...(snap.data() as PhotographyService) })
  })
}