// Exportar todos los hooks de propiedades de venta con TanStack Query
export { usePropiedadesVenta } from './usePropiedadesVenta'
export { usePropiedadById } from './usePropiedadById'
export { usePropiedadesDisponibles } from './usePropiedadesDisponibles'
export { usePropiedadesByEstado } from './usePropiedadesByEstado'
export { usePropiedadesByUbicacion } from './usePropiedadesByUbicacion'
export { usePropiedadesByPrecio } from './usePropiedadesByPrecio'
export { usePropiedadesConFiltros, type FiltrosBusqueda } from './usePropiedadesConFiltros'

// Hook para la galería de imágenes
export { usePropertyImageGallery } from './usePropertyImageGallery'

// Hooks para mutations (crear, actualizar, eliminar)
export { 
  useCreatePropiedad, 
  useUpdatePropiedad, 
  useDeletePropiedad, 
  useCambiarEstadoPropiedad,
  useOptimisticPropiedadUpdate 
} from './usePropiedadesMutations'

// Query keys para uso avanzado
export { propiedadesQueryKeys } from './queryKeys'

// Re-exportar el hook del search box existente
export { useSearchBox } from './useSearchBox'

// También exportar desde el archivo principal para compatibilidad
export * from './hook'