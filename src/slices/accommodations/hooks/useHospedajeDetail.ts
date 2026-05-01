import { useQuery } from '@tanstack/react-query'
import { getHospedajeById } from '../api/getHospedajeById'
import type { HospedajeCompleto } from '../model/accomodationType'

interface UseHospedajeDetailReturn {
  hospedaje: HospedajeCompleto | undefined
  loading: boolean
  error: string | null
  refetch: () => void
  isStale: boolean
}

/**
 * Hook para obtener los detalles completos de un hospedaje
 * Incluye: tipo, servicios, reglas y reseñas
 *
 * @param hospedajeId - UUID del hospedaje
 * @returns {UseHospedajeDetailReturn}
 */
export function useHospedajeDetail(hospedajeId: string): UseHospedajeDetailReturn {
  const query = useQuery({
    queryKey: ['hospedaje-detail', hospedajeId],
    queryFn: () => getHospedajeById(hospedajeId),
    enabled: !!hospedajeId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  })

  return {
    hospedaje: query.data ?? undefined,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => query.refetch(),
    isStale: query.isStale,
  }
}
