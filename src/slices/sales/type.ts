// src/slices/sales/types/sales.ts

export type EstadoPropiedad = 'Disponible' | 'Reservada' | 'Vendida'

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
  banos: number
  areaTerreno: number
  estado: EstadoPropiedad
  anoConstruccion?: number
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
  banos: number
  areaTerreno: number
  estado: EstadoPropiedad
  anoConstruccion?: number
  precio: number
  amenidades: string[]
  ubicacion: Ubicacion
  ubicacionExacta: UbicacionExacta
  imagenes: string[]
  asesorResponsable: AsesorResponsable
}