import { useQuery } from '@tanstack/react-query'
import { getHospedajeReglas } from '../api/getHospedajeReglas'
import type { HospedajeReglaExpandido } from '../model/accomodationType'

interface UseHospedajeReglasReturn {
  reglas: HospedajeReglaExpandido[] | undefined
  loading: boolean
  error: string | null
  refetch: () => void
  isStale: boolean
}

/**
 * Hook para obtener todas las reglas de un hospedaje
 *
 * @param hospedajeId - UUID del hospedaje
 * @returns {UseHospedajeReglasReturn}
 */
export function useHospedajeReglas(
  hospedajeId: string
): UseHospedajeReglasReturn {
  const query = useQuery({
    queryKey: ['hospedaje-reglas', hospedajeId],
    queryFn: () => getHospedajeReglas(hospedajeId),
    enabled: !!hospedajeId,
    staleTime: 15 * 60 * 1000, // 15 minutos (datos menos dinámicos)
    refetchOnWindowFocus: false,
  })

  return {
    reglas: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => query.refetch(),
    isStale: query.isStale,
  }
}
