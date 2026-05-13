import { supabase } from "@/api/supabase/client"
import type {
  CrearReservaVenta,
  EstadoPropiedad,
  PropiedadVenta,
  ReservaVenta,
  Ubicacion,
} from "../type"

type AmenidadRelacion = {
  amenidad?: {
    nombre?: string | null
  }
}

type SupabasePropiedadRow = Partial<
  PropiedadVenta & {
    id: string
    banos?: number | null
    area_terreno?: number | null
    ano_construccion?: number | null
    ubicacion?: unknown
    ubicacion_exacta?: unknown
    latitud?: number | null
    longitud?: number | null
    imagenes?: unknown
    asesor_responsable?: string | null
    activo?: boolean | null
    propiedad_amenidades?: AmenidadRelacion[]
  }
>

type SupabaseReservaRow = Partial<
  ReservaVenta & {
    propiedad_venta_id?: string
    propiedad_titulo?: string | null
    cliente_nombre?: string | null
    cliente_email?: string | null
    cliente_telefono?: string | null
    fecha_reserva?: string | null
    fecha_creacion?: string | null
    asesor_asignado?: string | null
    usuario_id?: string | null
    notas?: string | null
    creado_en?: string | null
  }
>

const emptyUbicacion: Ubicacion = {
  canton: "Sin cantón",
  distrito: "Sin distrito",
}

function normalizeEstado(value: unknown): EstadoPropiedad {
  const normalized = String(value ?? "").toLowerCase()

  if (normalized === "reservada") return "Reservada"
  if (normalized === "vendida") return "Vendida"
  return "Disponible"
}

function normalizeImages(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value.filter((image): image is string => typeof image === "string")
}

function normalizeUbicacion(value: unknown): Ubicacion {
  if (!value) return emptyUbicacion

  if (typeof value === "string") {
    const parts = value.split(",").map((part) => part.trim()).filter(Boolean)

    if (parts.length >= 2) {
      return {
        distrito: parts[0],
        canton: parts[1],
      }
    }

    return {
      distrito: value,
      canton: value,
    }
  }

  if (typeof value === "object") {
    const ubicacion = value as Partial<Ubicacion>

    return {
      canton: ubicacion.canton ?? emptyUbicacion.canton,
      distrito: ubicacion.distrito ?? emptyUbicacion.distrito,
    }
  }

  return emptyUbicacion
}

function normalizeUbicacionExacta(row: SupabasePropiedadRow): string | null {
  // ubicacion_exacta ahora contiene una URL (Google Maps URL)
  if (typeof row.ubicacion_exacta === "string") {
    const trimmed = row.ubicacion_exacta.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  
  return null
}

function normalizeAmenidades(relaciones: AmenidadRelacion[] | undefined): string[] {
  if (!Array.isArray(relaciones)) return []

  return relaciones
    .map((relacion) => relacion.amenidad?.nombre)
    .filter((nombre): nombre is string => typeof nombre === "string" && nombre.trim().length > 0)
}

function normalizeAsesorResponsable(value: unknown): { email: string } {
  if (typeof value === "string") {
    return { email: value }
  }

  return { email: "" }
}

export function mapSupabasePropiedad(row: SupabasePropiedadRow): PropiedadVenta {
  // ubicacion_exacta contiene la URL de Google Maps
  const googleMapsUrl = normalizeUbicacionExacta(row)

  return {
    id: row.id ?? "",
    descripcion: row.descripcion ?? "",
    habitaciones: row.habitaciones ?? 0,
    baños: Number(row.banos ?? row.baños ?? 0),
    area_terreno: Number(row.area_terreno ?? row.area_terreno ?? 0),
    estado: normalizeEstado(row.estado),
    año_construccion: row.ano_construccion ?? undefined,
    precio: Number(row.precio ?? 0),
    amenidades: normalizeAmenidades(row.propiedad_amenidades),
    ubicacion: normalizeUbicacion(row.ubicacion),
    google_maps_url: googleMapsUrl,
    ubicacion_exacta: googleMapsUrl,
    imagenes: normalizeImages(row.imagenes),
    asesor_responsable: normalizeAsesorResponsable(row.asesor_responsable),
  }
}

export async function obtenerAmenidadesPorPropiedades(propiedadIds: string[]) {
  if (propiedadIds.length === 0) {
    return {} as Record<string, AmenidadRelacion[]>
  }

  const { data, error } = await supabase
    .from("propiedad_amenidades")
    .select("propiedad_venta_id, amenidad:amenidades(nombre)")
    .in("propiedad_venta_id", propiedadIds)

  if (error) {
    throw error
  }

  const amenidadesMap: Record<string, AmenidadRelacion[]> = {}

  ;(data || []).forEach((row) => {
    const propiedadId = (row as { propiedad_venta_id?: string }).propiedad_venta_id
    if (!propiedadId) return

    if (!amenidadesMap[propiedadId]) {
      amenidadesMap[propiedadId] = []
    }

    amenidadesMap[propiedadId].push({
      amenidad: (row as { amenidad?: { nombre?: string | null } }).amenidad,
    })
  })

  return amenidadesMap
}

export function mapSupabaseReserva(row: SupabaseReservaRow): ReservaVenta {
  // Convertir fecha a ISO string si es necesario
  const fechaReserva = row.fecha_reserva
    ? (typeof row.fecha_reserva === 'string' ? row.fecha_reserva : new Date(row.fecha_reserva).toISOString())
    : new Date().toISOString()

  return {
    id: row.id ?? "",
    created_at: row.created_at ?? row.fecha_creacion ?? new Date().toISOString(),
    propiedad_id: row.propiedad_id ?? row.propiedad_venta_id ?? "",
    propiedad_titulo: row.propiedad_titulo ?? undefined,
    cliente_nombre: row.cliente_nombre ?? "",
    cliente_email: row.cliente_email ?? "",
    cliente_telefono: row.cliente_telefono ?? "",
    mensaje: row.mensaje ?? undefined,
    fecha_reserva: fechaReserva,
    estado: row.estado ?? "Pendiente",
    usuario_id: row.usuario_id ?? undefined,
    asesor_asignado: row.asesor_asignado ?? undefined,
  }
}

export function buildReservaNotas(data: CrearReservaVenta): string {
  const partes = [
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Telefono: ${data.telefono}`,
    data.propiedad_titulo ? `Propiedad: ${data.propiedad_titulo}` : null,
    data.mensaje ? `Mensaje: ${data.mensaje}` : null,
  ]

  return partes.filter((parte): parte is string => Boolean(parte)).join("\n")
}