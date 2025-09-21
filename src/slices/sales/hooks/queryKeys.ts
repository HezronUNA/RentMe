// Query keys para TanStack Query
export const propiedadesQueryKeys = {
  // Base key
  all: ['propiedades'] as const,
  
  // Listas
  lists: () => [...propiedadesQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...propiedadesQueryKeys.lists(), filters] as const,
  
  // Propiedades específicas
  details: () => [...propiedadesQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...propiedadesQueryKeys.details(), id] as const,
  
  // Por estado
  byEstado: (estado: string) => [...propiedadesQueryKeys.all, 'estado', estado] as const,
  
  // Por ubicación
  byUbicacion: (canton: string) => [...propiedadesQueryKeys.all, 'ubicacion', canton] as const,
  
  // Por precio
  byPrecio: (min: number, max: number) => [...propiedadesQueryKeys.all, 'precio', { min, max }] as const,
  
  // Disponibles
  disponibles: () => [...propiedadesQueryKeys.all, 'disponibles'] as const,
  
  // Con filtros múltiples
  filtered: (filters: Record<string, any>) => [...propiedadesQueryKeys.all, 'filtered', filters] as const,
}