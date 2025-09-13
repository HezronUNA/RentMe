import { db } from '@/services/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

// Tipos para las modalidades de servicio
export interface ModalidadServicio {
  id: string
  nombre?: string
  serviciosIncluidos: unknown[] // Puede ser string[], referencias mixtas, etc.
  serviciosAdicionales: unknown[] // Puede ser string[], referencias mixtas, etc.
  textoBoton: string
}

// Función para obtener todas las modalidades ordenadas por ID
export const getModalidadesServicio = async (): Promise<ModalidadServicio[]> => {
  try {
    const modalidadesRef = collection(db, 'modalidadServicio')
    const q = query(modalidadesRef, orderBy('__name__'))
    const snapshot = await getDocs(q)
    
    const modalidades: ModalidadServicio[] = []
    
    snapshot.forEach((doc) => {
      const data = doc.data()
      modalidades.push({
        id: doc.id,
        nombre: data.nombre,
        serviciosIncluidos: data.serviciosIncluidos || [],
        serviciosAdicionales: data.serviciosAdicionales || [],
        textoBoton: data.textoBoton || 'Reservar'
      })
    })
    
    // Ordenar por ID numérico
    return modalidades.sort((a, b) => {
      const idA = parseInt(a.id)
      const idB = parseInt(b.id)
      return idA - idB
    })
  } catch (error) {
    console.error('Error obteniendo modalidades de servicio:', error)
    throw error
  }
}