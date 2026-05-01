// Tipos de hospedajes para Supabase

export interface TipoHospedaje {
  id: string
  nombre: string
}

export interface HospedajeImagen {
  id: string
  hospedaje_id: string
  url: string
  orden: number
  es_principal: boolean
}

export interface Servicio {
  id: string
  nombre: string
  icono?: string | null
}

export interface HospedajeServicio {
  hospedaje_id: string
  servicio: Servicio
}

export interface CalendarioBloqueo {
  id: string
  hospedaje_id: string
  fecha_inicio: string // 'YYYY-MM-DD'
  fecha_fin: string // 'YYYY-MM-DD'
  fuente: string
  referencia_externa?: string | null
}

export interface HospedajeRow {
  id: string
  nombre: string
  descripcion: string | null
  cuartos: number
  banos: number
  camas: number
  tipo_hospedaje_id: string | null
  ubicacion: string | null
  precio_noche: number
  activo: boolean
  destacado?: boolean | null
  latitud?: number | null
  longitud?: number | null
  imagenes?: string[] // ARRAY de URLs en la BD
  creado_en?: string
  actualizado_en?: string | null
}

// Hospedaje usado en el frontend (con campos mapeados a camelCase)
export interface Hospedaje {
  id: string
  nombre: string
  descripcion: string | null
  cuartos: number
  baños: number // mapeado desde banos
  camas: number
  tipo_hospedaje_id: string | null
  ubicacion: string | null
  precioNoche: number // mapeado desde precio_noche
  activo: boolean
  destacado?: boolean | null
  latitud?: number | null
  longitud?: number | null
  imagenes?: string[] // Array de URLs
  creado_en?: string
  actualizado_en?: string | null
}

export type HospedajeInsert = Omit<Partial<HospedajeRow>, 'id' | 'creado_en' | 'actualizado_en'> & {
  nombre: string
  precio_noche: number
}

export type HospedajeUpdate = Partial<HospedajeInsert>


