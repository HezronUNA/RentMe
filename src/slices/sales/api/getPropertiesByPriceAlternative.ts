import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesByPrecioAlternative(precioMin: number, precioMax: number): Promise<PropiedadVenta[]> {
  // Query sin orderBy para evitar índice compuesto
  const q = query(
    propiedadesVentaCol,
    where("estado", "==", "Disponible"),
    where("precio", ">=", precioMin),
    where("precio", "<=", precioMax)
  )
  
  const snapshot = await getDocs(q)
  const propiedades = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))

  // Ordenar en el cliente
  return propiedades.sort((a, b) => a.precio - b.precio)
}