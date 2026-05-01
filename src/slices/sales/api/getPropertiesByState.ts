import { supabase } from "@/api/supabase/client"
import type { EstadoPropiedad, PropiedadVenta } from "../type"
import { mapSupabasePropiedad, obtenerAmenidadesPorPropiedades } from "./supabaseMapper"

const estadoToDb = (estado: EstadoPropiedad) => estado.toLowerCase()

export async function getPropiedadesByEstado(estado: EstadoPropiedad): Promise<PropiedadVenta[]> {
  const { data, error } = await supabase
    .from("propiedades_venta")
    .select("*")
    .eq("activo", true)
    .eq("estado", estadoToDb(estado))
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

