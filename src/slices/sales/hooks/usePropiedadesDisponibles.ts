import { useQuery } from '@tanstack/react-query'
import { getPropiedadesDisponibles } from '../api/getAvailableProperties'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener todas las propiedades disponibles para venta usando TanStack Query
 * @returns {Object} - Estado de las propiedades disponibles con React Query features
 */
export function usePropiedadesDisponibles() {
  const query = useQuery({
    queryKey: propiedadesQueryKeys.disponibles(),
    queryFn: getPropiedadesDisponibles,
    staleTime: 3 * 60 * 1000, // 3 minutos (las disponibles cambian más frecuentemente)
    refetchOnWindowFocus: true, // Refetch cuando vuelve el foco (importante para disponibilidad)
    refetchInterval: 5 * 60 * 1000, // Refetch cada 5 minutos automáticamente
  })

  return {
    propiedades: query.data ?? [],
    loading: query.isPending,
    error: query.error?.message ?? null,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
    count: query.data?.length ?? 0,
    isEmpty: !query.data || query.data.length === 0
  }
}