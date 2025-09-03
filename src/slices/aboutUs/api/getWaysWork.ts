// src/slices/aboutUs/api/getModalidades.ts
import {
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import type { WaysWork } from "../sections/waysWork/type";

// Referencia a la colección
const modalidadesCol = collection(db, "modalidadTrabajo") as CollectionReference<WaysWork>;

// ✅ Trae todas las modalidades ordenadas por ID
export async function fetchModalidades(): Promise<WaysWork[]> {
  const q = query(modalidadesCol, orderBy("__name__", "asc"));
  const snap = await getDocs(q);
  
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<WaysWork, "id">),
  }));
}

// ✅ Escucha tiempo real sobre las modalidades
export function subscribeModalidades(
  onData: (modalidades: WaysWork[]) => void,
  onError?: (e: unknown) => void
) {
  const q = query(modalidadesCol, orderBy("__name__", "asc"));
  
  return onSnapshot(q, (snap) => {
    const modalidades = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<WaysWork, "id">),
    }));
    
    onData(modalidades);
  }, onError);
}