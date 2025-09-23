import { 
  collection, 
  addDoc, 
  Timestamp
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { 
  ReservaVentaFirestore, 
  CrearReservaVenta 
} from '../type'

const COLLECTION_NAME = 'reservaVenta'

/**
 * Crear una nueva reserva de venta
 */
export async function crearReservaVenta(data: CrearReservaVenta): Promise<string> {
  try {
    const reservaData: ReservaVentaFirestore = {
      propiedadId: data.propiedadId,
      propiedadTitulo: data.propiedadTitulo || '',
      clienteNombre: data.nombre,
      clienteEmail: data.email,
      clienteTelefono: data.telefono,
      mensaje: data.mensaje || '',
      fechaReserva: new Date(),
      fechaCreacion: new Date(),
      estado: 'Pendiente',
      usuarioId: data.usuarioId || '',
      asesorAsignado: '' // Vacío en lugar de undefined
    }

    // Crear el documento para Firestore, removiendo campos vacíos opcionales
    const firestoreData: any = {
      propiedadId: reservaData.propiedadId,
      clienteNombre: reservaData.clienteNombre,
      clienteEmail: reservaData.clienteEmail,
      clienteTelefono: reservaData.clienteTelefono,
      fechaReserva: Timestamp.fromDate(reservaData.fechaReserva),
      fechaCreacion: Timestamp.fromDate(reservaData.fechaCreacion),
      estado: reservaData.estado
    }

    // Solo agregar campos opcionales si tienen valor
    if (reservaData.propiedadTitulo) {
      firestoreData.propiedadTitulo = reservaData.propiedadTitulo
    }
    
    if (reservaData.mensaje) {
      firestoreData.mensaje = reservaData.mensaje
    }
    
    if (reservaData.usuarioId) {
      firestoreData.usuarioId = reservaData.usuarioId
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), firestoreData)

    return docRef.id
  } catch (error) {
    throw new Error('Error al crear la reserva de venta')
  }
}