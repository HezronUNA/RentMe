import { supabase } from '@/api/supabase/client'
import type { HospedajeFrontend } from '../model/accomodationType'

export class HospedajesService {
  /** Obtener todos los hospedajes activos - imagenes y ubicacion están en la misma tabla */
  static async getAll(): Promise<HospedajeFrontend[]> {
    try {
      const { data, error } = await supabase
        .from('hospedajes')
        .select('*')
        .eq('activo', true)
        .order('creado_en', { ascending: false })

      if (error) throw error

      // La tabla ya contiene imagenes (ARRAY) y ubicacion directamente
      return (data || []) as unknown as HospedajeFrontend[]
    } catch (err: any) {
      console.error('Error in HospedajesService.getAll():', err)
      throw err
    }
  }

  /** Obtener hospedaje por ID - imagenes y ubicacion en la misma tabla */
  static async getById(id: string): Promise<HospedajeFrontend | null> {
    try {
      const { data, error } = await supabase
        .from('hospedajes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if ((error as any).code === 'PGRST116') return null
        throw error
      }

      return data as unknown as HospedajeFrontend
    } catch (err: any) {
      console.error('Error in HospedajesService.getById():', err)
      throw err
    }
  }
}

// Funciones wrapper para uso directo (React Query compatible)
export const getHospedajes = (): Promise<HospedajeFrontend[]> => HospedajesService.getAll()

export const getHospedajeById = (id: string): Promise<HospedajeFrontend | null> => HospedajesService.getById(id)

export default getHospedajes
