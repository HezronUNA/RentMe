import { supabase } from "@/api/supabase"
import type { HospedajeReglaExpandido, ReglaDB } from "../model/accomodationType"

/**
 * Obtener todas las reglas de un hospedaje específico
 *
 * @param hospedajeId - UUID del hospedaje
 * @returns Array de reglas con sus detalles
 */
export async function getHospedajeReglas(
  hospedajeId: string
): Promise<HospedajeReglaExpandido[]> {
  try {
    // Primero obtener los ids de reglas
    const { data: relations, error: relError } = await supabase
      .from("hospedaje_reglas")
      .select("regla_id")
      .eq("hospedaje_id", hospedajeId)

    if (relError) throw relError

    if (!relations || relations.length === 0) return []

    // Luego obtener los detalles de las reglas
    const reglaIds = relations.map(r => (r as any).regla_id)
    const { data: reglas, error: rError } = await supabase
      .from("reglas")
      .select("*")
      .in("id", reglaIds)

    if (rError) throw rError

    // Mapear datos para mantener compatibilidad con el tipo
    return (reglas || []).map((regla) => ({
      hospedaje_id: hospedajeId,
      regla: regla as ReglaDB,
    }))
  } catch (error) {
    console.error(
      `Error obteniendo reglas del hospedaje ${hospedajeId}:`,
      error
    )
    throw error
  }
}

/**
 * Obtener una regla específica por ID (para referencia individual)
 *
 * @param reglaId - UUID de la regla
 * @returns Datos de la regla o null
 */
export async function getReglaById(reglaId: string): Promise<ReglaDB | null> {
  try {
    const { data, error } = await supabase
      .from("reglas")
      .select("*")
      .eq("id", reglaId)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw error
    }

    return data as unknown as ReglaDB
  } catch (error) {
    console.error("Error obteniendo regla por ID:", error)
    throw error
  }
}
