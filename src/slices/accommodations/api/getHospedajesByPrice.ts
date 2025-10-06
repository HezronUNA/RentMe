import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where, orderBy } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>

// ✅ Obtener hospedajes por rango de precio
export async function getHospedajesByPrice(
  minPrice?: number,
  maxPrice?: number
): Promise<Hospedaje[]> {
  try {
    let hospedajesQuery = query(hospedajesCol)

    // Aplicar filtros de precio si están definidos
    if (minPrice !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("precioNoche", ">=", minPrice))
    }
    if (maxPrice !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("precioNoche", "<=", maxPrice))
    }

    // Ordenar por precio ascendente
    hospedajesQuery = query(hospedajesQuery, orderBy("precioNoche", "asc"))

    const snapshot = await getDocs(hospedajesQuery)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        imagenes: data.imagenes || data.Imagenes || []
      } as Hospedaje
    })
  } catch (error) {
    console.error("Error obteniendo hospedajes por precio:", error)
    throw error
  }
}

// ✅ Obtener hospedajes destacados
export async function getHospedajesDestacados(): Promise<Hospedaje[]> {
  try {
    const hospedajesQuery = query(
      hospedajesCol,
      where("destacado", "==", true),
      orderBy("precioNoche", "asc")
    )

    const snapshot = await getDocs(hospedajesQuery)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        imagenes: data.imagenes || data.Imagenes || []
      } as Hospedaje
    })
  } catch (error) {
    console.error("Error obteniendo hospedajes destacados:", error)
    throw error
  }
}