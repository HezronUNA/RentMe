

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import type { titles } from '../types/titles'


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
