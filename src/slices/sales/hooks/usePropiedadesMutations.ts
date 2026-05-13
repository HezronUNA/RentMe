// src/slices/sales/hooks/usePropiedadesMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PropiedadVenta, PropiedadVentaInsert } from '../type'
import { propiedadesQueryKeys } from './queryKeys'

// TODO: Importar las funciones de API de Supabase cuando estén listas
// import { createPropiedad, updatePropiedad, deletePropiedad } from '../api/mutations'

/**
 * Hook para crear una nueva propiedad en Supabase
 */
export function useCreatePropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    // Usamos PropiedadVentaInsert que ya no tiene el ID
    mutationFn: async (_newPropiedad: PropiedadVentaInsert) => {
      throw new Error('API function not implemented yet')
      // return await createPropiedad(newPropiedad)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
      
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
    // Usamos Partial<PropiedadVentaInsert> para actualizaciones parciales
    mutationFn: async (_params: { id: string; data: Partial<PropiedadVentaInsert> }) => {
      throw new Error('API function not implemented yet')
      // return await updatePropiedad(id, data)
    },
    onSuccess: (updatedPropiedad, { id }) => {
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
      queryClient.setQueryData(propiedadesQueryKeys.detail(id), updatedPropiedad)
      
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
      throw new Error('API function not implemented yet')
      // return await deletePropiedad(id)
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: propiedadesQueryKeys.detail(id) })
      
      queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
        return old?.filter(prop => prop.id !== id)
      })
      
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
    },
    onError: (error) => {
      console.error('Error deleting propiedad:', error)
    }
  })
}

/**
 * Hook para cambiar el estado de una propiedad
 */
export function useCambiarEstadoPropiedad() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (_params: { id: string; nuevoEstado: 'Disponible' | 'Reservada' | 'Vendida' }) => {
      throw new Error('API function not implemented yet')
      // return await cambiarEstadoPropiedad(id, nuevoEstado)
    },
    onSuccess: (_updatedPropiedad) => {
      // Invalida estados específicos y la lista general
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Disponible') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Reservada') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.byEstado('Vendida') })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.disponibles() })
      queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.all })
    },
    onError: (error) => {
      console.error('Error changing propiedad estado:', error)
    }
  })
}

/**
 * Hook para usar optimistic updates
 */
export function useOptimisticPropiedadUpdate() {
  const queryClient = useQueryClient()
  
  const updateOptimistically = (id: string, updates: Partial<PropiedadVenta>) => {
    queryClient.setQueryData(propiedadesQueryKeys.detail(id), (old: PropiedadVenta | undefined) => {
      return old ? { ...old, ...updates } : undefined
    })
    
    queryClient.setQueryData(propiedadesQueryKeys.lists(), (old: PropiedadVenta[] | undefined) => {
      return old?.map(prop => prop.id === id ? { ...prop, ...updates } : prop)
    })
  }
  
  const revertOptimisticUpdate = (id: string) => {
    queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: propiedadesQueryKeys.lists() })
  }
  
  return {
    updateOptimistically,
    revertOptimisticUpdate
  }
}