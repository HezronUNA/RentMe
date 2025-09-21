import { useQuery } from '@tanstack/react-query'
import type { EstadoPropiedad } from '../type'
import { getPropiedadesByEstado } from '../api/getPropertiesByState'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener propiedades filtradas por estado usando TanStack Query
 * @param estado - Estado de la propiedad (Disponible, Reservada, Vendida)
 * @returns {Object} - Estado de las propiedades con React Query features
 */
export function usePropiedadesByEstado(estado: EstadoPropiedad | null) {
  const query = useQuery({
    queryKey: propiedadesQueryKeys.byEstado(estado || ''),
    queryFn: () => getPropiedadesByEstado(estado!),
    enabled: !!estado, // Solo ejecutar si hay estado
    staleTime: 3 * 60 * 1000, // 3 minutos
    refetchOnWindowFocus: estado === 'Disponible', // Solo refetch automático para disponibles
  })

  return {
    propiedades: query.data ?? [],
    loading: query.isPending,
    error: query.error?.message ?? null,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
    estadoActual: estado,
    count: query.data?.length ?? 0,
    isEmpty: !query.data || query.data.length === 0
  }
}