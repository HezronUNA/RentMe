// src/services/firestore/hospedajes.ts
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/services/firebase"
import type { HospedajeDestacado } from "@/slices/home/sections/accomodations" // ajusta el path si cambia

/** Lee hospedajes destacados desde Firestore (solo datos, sin estado de React) */
export async function getAccomodations(): Promise<HospedajeDestacado[]> {
  const q = query(collection(db, "hospedaje"), where("destacado", "==", true))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<HospedajeDestacado, "id">),
  }))
}
