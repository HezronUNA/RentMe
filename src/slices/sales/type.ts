// src/slices/sales/types/sales.ts

export type EstadoPropiedad = 'Disponible' | 'Reservada' | 'Vendida'

export type EstadoReservaVenta = 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada'

export interface Ubicacion {
  canton: string
  distrito: string
}

/**
 * URL de ubicación exacta (Google Maps URL)
 */
export type UbicacionExacta = string | null;

export interface AsesorResponsable {
  email: string
}

export interface PropiedadVenta {
  id: string // UUID en Supabase
  created_at?: string // Timestamp estándar de Supabase
  descripcion: string
  habitaciones: number
  baños: number
  area_terreno: number
  estado: EstadoPropiedad
  año_construccion?: number
  precio: number
  amenidades: string[]
  ubicacion: Ubicacion
  google_maps_url: UbicacionExacta // URL de Google Maps (igual a ubicacion_exacta)
  ubicacion_exacta: UbicacionExacta // URL de Google Maps
  imagenes: string[]
  asesor_responsable: AsesorResponsable
}

/**
 * Para Supabase, el tipo "Table" suele ser el mismo para Insert/Update,
 * pero omitiendo el 'id' si es autogenerado.
 */
export interface PropiedadVentaInsert {
  descripcion: string
  habitaciones: number
  baños: number
  area_terreno: number
  estado: EstadoPropiedad
  año_construccion?: number
  precio: number
  amenidades: string[]
  ubicacion: Ubicacion
  google_maps_url: UbicacionExacta
  ubicacion_exacta: UbicacionExacta
  imagenes: string[]
  asesor_responsable: AsesorResponsable
}

// Tipos para ReservaVenta
export interface ReservaVenta {
  id: string
  created_at: string 
  propiedad_id: string
  propiedad_titulo?: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  mensaje?: string
  fecha_reserva: string // ISO string es lo mejor para Supabase/Postgres
  estado: EstadoReservaVenta
  usuario_id?: string 
  asesor_asignado?: string 
}

export interface ReservaVentaInsert {
  propiedad_id: string
  propiedad_titulo?: string
  cliente_nombre: string
  cliente_email: string
  cliente_telefono: string
  mensaje?: string
  fecha_reserva: string
  estado: EstadoReservaVenta
  usuario_id?: string
  asesor_asignado?: string
}

// Datos del formulario
// Asegúrate de que esta interfaz sea la que rige el formulario:
export interface CrearReservaVenta {
  propiedad_id: string 
  propiedad_titulo?: string
  nombre: string
  email: string
  telefono: string
  mensaje?: string
  usuario_id?: string
}