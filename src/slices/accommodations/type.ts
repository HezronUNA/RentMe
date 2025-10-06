// src/slices/hospedaje/types/hospedaje.ts

export interface ReglasHospedaje {
  fumado: boolean
  mascotas: boolean
}

export interface UbicacionHospedaje {
  provincia: string
  canton: string
  distrito: string
  direccion: string
  lat: number
  lng: number
}

// Tipo para GeoPoint de Firebase (por si se usa en el futuro)
export interface FirebaseGeoPoint {
  latitude: number
  longitude: number
}

// Función utilitaria para convertir GeoPoint a objeto con lat/lng
export const geoPointToUbicacion = (
  geoPoint: FirebaseGeoPoint | { lat?: number; lng?: number } | null | undefined
): { lat: number; lng: number } | null => {
  if (!geoPoint) return null

  if (typeof (geoPoint as any).lat === "number" && typeof (geoPoint as any).lng === "number") {
    return { lat: (geoPoint as any).lat, lng: (geoPoint as any).lng }
  }

  if (
    typeof (geoPoint as any).latitude === "number" &&
    typeof (geoPoint as any).longitude === "number"
  ) {
    return { lat: (geoPoint as any).latitude, lng: (geoPoint as any).longitude }
  }

  return null
}

// -------- Modelos --------

export interface Hospedaje {
  id: string
  nombre: string
  descripcion: string
  precioNoche: number
  destacado: boolean
  cuartos: number
  camas: number
  baños: number
  reglas: ReglasHospedaje
  servicios: string[]
  reseñaId: string[]
  imagenes: string[]
  airbnbIcalUrl?: string
  bookingIcalUrl?: string
  tipoHospedajeId?: string
  ubicacion: UbicacionHospedaje
}

// Tipo para Firestore (sin el ID que se genera automáticamente)
export interface HospedajeFirestore {
  nombre: string
  descripcion: string
  precioNoche: number
  destacado: boolean
  cuartos: number
  camas: number
  baños: number
  reglas: ReglasHospedaje
  servicios: string[]
  reseñaId: string[]
  Imagenes?: string[] // Soporte si se usa mayúscula en Firebase
  imagenes?: string[]
  airbnbIcalUrl?: string
  bookingIcalUrl?: string
  tipoHospedajeId?: unknown // Puede ser referencia o string
  ubicacion: UbicacionHospedaje
}

// -------- Tipos para Reservas de Hospedajes --------

export type EstadoReservaHospedaje = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada'

export interface ReservaHospedaje {
  id: string
  hospedajeId: string
  hospedajeNombre?: string
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  fechaCheckIn: Date
  fechaCheckOut: Date
  numeroHuespedes: number
  mensaje?: string
  fechaCreacion: Date
  estado: EstadoReservaHospedaje
  usuarioId?: string // Si el cliente está registrado
  precioTotal: number
  noches: number
}

// Tipo para Firestore (sin el ID que se genera automáticamente)
export interface ReservaHospedajeFirestore {
  hospedajeId: string
  hospedajeNombre?: string
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  fechaCheckIn: Date
  fechaCheckOut: Date
  numeroHuespedes: number
  mensaje?: string
  fechaCreacion: Date
  estado: EstadoReservaHospedaje
  usuarioId?: string
  precioTotal: number
  noches: number
}

// Tipo para crear una nueva reserva (datos del formulario)
export interface CrearReservaHospedaje {
  hospedajeId: string
  hospedajeNombre?: string
  nombre: string
  email: string
  telefono: string
  fechaCheckIn: Date
  fechaCheckOut: Date
  numeroHuespedes: number
  mensaje?: string
  usuarioId?: string
}
