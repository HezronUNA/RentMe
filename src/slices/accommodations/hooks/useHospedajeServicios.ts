import { useQuery } from '@tanstack/react-query'
import { getHospedajeServicios, getAllServicios } from '../api/getHospedajeServicios'
import type { HospedajeServicioExpandido, ServicioDB } from '../model/accomodationType'

interface UseHospedajeServiciosReturn {
  servicios: HospedajeServicioExpandido[] | undefined
  loading: boolean
  error: string | null
  refetch: () => void
  isStale: boolean
}

interface UseAllServiciosReturn {
  servicios: ServicioDB[] | undefined
  loading: boolean
  error: string | null
  refetch: () => void
  isStale: boolean
}

/**
 * Hook para obtener todos los servicios de un hospedaje específico
 *
 * @param hospedajeId - UUID del hospedaje
 * @returns {UseHospedajeServiciosReturn}
 */
export function useHospedajeServicios(
  hospedajeId: string
): UseHospedajeServiciosReturn {
  const query = useQuery({
    queryKey: ['hospedaje-servicios', hospedajeId],
    queryFn: () => getHospedajeServicios(hospedajeId),
    enabled: !!hospedajeId,
    staleTime: 15 * 60 * 1000, // 15 minutos (datos menos dinámicos)
    refetchOnWindowFocus: false,
  })

  return {
    servicios: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => query.refetch(),
    isStale: query.isStale,
  }
}

/**
 * Hook para obtener el catálogo completo de servicios
 * Útil para mostrar todos los servicios disponibles
 *
 * @returns {UseAllServiciosReturn}
 */
export function useAllServicios(): UseAllServiciosReturn {
  const query = useQuery({
    queryKey: ['todos-servicios'],
    queryFn: () => getAllServicios(),
    staleTime: 30 * 60 * 1000, // 30 minutos (datos estáticos)
    refetchOnWindowFocus: false,
  })

  return {
    servicios: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => query.refetch(),
    isStale: query.isStale,
  }
}
