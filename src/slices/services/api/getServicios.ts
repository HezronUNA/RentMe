import { db } from '@/services/firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

// Tipo para un servicio individual
export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  imagen: string
}

// Función para obtener un servicio por su ID
export const getServicioById = async (id: string): Promise<Servicio | null> => {
  try {
    const servicioRef = doc(db, 'servicios', id)
    const snapshot = await getDoc(servicioRef)
    
    if (snapshot.exists()) {
      const data = snapshot.data()
      return {
        id: snapshot.id,
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        imagen: data.imagen || ''
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error obteniendo servicio ${id}:`, error)
    return null
  }
}

// Función para obtener múltiples servicios por sus IDs
export const getServiciosByIds = async (ids: string[]): Promise<Servicio[]> => {
  try {
    const servicios: Servicio[] = []
    
    // Crear promesas para todos los IDs
    const promises = ids.map(id => getServicioById(id))
    const results = await Promise.all(promises)
    
    // Filtrar los resultados nulos
    results.forEach((servicio) => {
      if (servicio) {
        servicios.push(servicio)
      }
    })
    
    return servicios
  } catch (error) {
    console.error('Error obteniendo servicios:', error)
    return []
  }
}

// Función para obtener todos los servicios (útil para caché)
export const getAllServicios = async (): Promise<Servicio[]> => {
  try {
    const serviciosRef = collection(db, 'servicios')
    const snapshot = await getDocs(serviciosRef)
    
    const servicios: Servicio[] = []
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      servicios.push({
        id: doc.id,
        nombre: data.nombre || '',
        descripcion: data.descripcion || '',
        imagen: data.imagen || ''
      })
    })
    
    return servicios
  } catch (error) {
    console.error('Error obteniendo todos los servicios:', error)
    return []
  }
}