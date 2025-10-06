import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Hospedaje } from '../type'
import { getHospedajes } from '../api/getHospedajes'
import { getHospedajesByPrice } from '../api/getHospedajesByPrice'
import { searchHospedajes } from '../api/getHospedajesByLocation'

export interface FiltrosBusquedaHospedajes {
  canton?: string
  precioMin?: number
  precioMax?: number
  cuartos?: number
  camas?: number
  baños?: number
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
    // Si hay filtros de precio válidos
    if (filtrosActivos.precioMin !== undefined && filtrosActivos.precioMax !== undefined) {
      return {
        queryKey: ['hospedajes', 'filtered', { type: 'precio', ...filtrosActivos }],
        queryFn: () => getHospedajesByPrice(filtrosActivos.precioMin!, filtrosActivos.precioMax!),
        enabled: true
      }
    }
    
    // Si hay filtro de ubicación (canton)
    if (filtrosActivos.canton) {
      return {
        queryKey: ['hospedajes', 'filtered', { type: 'ubicacion', ...filtrosActivos }],
        queryFn: () => searchHospedajes(filtrosActivos.canton!),
        enabled: true
      }
    }
    
    // Si no hay filtros específicos de API
    return {
      queryKey: ['hospedajes', 'filtered', { type: 'all', ...filtrosActivos }],
      queryFn: getHospedajes,
      enabled: true
    }
  }, [filtrosActivos])

  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime: 3 * 60 * 1000, // 3 minutos
    refetchOnWindowFocus: false,
    select: (data: Hospedaje[]) => {
      // Aplicar filtros adicionales que no están cubiertos por las APIs
      let resultado = data || []

      if (filtrosActivos.cuartos !== undefined && filtrosActivos.cuartos > 0) {
        resultado = resultado.filter(h => h.cuartos >= filtrosActivos.cuartos!)
      }

      if (filtrosActivos.camas !== undefined && filtrosActivos.camas > 0) {
        resultado = resultado.filter(h => h.camas >= filtrosActivos.camas!)
      }

      if (filtrosActivos.baños !== undefined && filtrosActivos.baños > 0) {
        resultado = resultado.filter(h => h.baños >= filtrosActivos.baños!)
      }

      // Si se aplicaron filtros de precio pero no se usó la API de precio
      if (
        (filtrosActivos.precioMin !== undefined || filtrosActivos.precioMax !== undefined) &&
        filtrosActivos.canton
      ) {
        if (filtrosActivos.precioMin !== undefined) {
          resultado = resultado.filter(h => h.precioNoche >= filtrosActivos.precioMin!)
        }
        if (filtrosActivos.precioMax !== undefined) {
          resultado = resultado.filter(h => h.precioNoche <= filtrosActivos.precioMax!)
        }
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
      promedioPrecio: total > 0 ? Math.round(hospedajes.reduce((sum: number, h: Hospedaje) => sum + h.precioNoche, 0) / total) : 0
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

  if (filtrosSearchBox.baños && filtrosSearchBox.baños > 0) {
    filtros.baños = filtrosSearchBox.baños
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