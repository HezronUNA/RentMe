import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore"
import type { PropiedadVenta, PropiedadVentaFirestore } from "../type"

const propiedadesVentaCol = collection(db, "propiedadesVenta") as CollectionReference<PropiedadVentaFirestore>

export async function getPropiedadesByPrecio(precioMin: number, precioMax: number): Promise<PropiedadVenta[]> {
  // Obtener todas las propiedades disponibles sin filtros de precio en Firestore
  // Esto evita completamente el problema de índices compuestos
  const q = query(
    propiedadesVentaCol,
    where("estado", "==", "Disponible")
  )
  
  const snapshot = await getDocs(q)
  let propiedades = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as PropiedadVentaFirestore)
  }))

  // Aplicar todos los filtros de precio en el cliente
  if (precioMin) {
    propiedades = propiedades.filter(p => p.precio >= precioMin)
  }
  
  if (precioMax) {
    propiedades = propiedades.filter(p => p.precio <= precioMax)
  }

  // Ordenar por precio en el cliente
  return propiedades.sort((a, b) => a.precio - b.precio)
}