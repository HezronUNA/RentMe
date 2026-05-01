import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { HospedajeFrontend } from '../model/accomodationType'
import { getHospedajesDisponibles } from '../api/getHospedajesDisponibles'

export interface FiltrosBusquedaHospedajes {
  canton?: string
  precioMin?: number
  precioMax?: number
  cuartos?: number
}

/**
 * Hook avanzado para búsqueda con múltiples filtros usando TanStack Query
 * Permite combinar diferentes criterios de búsqueda
 * Basado en el flujo de ventas para mantener consistencia
 */
export function useHospedajesConFiltros() {
  const [filtrosActivos, setFiltrosActivos] = useState<FiltrosBusquedaHospedajes>({})

  // Determinar la función y query key basada en los filtros (igual que ventas)
  const { queryKey, queryFn, enabled } = useMemo(() => {
    return {
      queryKey: ['hospedajes', 'filtered', { type: 'all', ...filtrosActivos }],
      queryFn: () => getHospedajesDisponibles({
        ubicacion: filtrosActivos.canton,
        precioMin: filtrosActivos.precioMin,
        precioMax: filtrosActivos.precioMax,
      }),
      enabled: true
    }
  }, [filtrosActivos])

  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime: 3 * 60 * 1000, // 3 minutos
    refetchOnWindowFocus: false,
    select: (data: HospedajeFrontend[] | null) => {
      let resultado = data || []

      if (typeof filtrosActivos.cuartos === 'number' && filtrosActivos.cuartos > 0) {
        resultado = resultado.filter((hospedaje) => hospedaje.cuartos >= filtrosActivos.cuartos!)
      }

      return resultado
    }
  })

  const buscarConFiltros = useCallback((filtros: FiltrosBusquedaHospedajes) => {
    setFiltrosActivos(filtros)
  }, [])

  const limpiarFiltros = useCallback(() => {
    setFiltrosActivos({})
  }, [])

  const tieneFiltrosActivos = useMemo(() => {
    return Object.values(filtrosActivos).some(valor => 
      valor !== undefined && valor !== null && valor !== '' && 
      (Array.isArray(valor) ? valor.length > 0 : true)
    )
  }, [filtrosActivos])

  // Estadísticas básicas
  const estadisticas = useMemo(() => {
    const hospedajes = query.data || []
    const total = hospedajes.length
    const destacados = hospedajes.filter(h => h.destacado).length
    
    return {
      total,
      destacados,
      promedioPrecio: total > 0 ? Math.round(hospedajes.reduce((sum: number, h: HospedajeFrontend) => sum + h.precioNoche, 0) / total) : 0
    }
  }, [query.data])

  return {
    // Datos
    hospedajes: query.data || [],
    loading: query.isLoading,
    error: query.error,
    
    // Estado de filtros
    filtrosActivos,
    tieneFiltrosActivos,
    
    // Acciones
    buscarConFiltros,
    limpiarFiltros,
    
    // Estadísticas
    estadisticas,
    
    // Query info
    isStale: query.isStale,
    refetch: query.refetch
  }
}

// Función helper para crear filtros desde el search box (similar a ventas)
export const crearFiltrosDesdeSearchBox = (filtrosSearchBox: any): FiltrosBusquedaHospedajes => {
  const filtros: FiltrosBusquedaHospedajes = {}

  if (filtrosSearchBox.ubicacion?.trim()) {
    filtros.canton = filtrosSearchBox.ubicacion.trim()
  }

  if (filtrosSearchBox.cuartos && filtrosSearchBox.cuartos > 0) {
    filtros.cuartos = filtrosSearchBox.cuartos
  }

  const precioMinNum = parseFloat(filtrosSearchBox.price)
  const precioMaxNum = parseFloat(filtrosSearchBox.precioMax)

  if (!isNaN(precioMinNum) && precioMinNum > 0) {
    filtros.precioMin = precioMinNum
  }

  if (!isNaN(precioMaxNum) && precioMaxNum > 0) {
    filtros.precioMax = precioMaxNum
  }

  return filtros
}

