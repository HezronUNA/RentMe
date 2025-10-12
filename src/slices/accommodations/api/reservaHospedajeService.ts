import { db } from "@/services/firebase"
import { 
  collection, 
  CollectionReference, 
  addDoc
} from "firebase/firestore"
import type { 
  ReservaHospedajeFirestore, 
  CrearReservaHospedaje
} from "../type"

const reservasCol = collection(db, "reservaHospedaje") as CollectionReference<ReservaHospedajeFirestore>

// ✅ Crear una nueva reserva de hospedaje
export async function crearReservaHospedaje(
  reservaData: CrearReservaHospedaje,
  precioNoche: number
): Promise<string> {
  try {
    const fechaCheckIn = new Date(reservaData.fechaCheckIn)
    const fechaCheckOut = new Date(reservaData.fechaCheckOut)
    
    // Calcular número de noches
    const tiempoDiff = fechaCheckOut.getTime() - fechaCheckIn.getTime()
    const noches = Math.ceil(tiempoDiff / (1000 * 3600 * 24))
    
    // Estructura que coincide exactamente con tu Firebase
    const nuevaReserva: ReservaHospedajeFirestore = {
      email: reservaData.email,
      fechaCheckIn: fechaCheckIn,
      fechaCheckOut: fechaCheckOut,
      hospedajeId: reservaData.hospedajeId,
      hospedajeNombre: reservaData.hospedajeNombre,
      mensaje: reservaData.mensaje || '',
      nombreCliente: reservaData.nombre, // Mapear 'nombre' a 'nombreCliente'
      numeroHuespedes: reservaData.numeroHuespedes,
      telefono: reservaData.telefono,
      
      // Campos adicionales
      fechaCreacion: new Date(),
      estado: "Pendiente",
      noches: noches,
      precioTotal: precioNoche * noches,
      
      // Solo agregar campos opcionales si existen
      ...(reservaData.googleUserId && { googleUserId: reservaData.googleUserId }),
      ...(reservaData.googleUserData && { googleUserData: reservaData.googleUserData })
      // Removido usuarioId porque no está definido en CrearReservaHospedaje
    }

    const docRef = await addDoc(reservasCol, nuevaReserva)
    return docRef.id
  } catch (error) {
    console.error("Error creando reserva de hospedaje:", error)
    throw error
  }
}