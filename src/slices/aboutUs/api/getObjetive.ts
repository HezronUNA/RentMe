import {
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { Objetivo } from "../sections/ourObjetive/type";
// Referencia a la colección
const objetivosCol = collection(db, "objetivo") as CollectionReference<Objetivo>;

// ✅ Solo trae el primer documento encontrado
export async function fetchObjetivoUnico(): Promise<Objetivo | null> {
  const snap = await getDocs(objetivosCol);
  const docSnap = snap.docs[0];

  if (!docSnap) return null;

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Objetivo, "id">),
  };
}

// ✅ Escucha tiempo real sobre el primer doc
export function subscribeObjetivoUnico(
  onData: (objetivo: Objetivo | null) => void,
  onError?: (e: unknown) => void
) {
  return onSnapshot(objetivosCol, (snap) => {
    const docSnap = snap.docs[0];

    if (!docSnap) return onData(null);

    onData({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Objetivo, "id">),
    });
  }, onError);
}
