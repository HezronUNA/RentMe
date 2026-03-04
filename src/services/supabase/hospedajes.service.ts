/**
 * Servicio para hospedajes destacados desde Supabase
 */
import type { HospedajeDestacado } from '@/types/AccomodationsHighlights'
import { supabase } from './client'

/**
 * Obtiene los hospedajes destacados desde Supabase
 * Por ahora trae los primeros 6 hospedajes activos
 * TODO: Agregar campo 'destacado' a la tabla hospedajes para filtrar específicamente
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
        hospedaje_imagenes (
          url,
          orden,
          es_principal
        )
      `)
      .eq('activo', true)
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
      Imagenes: (hospedaje.hospedaje_imagenes || [])
        .sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0))
        .map((img: any) => img.url),
      ubicacion: {
        direccion: hospedaje.ubicacion || 'Sin ubicación',
      },
    }))
  } catch (error) {
    console.error('Error en getHospedajesDestacados:', error)
    return []
  }
}
