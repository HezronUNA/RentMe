import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesByUbicacion(canton: string): Promise<PropiedadVenta[]> {
  const q = query(
    propiedadesVentaCol,
    where("ubicacion.canton", "==", canton),
    where("estado", "==", "Disponible")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))
}