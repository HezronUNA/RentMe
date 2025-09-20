import { db } from "@/services/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

// ✅ Obtener una propiedad específica por ID
export async function getPropiedadById(id: string): Promise<PropiedadVenta | null> {
  const docRef = doc(db, "propiedadesVenta", id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) return null
  
  return {
    id: docSnap.id,
    ...(docSnap.data() as PropiedadVentaFirestore)
  }
}