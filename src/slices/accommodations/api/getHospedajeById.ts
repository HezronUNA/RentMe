import { db } from "@/services/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

// ✅ Obtener un hospedaje específico por ID
export async function getHospedajeById(id: string): Promise<Hospedaje | null> {
  try {
    const docRef = doc(db, "hospedaje", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    const data = docSnap.data() as HospedajeFirestore
    return {
      id: docSnap.id,
      ...data,
      // Normalizamos las imágenes para manejar ambos casos (mayúscula/minúscula)
      imagenes: data.imagenes || data.Imagenes || []
    } as Hospedaje
  } catch (error) {
    console.error("Error obteniendo hospedaje por ID:", error)
    throw error
  }
}