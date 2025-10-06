import { db } from "@/services/firebase"
import { collection, CollectionReference, getDocs, query, where, orderBy } from "firebase/firestore"
import type { Hospedaje, HospedajeFirestore, ReservaHospedajeFirestore } from "../type"

const hospedajesCol = collection(db, "hospedaje") as CollectionReference<HospedajeFirestore>
const reservasCol = collection(db, "reservasHospedajes") as CollectionReference<ReservaHospedajeFirestore>

// ✅ Obtener hospedajes disponibles en un rango de fechas
export async function getHospedajesDisponibles(
  fechaCheckIn: Date,
  fechaCheckOut: Date,
  numeroHuespedes?: number
): Promise<Hospedaje[]> {
  try {
    // 1. Obtener todas las reservas confirmadas que se superponen con las fechas solicitadas
    const reservasQuery = query(
      reservasCol,
      where("estado", "==", "Confirmada")
    )
    
    const reservasSnapshot = await getDocs(reservasQuery)
    const reservasConflictivas = reservasSnapshot.docs
      .map(doc => doc.data())
      .filter(reserva => {
        const checkInReserva = reserva.fechaCheckIn instanceof Date ? reserva.fechaCheckIn : new Date(reserva.fechaCheckIn)
        const checkOutReserva = reserva.fechaCheckOut instanceof Date ? reserva.fechaCheckOut : new Date(reserva.fechaCheckOut)
        
        // Verificar si hay superposición de fechas
        return (
          (fechaCheckIn >= checkInReserva && fechaCheckIn < checkOutReserva) ||
          (fechaCheckOut > checkInReserva && fechaCheckOut <= checkOutReserva) ||
          (fechaCheckIn <= checkInReserva && fechaCheckOut >= checkOutReserva)
        )
      })

    // 2. Obtener IDs de hospedajes ocupados
    const hospedajesOcupados = new Set(reservasConflictivas.map(reserva => reserva.hospedajeId))

    // 3. Obtener todos los hospedajes
    let hospedajesQuery = query(hospedajesCol, orderBy("precioNoche", "asc"))
    
    // Filtrar por número de huéspedes si se especifica
    if (numeroHuespedes !== undefined) {
      hospedajesQuery = query(hospedajesQuery, where("camas", ">=", numeroHuespedes))
    }

    const hospedajesSnapshot = await getDocs(hospedajesQuery)
    
    // 4. Filtrar hospedajes disponibles (no ocupados)
    const hospedajesDisponibles = hospedajesSnapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          imagenes: data.imagenes || data.Imagenes || []
        } as Hospedaje
      })
      .filter(hospedaje => !hospedajesOcupados.has(hospedaje.id))

    return hospedajesDisponibles
  } catch (error) {
    console.error("Error obteniendo hospedajes disponibles:", error)
    throw error
  }
}

// ✅ Verificar si un hospedaje específico está disponible en fechas dadas
export async function isHospedajeDisponible(
  hospedajeId: string,
  fechaCheckIn: Date,
  fechaCheckOut: Date
): Promise<boolean> {
  try {
    const reservasQuery = query(
      reservasCol,
      where("hospedajeId", "==", hospedajeId),
      where("estado", "==", "Confirmada")
    )
    
    const reservasSnapshot = await getDocs(reservasQuery)
    
    // Verificar si alguna reserva se superpone con las fechas solicitadas
    const hayConflicto = reservasSnapshot.docs.some(doc => {
      const reserva = doc.data()
      const checkInReserva = reserva.fechaCheckIn instanceof Date ? reserva.fechaCheckIn : new Date(reserva.fechaCheckIn)
      const checkOutReserva = reserva.fechaCheckOut instanceof Date ? reserva.fechaCheckOut : new Date(reserva.fechaCheckOut)
      
      return (
        (fechaCheckIn >= checkInReserva && fechaCheckIn < checkOutReserva) ||
        (fechaCheckOut > checkInReserva && fechaCheckOut <= checkOutReserva) ||
        (fechaCheckIn <= checkInReserva && fechaCheckOut >= checkOutReserva)
      )
    })

    return !hayConflicto
  } catch (error) {
    console.error("Error verificando disponibilidad del hospedaje:", error)
    throw error
  }
}

// ✅ Obtener fechas ocupadas para un hospedaje específico
export async function getFechasOcupadas(hospedajeId: string): Promise<{ checkIn: Date; checkOut: Date }[]> {
  try {
    const reservasQuery = query(
      reservasCol,
      where("hospedajeId", "==", hospedajeId),
      where("estado", "in", ["Confirmada", "Pendiente"]),
      orderBy("fechaCheckIn", "asc")
    )
    
    const reservasSnapshot = await getDocs(reservasQuery)
    
    return reservasSnapshot.docs.map(doc => {
      const reserva = doc.data()
      return {
        checkIn: reserva.fechaCheckIn instanceof Date ? reserva.fechaCheckIn : new Date(reserva.fechaCheckIn),
        checkOut: reserva.fechaCheckOut instanceof Date ? reserva.fechaCheckOut : new Date(reserva.fechaCheckOut)
      }
    })
  } catch (error) {
    console.error("Error obteniendo fechas ocupadas:", error)
    throw error
  }
}