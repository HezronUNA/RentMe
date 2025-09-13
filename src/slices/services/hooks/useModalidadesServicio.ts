import { useState, useEffect } from 'react'
import { collection, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore'
import { db } from '@/services/firebase'

// Tipos para la respuesta del hook
export interface ModalidadUI {
  id: string
  index: number
  titulo: string
  boton: string
  incluidos: string[]
  adicionales: string[]
}

// Tipo para documento de modalidad desde Firestore
interface ModalidadDoc {
  id: string
  nombre?: string
  serviciosIncluidos: (string | null)[]
  serviciosAdicionales: (string | null)[]
  textoBoton: string
}



export const useModalidadesServicio = () => {
  const [modalidades, setModalidades] = useState<ModalidadUI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Configuración del orden personalizado por modalidad
  const ORDEN_PERSONALIZADO = {
    "1": {
      incluidos: ["/servicios/1", "/servicios/2", "/servicios/5", "/servicios/7", "/servicios/6", "/servicios/12"],
      adicionales: []
    },
    "2": {
      incluidos: ["Todo lo mencionado en la opción 1"],
      adicionales: ["/servicios/4", "/servicios/8", "/servicios/9", "/servicios/10", "Promoción en nuestras redes sociales", "Se cobra un depósito de garantía por posibles daños"]
    },
    "3": {
      incluidos: ["Todo lo mencionado en las modalidades 1 y 2 como:", "/servicios/6", "/servicios/4"],
      adicionales: ["/servicios/3", "/servicios/11"]
    }
  }

  // Función para obtener un servicio por ID
  const getServicioByRef = async (ref: string): Promise<string | null> => {
    try {
      // Extraer ID de la referencia "/servicios/1" -> "1"
      const match = ref.match(/\/servicios\/(\d+)/)
      if (!match) return null
      
      const servicioId = match[1]
      const servicioRef = doc(db, 'servicios', servicioId)
      const servicioSnap = await getDoc(servicioRef)
      
      if (servicioSnap.exists()) {
        const data = servicioSnap.data()
        return data.nombre || null
      }
      
      return null
    } catch (error) {
      console.warn(`Error obteniendo servicio ${ref}:`, error)
      return null
    }
  }

  // Función para resolver todas las referencias de servicios
  const resolverReferencias = async (items: string[]): Promise<string[]> => {
    const resultados: string[] = []
    
    for (const item of items) {
      if (item.startsWith('/servicios/')) {
        // Es una referencia, resolverla
        const nombreServicio = await getServicioByRef(item)
        if (nombreServicio) {
          resultados.push(nombreServicio)
        }
        // Si no se encuentra el servicio, se omite (edge case)
      } else {
        // Es texto literal
        resultados.push(item)
      }
    }
    
    return resultados
  }

  // Función principal para obtener y procesar modalidades
  const fetchModalidades = async () => {
    try {
      setLoading(true)
      setError(null)

      // Obtener modalidades ordenadas por ID
      const modalidadesRef = collection(db, 'modalidadServicio')
      const q = query(modalidadesRef, orderBy('__name__'))
      const snapshot = await getDocs(q)
      
      const modalidadesRaw: ModalidadDoc[] = []
      
      snapshot.forEach((doc) => {
        const data = doc.data()
        modalidadesRaw.push({
          id: doc.id,
          nombre: data.nombre,
          serviciosIncluidos: data.serviciosIncluidos || [],
          serviciosAdicionales: data.serviciosAdicionales || [],
          textoBoton: data.textoBoton || 'Reservar'
        })
      })

      // Ordenar por ID numérico (1, 2, 3)
      modalidadesRaw.sort((a, b) => parseInt(a.id) - parseInt(b.id))

      // Procesar cada modalidad aplicando el orden personalizado
      const modalidadesProcesadas: ModalidadUI[] = []
      
      for (let i = 0; i < modalidadesRaw.length; i++) {
        const modalidad = modalidadesRaw[i]
        const ordenConfig = ORDEN_PERSONALIZADO[modalidad.id as keyof typeof ORDEN_PERSONALIZADO]
        
        if (ordenConfig) {
          // Usar orden personalizado
          const incluidos = await resolverReferencias(ordenConfig.incluidos)
          const adicionales = await resolverReferencias(ordenConfig.adicionales)
          
          modalidadesProcesadas.push({
            id: modalidad.id,
            index: i + 1,
            titulo: modalidad.nombre || `Opción ${i + 1}`,
            boton: modalidad.textoBoton,
            incluidos,
            adicionales
          })
        } else {
          // Fallback: usar datos originales de Firestore si no hay configuración personalizada
          const incluidos = await resolverReferencias(
            modalidad.serviciosIncluidos.filter(Boolean) as string[]
          )
          const adicionales = await resolverReferencias(
            modalidad.serviciosAdicionales.filter(Boolean) as string[]
          )
          
          modalidadesProcesadas.push({
            id: modalidad.id,
            index: i + 1,
            titulo: modalidad.nombre || `Opción ${i + 1}`,
            boton: modalidad.textoBoton,
            incluidos,
            adicionales
          })
        }
      }

      setModalidades(modalidadesProcesadas)
      
    } catch (err) {
      console.error('Error cargando modalidades:', err)
      setError('Error al cargar las modalidades de servicio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModalidades()
  }, [])

  return {
    modalidades,
    loading,
    error,
    refetch: fetchModalidades
  }
}