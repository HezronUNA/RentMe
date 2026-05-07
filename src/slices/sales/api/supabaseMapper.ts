import { supabase } from "@/api/supabase/client"
import type {
  CrearReservaVenta,
  EstadoPropiedad,
  FirebaseGeoPoint,
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

function normalizeUbicacionExacta(row: SupabasePropiedadRow): FirebaseGeoPoint {
  if (typeof row.ubicacion_exacta === "string") {
    try {
      const parsed = JSON.parse(row.ubicacion_exacta)
      if (typeof parsed?.latitude === "number" && typeof parsed?.longitude === "number") {
        return {
          latitude: parsed.latitude,
          longitude: parsed.longitude,
        }
      }

      if (typeof parsed?.lat === "number" && typeof parsed?.lng === "number") {
        return {
          latitude: parsed.lat,
          longitude: parsed.lng,
        }
      }
    } catch {
      // If the string is not JSON, continue with fallback fields.
    }
  }

  const latitude = typeof row.latitud === "number" ? row.latitud : 0
  const longitude = typeof row.longitud === "number" ? row.longitud : 0

  return {
    latitude,
    longitude,
  }
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
  const ubicacionTexto =
    typeof row.ubicacion_exacta === "string" && row.ubicacion_exacta.trim().length > 0
      ? row.ubicacion_exacta.trim()
      : undefined

  return {
    id: row.id ?? "",
    descripcion: row.descripcion ?? "",
    habitaciones: row.habitaciones ?? 0,
    baños: Number(row.banos ?? row.baños ?? 0),
    areaTerreno: Number(row.area_terreno ?? row.areaTerreno ?? 0),
    estado: normalizeEstado(row.estado),
    añoConstruccion: row.ano_construccion ?? row.añoConstruccion ?? undefined,
    precio: Number(row.precio ?? 0),
    amenidades: normalizeAmenidades(row.propiedad_amenidades),
    ubicacion: normalizeUbicacion(row.ubicacion),
    ubicacionTexto,
    ubicacionExacta: normalizeUbicacionExacta(row),
    imagenes: normalizeImages(row.imagenes),
    asesorResponsable: normalizeAsesorResponsable(row.asesor_responsable),
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
  return {
    id: row.id ?? "",
    propiedadId: row.propiedadId ?? row.propiedad_venta_id ?? "",
    propiedadTitulo:
      // support camelCase or snake_case column names
      row.propiedadTitulo ?? row.propiedad_titulo ?? undefined,
    clienteNombre:
      row.clienteNombre ?? row.cliente_nombre ?? "",
    clienteEmail:
      row.clienteEmail ?? row.cliente_email ?? "",
    clienteTelefono:
      row.clienteTelefono ?? row.cliente_telefono ?? "",
    mensaje: row.mensaje ?? undefined,
    fechaReserva:
      row.fechaReserva
        ? new Date(row.fechaReserva)
        : row.fecha_reserva
        ? new Date(row.fecha_reserva)
        : new Date(),
    fechaCreacion:
      row.fechaCreacion
        ? new Date(row.fechaCreacion)
        : row.fecha_creacion
        ? new Date(row.fecha_creacion)
        : new Date(),
    estado: row.estado ?? "Pendiente",
    usuarioId: row.usuarioId ?? row.usuario_id ?? undefined,
    asesorAsignado:
      row.asesorAsignado ?? row.asesor_asignado ?? undefined,
  }
}

export function buildReservaNotas(data: CrearReservaVenta): string {
  const partes = [
    `Nombre: ${data.nombre}`,
    `Email: ${data.email}`,
    `Telefono: ${data.telefono}`,
    data.propiedadTitulo ? `Propiedad: ${data.propiedadTitulo}` : null,
    data.mensaje ? `Mensaje: ${data.mensaje}` : null,
  ]

  return partes.filter((parte): parte is string => Boolean(parte)).join("\n")
}