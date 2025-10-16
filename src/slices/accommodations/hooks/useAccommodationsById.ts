import { useQuery } from '@tanstack/react-query'
import { getHospedajeById } from '../api/getHospedajeById'

export function useHospedajeById(hospedajeId: string) {
  const query = useQuery({
    queryKey: ['hospedaje', hospedajeId],
    queryFn: () => getHospedajeById(hospedajeId),
    enabled: !!hospedajeId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  })

  return {
    hospedaje: query.data,
    loading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
    isStale: query.isStale
  }
}