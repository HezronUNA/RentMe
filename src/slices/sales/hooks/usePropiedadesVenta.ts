import { useQuery } from '@tanstack/react-query'
import { getPropiedadesVenta } from '../api/getSalesProperties'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener todas las propiedades de venta usando TanStack Query
 * @returns {Object} - Estado de las propiedades con React Query features
 */
export function usePropiedadesVenta() {
  const query = useQuery({
    queryKey: propiedadesQueryKeys.lists(),
    queryFn: getPropiedadesVenta,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
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