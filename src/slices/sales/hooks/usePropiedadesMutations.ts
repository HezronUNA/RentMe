import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PropiedadVenta, PropiedadVentaFirestore } from '../type'
import { propiedadesQueryKeys } from './queryKeys'

// Importar las funciones de API cuando estén disponibles
// import { createPropiedad, updatePropiedad, deletePropiedad } from '../api/mutations'

/**
 * Hook para crear una nueva propiedad
 */
export function useCreatePropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (_newPropiedad: Omit<PropiedadVentaFirestore, 'id'>) => {
      // TODO: Implementar createPropiedad API function
      throw new Error('API function not implemented yet')
      // return await createPropiedad(newPropiedad)
    },
    onSuccess: (data) => {
      // Invalidar todas las queries relacionadas con propiedades
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
      
      // Agregar la nueva propiedad al cache de la lista general
      queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
        return old ? [data, ...old] : [data]
      })
    },
    onError: (error) => {
      console.error('Error creating propiedad:', error)
    }
  })
}

/**
 * Hook para actualizar una propiedad existente
 */
export function useUpdatePropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (_params: { id: string; data: Partial<PropiedadVentaFirestore> }) => {
      // TODO: Implementar updatePropiedad API function
      throw new Error('API function not implemented yet')
      // return await updatePropiedad(id, data)
    },
    onSuccess: (updatedPropiedad, { id }) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
      
      // Actualizar el cache de la propiedad específica
      queryClient.setQueryData(propiedadesQueryKeys.detail(id), updatedPropiedad)
      
      // Actualizar en las listas también
      queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
        return old?.map(prop => prop.id === id ? updatedPropiedad : prop)
      })
    },
    onError: (error) => {
      console.error('Error updating propiedad:', error)
    }
  })
}

/**
 * Hook para eliminar una propiedad
 */
export function useDeletePropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (_id: string) => {
      // TODO: Implementar deletePropiedad API function
      throw new Error('API function not implemented yet')
      // return await deletePropiedad(id)
    },
    onSuccess: (_, id) => {
      // Remover de todos los caches
      queryClient.removeQueries({ queryKey: propiedadesQueryKeys.detail(id) })
      
      // Remover de las listas
      queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
        return old?.filter(prop => prop.id !== id)
      })
      
      // Invalidar otras queries que puedan estar afectadas
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
    },
    onError: (error) => {
      console.error('Error deleting propiedad:', error)
    }
  })
}

/**
 * Hook para cambiar el estado de una propiedad (Disponible -> Reservada -> Vendida)
 */
export function useCambiarEstadoPropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (_params: { id: string; nuevoEstado: 'Disponible' | 'Reservada' | 'Vendida' }) => {
      // TODO: Implementar cambiarEstado API function
      throw new Error('API function not implemented yet')
      // return await cambiarEstadoPropiedad(id, nuevoEstado)
    },
    onSuccess: (_updatedPropiedad, _params) => {
      // Invalidar queries por estado
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Disponible') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Reservada') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Vendida') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.disponibles() })
      
      // Invalidar todas las queries para asegurar consistencia
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
    },
    onError: (error) => {
      console.error('Error changing propiedad estado:', error)
    }
  })
}

/**
 * Hook para usar optimistic updates
 * Útil para UI más fluida
 */
export function useOptimisticPropiedadUpdate() {
  const queryClient = useQueryClient()
  
  const updateOptimistically = (id: string, updates: Partial<PropiedadVenta>) => {
    // Actualizar inmediatamente en el cache
    queryClient.setQueryData(propiedadesQueryKeys.detail(id), (old: PropiedadVenta | undefined) => {
      return old ? { ...old, ...updates } : undefined
    })
    
    // También actualizar en las listas
    queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
      return old?.map(prop => prop.id === id ? { ...prop, ...updates } : prop)
    })
  }
  
  const revertOptimisticUpdate = (id: string) => {
    // Invalidar para forzar refetch desde el servidor
    queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.lists() })
  }
  
  return {
    updateOptimistically,
    revertOptimisticUpdate
  }
}