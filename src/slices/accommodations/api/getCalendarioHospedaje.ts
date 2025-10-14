import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { CalendarDate } from '../type'

/**
 * Obtiene todas las fechas del calendario para un hospedaje específico
 * @param hospedajeId - ID del hospedaje
 * @returns Promise con array de fechas del calendario
 */
export async function getCalendarioHospedaje(hospedajeId: string): Promise<CalendarDate[]> {
  try {
    const calendarioRef = collection(db, 'hospedaje', hospedajeId, 'calendario')
    const querySnapshot = await getDocs(calendarioRef)
    
    const fechas: CalendarDate[] = []
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data()
      const fechaId = docSnapshot.id // El ID del documento es la fecha
      
      fechas.push({
        fecha: fechaId,
        disponible: data.disponible ?? true, // Si no existe el campo, se considera disponible
        precio: data.precio,
        notas: data.notas
      })
    })
    
    // Ordenar por fecha
    fechas.sort((a, b) => a.fecha.localeCompare(b.fecha))
    
    return fechas
  } catch (error) {
    console.error('Error al obtener calendario del hospedaje:', error)
    throw new Error('No se pudo obtener el calendario del hospedaje')
  }
}

/**
 * Obtiene solo las fechas disponibles para un hospedaje
 * @param hospedajeId - ID del hospedaje
 * @returns Promise con array de fechas disponibles en formato string
 */
export async function getFechasDisponibles(hospedajeId: string): Promise<string[]> {
  try {
    const calendarioRef = collection(db, 'hospedaje', hospedajeId, 'calendario')
    const querySnapshot = await getDocs(calendarioRef)
    
    const fechasDisponibles: string[] = []
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data()
      const fechaId = docSnapshot.id
      
      // Si disponible es true O no existe el campo (disponible por defecto)
      const esDisponible = data.disponible ?? true
      
      if (esDisponible) {
        fechasDisponibles.push(fechaId)
      }
    })
    
    // Ordenar fechas
    fechasDisponibles.sort()
    
    return fechasDisponibles
  } catch (error) {
    console.error('Error al obtener fechas disponibles:', error)
    throw new Error('No se pudo obtener las fechas disponibles')
  }
}

/**
 * Obtiene las fechas en un rango específico (tanto disponibles como no disponibles)
 * @param hospedajeId - ID del hospedaje
 * @param fechaInicio - Fecha de inicio del rango
 * @param fechaFin - Fecha de fin del rango
 * @returns Promise con array de fechas en el rango
 */
export async function getFechasEnRango(
  hospedajeId: string,
  fechaInicio: string,
  fechaFin: string
): Promise<CalendarDate[]> {
  try {
    const calendarioRef = collection(db, 'hospedaje', hospedajeId, 'calendario')
    const querySnapshot = await getDocs(calendarioRef)
    
    const fechas: CalendarDate[] = []
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data()
      const fechaId = docSnapshot.id
      
      // Verificar si la fecha está en el rango
      if (fechaId >= fechaInicio && fechaId <= fechaFin) {
        fechas.push({
          fecha: fechaId,
          disponible: data.disponible ?? true,
          precio: data.precio,
          notas: data.notas
        })
      }
    })
    
    // Ordenar por fecha
    fechas.sort((a, b) => a.fecha.localeCompare(b.fecha))
    
    return fechas
  } catch (error) {
    console.error('Error al obtener fechas en rango:', error)
    throw new Error('No se pudo obtener las fechas del rango especificado')
  }
}

/**
 * Verifica si una fecha específica está disponible
 * @param hospedajeId - ID del hospedaje
 * @param fecha - Fecha a verificar en formato 'YYYY-MM-DD'
 * @returns Promise<boolean> - true si está disponible, false en caso contrario
 */
export async function isFechaDisponible(
  hospedajeId: string,
  fecha: string
): Promise<boolean> {
  try {
    const docRef = doc(db, 'hospedaje', hospedajeId, 'calendario', fecha)
    const docSnapshot = await getDoc(docRef)
    
    if (!docSnapshot.exists()) {
      // Si no existe el documento, se considera disponible por defecto
      return true
    }
    
    const data = docSnapshot.data()
    // Si no existe el campo disponible, se considera disponible por defecto
    return data.disponible ?? true
    
  } catch (error) {
    console.error('Error al verificar disponibilidad de fecha:', error)
    // En caso de error, consideramos que no está disponible por seguridad
    return false
  }
}

/**
 * Genera un array de fechas disponibles para un rango completo,
 * incluyendo fechas que no tienen documento (disponibles por defecto)
 * @param hospedajeId - ID del hospedaje
 * @param fechaInicio - Fecha de inicio del rango
 * @param fechaFin - Fecha de fin del rango
 * @returns Promise con array de fechas disponibles en el rango
 */
export async function getFechasDisponiblesCompleto(
  hospedajeId: string,
  fechaInicio: string,
  fechaFin: string
): Promise<string[]> {
  try {
    // Obtener todas las fechas del calendario que existen
    const calendarioRef = collection(db, 'hospedaje', hospedajeId, 'calendario')
    const querySnapshot = await getDocs(calendarioRef)
    
    // Crear un mapa de fechas con su disponibilidad
    const fechasEnCalendario = new Map<string, boolean>()
    
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data()
      const fechaId = docSnapshot.id
      const disponible = data.disponible ?? true
      
      fechasEnCalendario.set(fechaId, disponible)
    })
    
    // Generar todas las fechas en el rango
    const fechasDisponibles: string[] = []
    const inicio = new Date(fechaInicio)
    const fin = new Date(fechaFin)
    
    for (let fecha = new Date(inicio); fecha <= fin; fecha.setDate(fecha.getDate() + 1)) {
      const fechaStr = fecha.toISOString().split('T')[0]
      
      // Si existe en el calendario, usar su valor, sino considerar disponible
      const esDisponible = fechasEnCalendario.get(fechaStr) ?? true
      
      if (esDisponible) {
        fechasDisponibles.push(fechaStr)
      }
    }
    
    return fechasDisponibles
    
  } catch (error) {
    console.error('Error al obtener fechas disponibles completo:', error)
    throw new Error('No se pudo obtener las fechas disponibles')
  }
}