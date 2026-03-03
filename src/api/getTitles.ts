

import { collection, getDocs } from 'firebase/firestore'
import type { titles } from '../types/titles'
import { db } from '@/services/firebase';


export async function getTitles(): Promise<titles[]> {
  const snapshot = await getDocs(collection(db,'titulos '))
  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<titles, 'id'>;
    return {
      id: doc.id,
      ...data
    };
  });
}


