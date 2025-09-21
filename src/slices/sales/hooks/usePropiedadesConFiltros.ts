import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { EstadoPropiedad } from '../type'
import { getPropiedadesVenta } from '../api/getSalesProperties'
import { getPropiedadesByEstado } from '../api/getPropertiesByState'
import { getPropiedadesByUbicacion } from '../api/getPropertiesByLocation'
import { getPropiedadesByPrecio } from '../api/getPropertiesByPice'
import { propiedadesQueryKeys } from './queryKeys'

export interface FiltrosBusqueda {
  estado?: EstadoPropiedad
  canton?: string
  precioMin?: number
  precioMax?: number
  habitaciones?: number
  baños?: number
}

/**
 * Hook avanzado para búsqueda con múltiples filtros usando TanStack Query
 * Permite combinar diferentes criterios de búsqueda
 */
export function usePropiedadesConFiltros() {
  const [filtrosActivos, setFiltrosActivos] = useState<FiltrosBusqueda>({})

  // Determinar la función y query key basada en los filtros
  const { queryKey, queryFn, enabled } = useMemo(() => {
    // Si hay filtros de precio válidos
    if (filtrosActivos.precioMin !== undefined && filtrosActivos.precioMax !== undefined) {
      return {
        queryKey: propiedadesQueryKeys.filtered({ type: 'precio', ...filtrosActivos }),
        queryFn: () => getPropiedadesByPrecio(filtrosActivos.precioMin!, filtrosActivos.precioMax!),
        enabled: true
      }
    }
    
    // Si hay filtro de ubicación
    if (filtrosActivos.canton) {
      return {
        queryKey: propiedadesQueryKeys.filtered({ type: 'ubicacion', ...filtrosActivos }),
        queryFn: () => getPropiedadesByUbicacion(filtrosActivos.canton!),
        enabled: true
      }
    }
    
    // Si hay filtro de estado
    if (filtrosActivos.estado) {
      return {
        queryKey: propiedadesQueryKeys.filtered({ type: 'estado', ...filtrosActivos }),
        queryFn: () => getPropiedadesByEstado(filtrosActivos.estado!),
        enabled: true
      }
    }
    
    // Si no hay filtros específicos de API
    return {
      queryKey: propiedadesQueryKeys.filtered({ type: 'all', ...filtrosActivos }),
      queryFn: getPropiedadesVenta,
      enabled: true
    }
  }, [filtrosActivos])

  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime: 3 * 60 * 1000, // 3 minutos
    refetchOnWindowFocus: false,
    select: (data) => {
      // Aplicar filtros adicionales que no están cubiertos por las APIs
      let resultado = data

      if (filtrosActivos.habitaciones !== undefined) {
        resultado = resultado.filter(p => p.habitaciones === filtrosActivos.habitaciones)
      }

      if (filtrosActivos.baños !== undefined) {
        resultado = resultado.filter(p => p.baños === filtrosActivos.baños)
      }

      // Si se aplicaron filtros de precio pero no se usó la API de precio
      if (
        (filtrosActivos.precioMin !== undefined || filtrosActivos.precioMax !== undefined) &&
        (filtrosActivos.canton || filtrosActivos.estado)
      ) {
        if (filtrosActivos.precioMin !== undefined) {
          resultado = resultado.filter(p => p.precio >= filtrosActivos.precioMin!)
        }
        if (filtrosActivos.precioMax !== undefined) {
          resultado = resultado.filter(p => p.precio <= filtrosActivos.precioMax!)
        }
      }

      return resultado
    }
  })

  const buscarConFiltros = useCallback((filtros: FiltrosBusqueda) => {
    setFiltrosActivos(filtros)
  }, [])

  const limpiarFiltros = useCallback(() => {
    setFiltrosActivos({})
  }, [])

  const actualizarFiltro = useCallback((clave: keyof FiltrosBusqueda, valor: any) => {
    setFiltrosActivos(prev => {
      const nuevosFiltros = { ...prev }
      
      // Si el valor es null o undefined, remover la clave
      if (valor === null || valor === undefined) {
        delete nuevosFiltros[clave]
      } else {
        nuevosFiltros[clave] = valor
      }
      
      return nuevosFiltros
    })
  }, [])

  const removerFiltro = useCallback((clave: keyof FiltrosBusqueda) => {
    setFiltrosActivos(prev => {
      const nuevosFiltros = { ...prev }
      delete nuevosFiltros[clave]
      return nuevosFiltros
    })
  }, [])

  // Función para obtener estadísticas de los resultados
  const getEstadisticas = useCallback(() => {
    if (!query.data || query.data.length === 0) return null

    const precios = query.data.map(p => p.precio)
    const habitaciones = query.data.map(p => p.habitaciones)
    const baños = query.data.map(p => p.baños)

    return {
      total: query.data.length,
      precio: {
        minimo: Math.min(...precios),
        maximo: Math.max(...precios),
        promedio: Math.round(precios.reduce((sum, p) => sum + p, 0) / precios.length)
      },
      habitaciones: {
        minimo: Math.min(...habitaciones),
        maximo: Math.max(...habitaciones),
        promedio: Math.round(habitaciones.reduce((sum, h) => sum + h, 0) / habitaciones.length)
      },
      baños: {
        minimo: Math.min(...baños),
        maximo: Math.max(...baños),
        promedio: Math.round(baños.reduce((sum, b) => sum + b, 0) / baños   .length)
      }
    }
  }, [query.data])

  // Verificar si hay filtros activos
  const tieneFiltrosActivos = Object.keys(filtrosActivos).length > 0

  return {
    propiedades: query.data ?? [],
    loading: query.isPending,
    error: query.error?.message ?? null,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
    filtrosActivos,
    buscarConFiltros,
    limpiarFiltros,
    actualizarFiltro,
    removerFiltro,
    tieneFiltrosActivos,
    count: query.data?.length ?? 0,
    isEmpty: !query.data || query.data.length === 0,
    estadisticas: getEstadisticas()
  }
}