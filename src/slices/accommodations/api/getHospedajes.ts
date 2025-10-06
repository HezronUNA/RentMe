import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>

export async function getHospedajes(): Promise<Hospedaje[]> {
  try {
    const snapshot = await getDocs(hospedajesCol)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        // Normalizamos las imágenes para manejar ambos casos (mayúscula/minúscula)
        imagenes: data.imagenes || data.Imagenes || []
      } as Hospedaje
    })
  } catch (error) {
    console.error("Error obteniendo hospedajes:", error)
    throw error
  }
}