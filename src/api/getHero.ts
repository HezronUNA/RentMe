import { db } from '@/services/firebase'
import type { HeroItem } from '@/slices/home/sections/hero/type'
import { collection, getDocs } from 'firebase/firestore'

export async function getHeroItems(): Promise<HeroItem[]> {
  const snapshot = await getDocs(collection(db, 'hero'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as HeroItem[]
}


