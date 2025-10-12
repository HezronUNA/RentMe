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


export interface GoogleUserData {
  uid: string
  displayName: string
  email: string
  phoneNumber: string
  photoURL: string
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

export interface ActividadCercana {
  id?: string;
  nombre: string;
  descripcion: string;
  distanciaKm: number;
  imagenes: string[];
}

export interface ActividadesCercanas {
  [actividadId: string]: ActividadCercana;
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
// ...existing code...

// Tipo para Firestore (sin el ID que se genera automáticamente)
export interface ReservaHospedajeFirestore {
  // Campos que veo en tu Firebase (campos principales)
  email: string
  fechaCheckIn: Date // timestamp
  fechaCheckOut: Date // timestamp
  hospedajeId: string
  hospedajeNombre?: string
  mensaje?: string
  nombreCliente: string
  numeroHuespedes: number
  telefono: string
  
  // Campos adicionales para el sistema
  fechaCreacion: Date
  estado: EstadoReservaHospedaje
  noches?: number
  precioTotal?: number
  
  // Datos de Google (opcionales - solo si están presentes)
  googleUserId?: string
  googleUserData?: GoogleUserData
  
  // Campo de usuario opcional (solo si el usuario está autenticado)
  usuarioId?: string
}

// ...resto del código...
// Tipo para crear una nueva reserva (datos del formulario)
export interface CrearReservaHospedaje {
  // Campos principales que coinciden con Firebase
  hospedajeId: string
  hospedajeNombre?: string
  email: string
  fechaCheckIn: Date
  fechaCheckOut: Date
  mensaje?: string
  nombreCliente: string // Se mapea desde 'nombre' del formulario
  numeroHuespedes: number
  telefono: string
  
  // Campos adicionales del formulario original (para mantener compatibilidad)
  nombre: string // Se convertirá a nombreCliente
  
  // Datos de Google (opcionales)
  googleUserId?: string
  googleUserData?: GoogleUserData
  usuarioId?: string // Agregar este campo opcional
  
  // Campos calculados (se agregarán automáticamente)
  fechaCreacion?: Date
  estado?: EstadoReservaHospedaje
  noches?: number
  precioTotal?: number
}
