import { useQuery } from '@tanstack/react-query'
import { getPropiedadById } from '../api/getPropertiesById'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener una propiedad específica por su ID usando TanStack Query
 * @param id - ID de la propiedad a buscar
 * @returns {Object} - Estado de la propiedad con React Query features
 */
export function usePropiedadById(id: string | null) {
  const query = useQuery({
    queryKey: propiedadesQueryKeys.detail(id || ''),
    queryFn: () => getPropiedadById(id!),
    enabled: !!id, // Solo ejecutar si hay ID
    staleTime: 10 * 60 * 1000, // 10 minutos (las propiedades individuales cambian menos)
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // No reintentar si la propiedad no existe
      if (error && 'message' in error && error.message.includes('404')) {
        return false
      }
      return failureCount < 3
    }
  })

  return {
    propiedad: query.data ?? null,
    loading: query.isPending,
    error: query.error?.message ?? null,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    notFound: query.isSuccess && query.data === null,
    refetch: query.refetch,
    exists: query.data !== null && query.data !== undefined
  }
}