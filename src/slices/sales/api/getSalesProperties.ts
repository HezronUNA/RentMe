import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesVenta(): Promise<PropiedadVenta[]> {
  const snapshot = await getDocs(propiedadesVentaCol)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))
}