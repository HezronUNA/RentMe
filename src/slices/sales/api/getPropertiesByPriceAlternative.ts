import { supabase } from "@/api/supabase/client"
import type { PropiedadVenta } from "../type"
import { mapSupabasePropiedad, obtenerAmenidadesPorPropiedades } from "./supabaseMapper"

export async function getPropiedadesByPrecioAlternative(precioMin: number, precioMax: number): Promise<PropiedadVenta[]> {
  const { data, error } = await supabase
    .from("propiedades_venta")
    .select("*")
    .eq("activo", true)
    .eq("estado", "disponible")
    .gte("precio", precioMin)
    .lte("precio", precioMax)
    .order("precio", { ascending: true })

  if (error) {
    throw error
  }

  const propiedadIds = (data || []).map((propiedad) => propiedad.id)
  const amenidadesMap = await obtenerAmenidadesPorPropiedades(propiedadIds)

  return (data || []).map((row) =>
    mapSupabasePropiedad({
      ...row,
      propiedad_amenidades: amenidadesMap[row.id] || [],
    }),
  )
}

