import { db } from "@/services/firebase"
import { 
  collection, 
  CollectionReference, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy
} from "firebase/firestore"
import type { 
  ReservaHospedaje, 
  ReservaHospedajeFirestore, 
  CrearReservaHospedaje,
  EstadoReservaHospedaje 
} from "../type"

const reservasCol = collection(db, "reservasHospedajes") as CollectionReference<ReservaHospedajeFirestore>

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
    
    const nuevaReserva: ReservaHospedajeFirestore = {
      hospedajeId: reservaData.hospedajeId,
      hospedajeNombre: reservaData.hospedajeNombre,
      clienteNombre: reservaData.nombre,
      clienteEmail: reservaData.email,
      clienteTelefono: reservaData.telefono,
      fechaCheckIn: fechaCheckIn,
      fechaCheckOut: fechaCheckOut,
      numeroHuespedes: reservaData.numeroHuespedes,
      mensaje: reservaData.mensaje,
      fechaCreacion: new Date(),
      estado: "Pendiente",
      usuarioId: reservaData.usuarioId,
      precioTotal: precioNoche * noches,
      noches: noches
    }

    const docRef = await addDoc(reservasCol, nuevaReserva)
    return docRef.id
  } catch (error) {
    console.error("Error creando reserva de hospedaje:", error)
    throw error
  }
}

// ✅ Obtener reservas por hospedaje
export async function getReservasByHospedaje(hospedajeId: string): Promise<ReservaHospedaje[]> {
  try {
    const reservasQuery = query(
      reservasCol,
      where("hospedajeId", "==", hospedajeId),
      orderBy("fechaCreacion", "desc")
    )

    const snapshot = await getDocs(reservasQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ReservaHospedaje))
  } catch (error) {
    console.error("Error obteniendo reservas por hospedaje:", error)
    throw error
  }
}

// ✅ Obtener reservas por usuario
export async function getReservasByUsuario(usuarioId: string): Promise<ReservaHospedaje[]> {
  try {
    const reservasQuery = query(
      reservasCol,
      where("usuarioId", "==", usuarioId),
      orderBy("fechaCreacion", "desc")
    )

    const snapshot = await getDocs(reservasQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ReservaHospedaje))
  } catch (error) {
    console.error("Error obteniendo reservas por usuario:", error)
    throw error
  }
}

// ✅ Obtener reservas por estado
export async function getReservasByEstado(estado: EstadoReservaHospedaje): Promise<ReservaHospedaje[]> {
  try {
    const reservasQuery = query(
      reservasCol,
      where("estado", "==", estado),
      orderBy("fechaCreacion", "desc")
    )

    const snapshot = await getDocs(reservasQuery)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ReservaHospedaje))
  } catch (error) {
    console.error("Error obteniendo reservas por estado:", error)
    throw error
  }
}