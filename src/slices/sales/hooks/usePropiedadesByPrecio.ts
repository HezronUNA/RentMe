import { useQuery } from '@tanstack/react-query'
import { getPropiedadesByPrecio } from '../api/getPropertiesByPice'
import { propiedadesQueryKeys } from './queryKeys'

/**
 * Hook para obtener propiedades filtradas por rango de precio usando TanStack Query
 * @param precioMin - Precio mínimo del rango
 * @param precioMax - Precio máximo del rango
 * @returns {Object} - Estado de las propiedades con React Query features
 */
export function usePropiedadesByPrecio(precioMin: number | null, precioMax: number | null) {
  const isValidRange = precioMin !== null && precioMax !== null && precioMin <= precioMax

  const query = useQuery({
    queryKey: propiedadesQueryKeys.byPrecio(precioMin || 0, precioMax || 0),
    queryFn: () => getPropiedadesByPrecio(precioMin!, precioMax!),
    enabled: isValidRange,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  })

  // Función para obtener estadísticas de precios
  const getEstadisticasPrecios = () => {
    if (!query.data || query.data.length === 0) return null

    const precios = query.data.map(p => p.precio)
    const precioMinEncontrado = Math.min(...precios)
    const precioMaxEncontrado = Math.max(...precios)
    const precioPromedio = precios.reduce((sum, precio) => sum + precio, 0) / precios.length

    return {
      minimo: precioMinEncontrado,
      maximo: precioMaxEncontrado,
      promedio: Math.round(precioPromedio),
      cantidad: query.data.length
    }
  }

  return {
    propiedades: query.data ?? [],
    loading: query.isPending,
    error: query.error?.message ?? (
      !isValidRange && precioMin !== null && precioMax !== null 
        ? 'El precio mínimo no puede ser mayor al precio máximo' 
        : null
    ),
    isError: query.isError || !isValidRange,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
    rangoActual: { min: precioMin, max: precioMax },
    count: query.data?.length ?? 0,
    isEmpty: !query.data || query.data.length === 0,
    estadisticas: getEstadisticasPrecios(),
    isValidRange
  }
}