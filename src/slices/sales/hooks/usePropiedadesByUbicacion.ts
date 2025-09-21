import { useQuery } from '@tanstack/react-query'
import { getPropiedadesByUbicacion } from '../api/getPropertiesByLocation'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener propiedades filtradas por ubicación (cantón) usando TanStack Query
 * @param canton - Nombre del cantón para filtrar
 * @returns {Object} - Estado de las propiedades con React Query features
 */
export function usePropiedadesByUbicacion(canton: string | null) {
  const query = useQuery({
    queryKey: propiedadesQueryKeys.byUbicacion(canton || ''),
    queryFn: () => getPropiedadesByUbicacion(canton!),
    enabled: !!canton && canton.trim().length > 0, // Solo ejecutar si hay cantón válido
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
    cantonActual: canton,
    count: query.data?.length ?? 0,
    isEmpty: !query.data || query.data.length === 0
  }
}