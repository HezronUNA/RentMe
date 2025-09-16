import { db } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { FooterData } from '../types/footer';

export async function getFooterData(): Promise<FooterData | null> {
  const ref = doc(db, 'footer', '1');
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as FooterData;
}
