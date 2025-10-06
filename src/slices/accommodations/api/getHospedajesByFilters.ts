import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where, orderBy } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>

// ✅ Obtener hospedajes por capacidad (cuartos, camas, baños)
export async function getHospedajesByCapacity(
  minCuartos?: number,
  minCamas?: number,
  minBanos?: number
): Promise<Hospedaje[]> {
  try {
    let hospedajesQuery = query(hospedajesCol)

    // Aplicar filtros de capacidad si están definidos
    if (minCuartos !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("cuartos", ">=", minCuartos))
    }
    if (minCamas !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("camas", ">=", minCamas))
    }
    if (minBanos !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("baños", ">=", minBanos))
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
    console.error("Error obteniendo hospedajes por capacidad:", error)
    throw error
  }
}

// ✅ Obtener hospedajes por servicios específicos
export async function getHospedajesByServices(servicios: string[]): Promise<Hospedaje[]> {
  try {
    let hospedajesQuery = query(hospedajesCol)

    // Filtrar por servicios (contiene todos los servicios requeridos)
    if (servicios.length > 0) {
      hospedajesQuery = query(hospedajesQuery, where("servicios", "array-contains-any", servicios))
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
    console.error("Error obteniendo hospedajes por servicios:", error)
    throw error
  }
}

// ✅ Obtener hospedajes por reglas (mascotas permitidas, fumar permitido)
export async function getHospedajesByRules(
  permiteMascotas?: boolean,
  permiteFumar?: boolean
): Promise<Hospedaje[]> {
  try {
    let hospedajesQuery = query(hospedajesCol)

    // Aplicar filtros de reglas si están definidos
    if (permiteMascotas !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("reglas.mascotas", "==", permiteMascotas))
    }
    if (permiteFumar !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("reglas.fumado", "==", permiteFumar))
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
    console.error("Error obteniendo hospedajes por reglas:", error)
    throw error
  }
}