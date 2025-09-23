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
  ubicacionExacta: UbicacionExacta
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
  ubicacionExacta: UbicacionExacta
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