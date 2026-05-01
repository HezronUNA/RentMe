import { supabase } from "@/api/supabase/client"
import type { PropiedadVenta } from "../type"
import { mapSupabasePropiedad, obtenerAmenidadesPorPropiedades } from "./supabaseMapper"

// ✅ Obtener una propiedad específica por ID
export async function getPropiedadById(id: string): Promise<PropiedadVenta | null> {
  const { data, error } = await supabase
    .from("propiedades_venta")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw error
  }

  const amenidadesMap = await obtenerAmenidadesPorPropiedades([data.id])

  return mapSupabasePropiedad({
    ...data,
    propiedad_amenidades: amenidadesMap[data.id] || [],
  })
}

