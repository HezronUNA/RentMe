import { supabase } from "@/api/supabase"
import type { HospedajeCompleto } from "../model/accomodationType"

/**
 * Obtener un hospedaje específico por ID desde Supabase
 * Incluye: información básica y tipo
 *
 * @param id - UUID del hospedaje
 * @returns HospedajeCompleto o null si no existe
 */
export async function getHospedajeById(id: string): Promise<HospedajeCompleto | null> {
  try {
    const { data, error } = await supabase
      .from("hospedajes")
      .select(
        `
        *,
        tipo:tipo_hospedaje(*)
      `
      )
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        return null
      }
      throw error
    }

    return data as HospedajeCompleto
  } catch (error) {
    console.error("Error obteniendo hospedaje por ID:", error)
    throw error
  }
}

