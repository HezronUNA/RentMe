/**
 * Servicio para hospedajes destacados desde Supabase
 */
import type { HospedajeDestacado } from '@/types/AccomodationsHighlights'
import { supabase } from '../api/supabase/client'

/**
 * Obtiene los hospedajes destacados desde Supabase
 * Usa el esquema actual (columna `imagenes` en la tabla `hospedajes`)
 */
export async function getHospedajesDestacados(): Promise<HospedajeDestacado[]> {
  try {
    const { data, error } = await supabase
      .from('hospedajes')
      .select(`
        id,
        nombre,
        precio_noche,
        cuartos,
        banos,
        camas,
        ubicacion,
        imagenes
      `)
      .eq('activo', true)
      .eq('destacado', true)
      .order('creado_en', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error fetching hospedajes destacados:', error)
      throw error
    }

    // Transformar la respuesta al formato esperado por el frontend
    return (data || []).map((hospedaje) => ({
      id: hospedaje.id,
      nombre: hospedaje.nombre,
      precioNoche: Number(hospedaje.precio_noche),
      cuartos: hospedaje.cuartos || 0,
      baños: hospedaje.banos || 0,
      camas: hospedaje.camas || 0,
      Imagenes: Array.isArray(hospedaje.imagenes)
        ? hospedaje.imagenes.filter((img): img is string => typeof img === 'string')
        : [],
      ubicacion: {
        direccion: hospedaje.ubicacion || 'Sin ubicación',
      },
    }))
  } catch (error) {
    console.error('Error en getHospedajesDestacados:', error)
    return []
  }
}
