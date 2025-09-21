// Archivo principal de hooks refactorizado para usar TanStack Query
// Se mantiene por compatibilidad, pero se recomienda usar los hooks específicos

export { usePropiedadesVenta } from './usePropiedadesVenta'
export { usePropiedadById } from './usePropiedadById'
export { usePropiedadesDisponibles } from './usePropiedadesDisponibles'
export { usePropiedadesByEstado } from './usePropiedadesByEstado'
export { usePropiedadesByUbicacion } from './usePropiedadesByUbicacion'
export { usePropiedadesByPrecio } from './usePropiedadesByPrecio'
export { usePropiedadesConFiltros, type FiltrosBusqueda } from './usePropiedadesConFiltros'

// Re-exportar las query keys para uso avanzado
export { propiedadesQueryKeys } from './queryKeys'