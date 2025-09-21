import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, orderBy, query, where } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesByPrecio(precioMin: number, precioMax: number): Promise<PropiedadVenta[]> {
  const q = query(
    propiedadesVentaCol,
    where("precio", ">=", precioMin),
    where("precio", "<=", precioMax),
    where("estado", "==", "Disponible"),
    orderBy("precio", "asc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))
}