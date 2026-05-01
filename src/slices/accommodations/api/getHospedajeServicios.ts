import { supabase } from "@/api/supabase"
import type { HospedajeServicioExpandido, ServicioDB } from "../model/accomodationType"

/**
 * Obtener todos los servicios de un hospedaje específico
 *
 * @param hospedajeId - UUID del hospedaje
 * @returns Array de servicios con sus detalles
 */
export async function getHospedajeServicios(
  hospedajeId: string
): Promise<HospedajeServicioExpandido[]> {
  try {
    // Primero obtener los ids de servicios
    const { data: relations, error: relError } = await supabase
      .from("hospedaje_servicios")
      .select("servicio_id")
      .eq("hospedaje_id", hospedajeId)

    if (relError) throw relError

    if (!relations || relations.length === 0) return []

    // Luego obtener los detalles de los servicios
    const servicioIds = relations.map(r => (r as any).servicio_id)
    const { data: servicios, error: sError } = await supabase
      .from("servicios")
      .select("*")
      .in("id", servicioIds)

    if (sError) throw sError

    // Mapear datos para mantener compatibilidad con el tipo
    return (servicios || []).map((servicio) => ({
      hospedaje_id: hospedajeId,
      servicio: servicio as ServicioDB,
    }))
  } catch (error) {
    console.error(
      `Error obteniendo servicios del hospedaje ${hospedajeId}:`,
      error
    )
    throw error
  }
}

/**
 * Obtener un servicio específico por ID (para referencia individual)
 *
 * @param servicioId - UUID del servicio
 * @returns Datos del servicio o null
 */
export async function getServicioById(
  servicioId: string
): Promise<ServicioDB | null> {
  try {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .eq("id", servicioId)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw error
    }

    return data as unknown as ServicioDB
  } catch (error) {
    console.error("Error obteniendo servicio por ID:", error)
    throw error
  }
}

/**
 * Obtener todos los servicios disponibles (catálogo)
 *
 * @returns Array de todos los servicios
 */
export async function getAllServicios(): Promise<ServicioDB[]> {
  try {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")

    if (error) throw error

    return (data || []) as unknown as ServicioDB[]
  } catch (error) {
    console.error("Error obteniendo todos los servicios:", error)
    throw error
  }
}
