/**
 * Hook para obtener hospedajes destacados desde Supabase
 */
import { useQuery } from '@tanstack/react-query'
import { getHospedajesDestacados } from '@/services/hospedajes.service'
import type { HospedajeDestacado } from '@/types/AccomodationsHighlights'

export const hospedajesKeys = {
  destacados: ['hospedajes', 'destacados'] as const,
}

/**
 * Hook para obtener hospedajes destacados desde Supabase
 * Reemplaza la versión anterior que usaba Firebase
 */
export function useAccomodationHighlights() {
  const query = useQuery<HospedajeDestacado[]>({
    queryKey: hospedajesKeys.destacados,
    queryFn: getHospedajesDestacados,
    staleTime: 1000 * 60 * 5, // 5 minutos "frescos"
    gcTime: 1000 * 60 * 60, // 1 hora antes de limpiar el cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return {
    hospedajes: query.data ?? [],
    loading: query.isLoading && !query.data,
    error: query.error,
    reload: query.refetch,
  }
}

export default useAccomodationHighlights
