import { supabase } from '@/api/supabase/client'
import type { HospedajeFrontend } from '../model/accomodationType'

export interface FiltroHospedajeSupabase {
  ubicacion?: string
  precioMin?: number
  precioMax?: number
  numHuespedesMin?: number
}

// Obtener hospedajes activos desde Supabase filtrando solo por ubicación y precio
export async function getHospedajesDisponibles(
  filtros: FiltroHospedajeSupabase = {}
): Promise<HospedajeFrontend[]> {
  try {
    let query = supabase
      .from('hospedajes')
      .select('*')
      .eq('activo', true)
      .order('precio_noche', { ascending: true })

    if (filtros.ubicacion?.trim()) {
      query = query.ilike('ubicacion', `%${filtros.ubicacion.trim()}%`)
    }

    if (typeof filtros.precioMin === 'number') {
      query = query.gte('precio_noche', filtros.precioMin)
    }

    if (typeof filtros.precioMax === 'number') {
      query = query.lte('precio_noche', filtros.precioMax)
    }

    if (typeof filtros.numHuespedesMin === 'number') {
      query = query.gte('num_huespedes', filtros.numHuespedesMin)
    }

    const { data, error } = await query

    if (error) throw error

    return (data || []).map((row) => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      cuartos: row.cuartos ?? 0,
      banos: row.banos ?? 0,
      camas: row.camas ?? 0,
      tipoHospedajeId: row.tipo_hospedaje_id ?? null,
      ubicacion: row.ubicacion ?? null,
      precioNoche: Number(row.precio_noche ?? 0),
      num_huespedes: row.num_huespedes ?? 0,
      activo: row.activo ?? true,
      destacado: row.destacado ?? null,
      latitud: row.latitud ?? null,
      longitud: row.longitud ?? null,
      googleMapsUrl: row.google_maps_url ?? null,
      imagenes: row.imagenes ?? [],
      creadoEn: row.creado_en,
      actualizadoEn: row.actualizado_en ?? null,
    }))
  } catch (error) {
    console.error('Error obteniendo hospedajes desde Supabase:', error)
    throw error
  }
}

