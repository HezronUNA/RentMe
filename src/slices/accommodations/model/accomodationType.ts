/**
 * TYPES PARA HOSPEDAJES - SUPABASE
 * Tipos refactorizados para la integración con Supabase
 * Incluye relaciones muchos-a-muchos (N:N) con servicios y reglas
 */

// ============================================
// TIPOS BASE DE LA BASE DE DATOS
// ============================================

export interface TipoHospedajeDB {
  id: string
  nombre: string
  creado_en?: string
}

export interface ServicioDB {
  id: string
  nombre: string
  icono?: string | null
}

export interface ReglaDB {
  id: string
  nombre: string
  descripcion?: string | null
}

export interface ReservaHospedajeDB {
  id: string
  hospedaje_id: string
  nombre_cliente: string
  telefono: string
  correo: string
  cantidad_huespedes: number
  fecha_inicio: string
  fecha_fin: string
  estado?: 'pendiente' | 'confirmada' | 'cancelada'
  creado_en?: string
}

export interface ReservaHospedajeInsert {
  id?: string
  hospedaje_id: string
  nombre_cliente: string
  telefono: string
  correo: string
  cantidad_huespedes: number
  fecha_inicio: string
  fecha_fin: string
  estado?: 'pendiente' | 'confirmada' | 'cancelada'
  creado_en?: string
}

export interface ReservaHospedajeUpdate {
  hospedaje_id?: string
  nombre_cliente?: string
  telefono?: string
  correo?: string
  cantidad_huespedes?: number
  fecha_inicio?: string
  fecha_fin?: string
  estado?: 'pendiente' | 'confirmada' | 'cancelada'
}

export interface ReservaHospedajeFrontend {
  id: string
  hospedajeId: string
  nombreCliente: string
  telefono: string
  correo: string
  cantidadHuespedes: number
  fechaInicio: string
  fechaFin: string
  estado?: 'pendiente' | 'confirmada' | 'cancelada'
  creadoEn?: string
}

export interface CrearReservaHospedaje {
  hospedajeId: string
  hospedajeNombre?: string
  nombre: string
  email: string
  telefono: string
  fechaCheckIn: string | Date
  fechaCheckOut: string | Date
  numeroHuespedes: number
  mensaje?: string
  googleUserId?: string
  googleUserData?: unknown
}

export type ReservaHospedajeFirestore = ReservaHospedajeDB



export interface ReseniaDB {
  id: string
  hospedaje_id: string
  usuario_id: string
  calificacion: number // 1-5
  comentario?: string | null
  creado_en?: string
}

/**
 * Fila cruda de la tabla hospedajes
 * Con valores en snake_case tal como vienen de Supabase
 */
export interface HospedajeRow {
  id: string
  nombre: string
  descripcion?: string | null
  cuartos: number
  banos: number
  camas: number
  tipo_hospedaje_id?: string | null
  ubicacion?: string | null
  precio_noche: number
  activo: boolean
  num_huespedes: number
  destacado?: boolean | null
  latitud?: number | null
  longitud?: number | null
  google_maps_url?: string | null
  imagenes?: string[] // ARRAY de URLs de la BD
  creado_en?: string
  actualizado_en?: string | null
}

// ============================================
// TIPOS PARA RELACIONES N:N
// ============================================

export interface HospedajeServicioRelacion {
  hospedaje_id: string
  servicio_id: string
}

export interface HospedajeReglaRelacion {
  hospedaje_id: string
  regla_id: string
}

// ============================================
// TIPOS CON RELACIONES EXPANDIDAS
// ============================================

/**
 * Hospedaje con información del tipo
 */
export interface HospedajeConTipo extends HospedajeRow {
  tipo?: TipoHospedajeDB | null
}

/**
 * Servicio con información de relación
 */
export interface HospedajeServicioExpandido {
  hospedaje_id: string
  servicio: ServicioDB
}

/**
 * Regla con información de relación
 */
export interface HospedajeReglaExpandido {
  hospedaje_id: string
  regla: ReglaDB
}

// ============================================
// TIPO COMPLETO PARA DETALLE DE HOSPEDAJE
// ============================================

/**
 * Hospedaje completo con todas las relaciones
 * (Tal como lo necesita la página de detalle)
 */
export interface HospedajeCompleto extends HospedajeRow {
  // Relaciones expandidas
  tipo?: TipoHospedajeDB | null
  servicios?: HospedajeServicioExpandido[]
  reglas?: HospedajeReglaExpandido[]
  resenas?: ReseniaDB[]
}

// ============================================
// TIPOS PARA EL FRONTEND (camelCase)
// ============================================

/**
 * Tipo de hospedaje para el frontend
 */
export interface TipoHospedajeFrontend {
  id: string
  nombre: string
}

/**
 * Servicio para el frontend
 */
export interface ServicioFrontend {
  id: string
  nombre: string
  icono?: string | null
}

/**
 * Regla para el frontend
 */
export interface ReglaFrontend {
  id: string
  nombre: string
  descripcion?: string | null
}

/**
 * Bloqueo de calendario para el frontend
 */
export interface BloqueoFrontend {
  id: string
  hospedajeId: string
  fechaInicio: string
  fechaFin: string
  fuente: 'internal' | 'airbnb' | 'booking' | 'vrbo' | 'expedia' | 'googleCalendar'
  referenciaExterna?: string | null
  creadoEn?: string
}

/**
 * Disponibilidad de fechas
 */
export interface DisponibilidadFrontend {
  disponible: boolean
  bloqueos: BloqueoFrontend[]
}

/**
 * Reseña para el frontend
 */
export interface ReseniaFrontend {
  id: string
  hospedajeId: string
  usuarioId: string
  calificacion: number
  comentario?: string | null
  creadoEn?: string
}

/**
 * Hospedaje usado en el frontend (camelCase)
 * Es la versión transformada de HospedajeRow
 */
export interface HospedajeFrontend {
  id: string
  nombre: string
  descripcion?: string | null
  cuartos: number
  banos: number
  camas: number
  tipoHospedajeId?: string | null
  ubicacion?: string | null
  precioNoche: number
  activo: boolean
  destacado?: boolean | null
  latitud?: number | null
  longitud?: number | null
  num_huespedes?: number
  googleMapsUrl?: string | null
  imagenes?: string[]
  creadoEn?: string
  actualizadoEn?: string | null
}

/**
 * Hospedaje COMPLETO para el frontend con todas las relaciones
 * (Lo que se mostrará en la página de detalle)
 */
export interface HospedajeDetailFrontend extends HospedajeFrontend {
  tipo?: TipoHospedajeFrontend | null
  servicios?: ServicioFrontend[]
  reglas?: ReglaFrontend[]
  bloqueosCalendario?: BloqueoFrontend[]
  resenas?: ReseniaFrontend[]
  disponibilidad?: DisponibilidadFrontend
}


