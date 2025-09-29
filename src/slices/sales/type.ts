// src/slices/sales/types/sales.ts

export type EstadoPropiedad = 'Disponible' | 'Reservada' | 'Vendida'

export type EstadoReservaVenta = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada'

export interface Ubicacion {
  canton: string
  distrito: string
}

export interface UbicacionExacta {
  lat: number
  lng: number
}

// Tipo para GeoPoint de Firebase
export interface FirebaseGeoPoint {
  latitude: number
  longitude: number
}

// Función utilitaria para convertir GeoPoint a UbicacionExacta
export const geoPointToUbicacion = (geoPoint: FirebaseGeoPoint | any): UbicacionExacta | null => {
  if (!geoPoint) return null;
  
  // Si ya tiene el formato correcto
  if (typeof geoPoint.lat === 'number' && typeof geoPoint.lng === 'number') {
    return { lat: geoPoint.lat, lng: geoPoint.lng };
  }
  
  // Si es un GeoPoint de Firebase
  if (typeof geoPoint.latitude === 'number' && typeof geoPoint.longitude === 'number') {
    return { lat: geoPoint.latitude, lng: geoPoint.longitude };
  }
  
  return null;
};

export interface AsesorResponsable {
  email: string
}

export interface PropiedadVenta {
  id: string
  descripcion: string
  habitaciones: number
  baños: number
  areaTerreno: number
  estado: EstadoPropiedad
  añoConstruccion?: number
  precio: number
  amenidades: string[]
  ubicacion: Ubicacion
  ubicacionExacta: FirebaseGeoPoint
  imagenes: string[]
  asesorResponsable: AsesorResponsable
}

// Tipo para Firestore (sin el ID que se genera automáticamente)
export interface PropiedadVentaFirestore {
  descripcion: string
  habitaciones: number
  baños: number
  areaTerreno: number
  estado: EstadoPropiedad
  añoConstruccion?: number
  precio: number
  amenidades: string[]
  ubicacion: Ubicacion
  ubicacionExacta: FirebaseGeoPoint
  imagenes: string[]
  asesorResponsable: AsesorResponsable
}

// Tipos para ReservaVenta
export interface ReservaVenta {
  id: string
  propiedadId: string
  propiedadTitulo?: string
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  mensaje?: string
  fechaReserva: Date
  fechaCreacion: Date
  estado: EstadoReservaVenta
  usuarioId?: string // Si el cliente está registrado
  asesorAsignado?: string // Email del asesor
}

// Tipo para Firestore (sin el ID que se genera automáticamente)
export interface ReservaVentaFirestore {
  propiedadId: string
  propiedadTitulo?: string
  clienteNombre: string
  clienteEmail: string
  clienteTelefono: string
  mensaje?: string
  fechaReserva: Date
  fechaCreacion: Date
  estado: EstadoReservaVenta
  usuarioId?: string
  asesorAsignado?: string
}

// Tipo para crear una nueva reserva (datos del formulario)
export interface CrearReservaVenta {
  propiedadId: string
  propiedadTitulo?: string
  nombre: string
  email: string
  telefono: string
  mensaje?: string
  usuarioId?: string
}