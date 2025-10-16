import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>

// ✅ Buscar hospedajes por dirección/ubicación
export async function getHospedajesByDireccion(direccionTexto: string): Promise<Hospedaje[]> {
  try {
    console.log("📍 Buscando hospedajes por dirección:", direccionTexto)
    
    // Obtener todos los hospedajes para filtrar por dirección
    const snapshot = await getDocs(hospedajesCol)
    console.log("📊 Total hospedajes en DB para filtrar:", snapshot.docs.length)
    
    const searchLower = direccionTexto.toLowerCase()
    
    const hospedajes = snapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          imagenes: data.imagenes || data.Imagenes || []
        } as Hospedaje
      })
      .filter(hospedaje => {
        const match = hospedaje.ubicacion.direccion.toLowerCase().includes(searchLower)
        if (match) {
          console.log("✅ Match por dirección:", hospedaje.nombre, "en", hospedaje.ubicacion.direccion)
        }
        return match
      })

    console.log("🎯 Hospedajes encontrados por dirección:", hospedajes.length)
    
    // Ordenar por precio
    return hospedajes.sort((a, b) => a.precioNoche - b.precioNoche)
  } catch (error) {
    console.error("Error buscando hospedajes por dirección:", error)
    throw error
  }
}

// ✅ Buscar hospedajes por múltiples criterios de texto
export async function searchHospedajesCompleto(searchText: string): Promise<Hospedaje[]> {
  try {
    console.log("🔍 Búsqueda completa con texto:", searchText)
    
    const snapshot = await getDocs(hospedajesCol)
    const searchLower = searchText.toLowerCase()
    
    const hospedajes = snapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          imagenes: data.imagenes || data.Imagenes || []
        } as Hospedaje
      })
      .filter(hospedaje => {
        // Buscar en múltiples campos
        const matchNombre = hospedaje.nombre.toLowerCase().includes(searchLower)
        const matchDescripcion = hospedaje.descripcion.toLowerCase().includes(searchLower)
        const matchDireccion = hospedaje.ubicacion.direccion.toLowerCase().includes(searchLower)
        const matchServicios = hospedaje.servicios.some(servicio => 
          servicio.toLowerCase().includes(searchLower)
        )
        
        const match = matchNombre || matchDescripcion || matchDireccion || matchServicios
        
        if (match) {
          const matchTypes = []
          if (matchNombre) matchTypes.push("nombre")
          if (matchDescripcion) matchTypes.push("descripción")
          if (matchDireccion) matchTypes.push("dirección")
          if (matchServicios) matchTypes.push("servicios")
          
          console.log("✅ Match encontrado en", matchTypes.join(", "), ":", hospedaje.nombre)
        }
        
        return match
      })

    // Ordenar por relevancia (nombre > dirección > descripción > servicios)
    return hospedajes.sort((a, b) => {
      const aScore = getRelevanceScore(a, searchLower)
      const bScore = getRelevanceScore(b, searchLower)
      
      if (aScore !== bScore) {
        return bScore - aScore // Mayor score primero
      }
      
      return a.precioNoche - b.precioNoche // Luego por precio
    })
  } catch (error) {
    console.error("Error en búsqueda completa:", error)
    throw error
  }
}

// Función auxiliar para calcular relevancia
function getRelevanceScore(hospedaje: Hospedaje, searchLower: string): number {
  let score = 0
  
  // Nombre tiene mayor peso
  if (hospedaje.nombre.toLowerCase().includes(searchLower)) {
    score += 10
    // Si coincide exactamente o al inicio, aún más peso
    if (hospedaje.nombre.toLowerCase().startsWith(searchLower)) {
      score += 5
    }
  }
  
  // Dirección tiene peso medio
  if (hospedaje.ubicacion.direccion.toLowerCase().includes(searchLower)) {
    score += 5
  }
  
  // Descripción tiene menos peso
  if (hospedaje.descripcion.toLowerCase().includes(searchLower)) {
    score += 2
  }
  
  // Servicios tienen poco peso
  if (hospedaje.servicios.some(s => s.toLowerCase().includes(searchLower))) {
    score += 1
  }
  
  // Hospedajes destacados obtienen bonus
  if (hospedaje.destacado) {
    score += 1
  }
  
  return score
}