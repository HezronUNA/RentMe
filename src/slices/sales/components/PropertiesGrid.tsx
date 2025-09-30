import { PropertyCard } from './PropertyCard'
import { Skeleton } from '@/shared/components/Skeleton'
import type { PropiedadVenta } from '../type'

interface PropertiesGridProps {
  properties: PropiedadVenta[]
  loading?: boolean
  error?: string | null
  onPropertyClick?: (id: string) => void
  emptyMessage?: string
}

export function PropertiesGrid({ 
  properties, 
  loading = false, 
  error = null,
  onPropertyClick,
  emptyMessage = "No se encontraron propiedades" 
}: PropertiesGridProps) {
  
  // Estado de carga
  if (loading) {
    return (
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: 1 columna, Tablet: 2 columnas, Desktop: 3 columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <div className="text-red-500 text-lg font-medium mb-2">
              Error al cargar las propiedades
            </div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Estado vacío
  if (properties.length === 0) {
    return (
      <div className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg font-medium mb-2">
              {emptyMessage}
            </div>
            <p className="text-gray-400">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Grid de propiedades
  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid responsive: 1 col en mobile, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-4">
          {properties.map((property) => (
            <div key={property.id} className="w-full">
              <PropertyCard
                property={property}
                onPropertyClick={onPropertyClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente Skeleton para el loading
function PropertyCardSkeleton() {
  return (
    <div className="w-full">
      <article className="bg-white rounded-xl overflow-hidden shadow-md border border-zinc-200 h-full">
        {/* Imagen skeleton */}
        <Skeleton className="w-full h-48 sm:h-52 lg:h-56" />
        
        <div className="p-3 sm:p-4 space-y-2">
          {/* Ubicación skeleton */}
          <Skeleton className="h-4 w-3/4 mx-auto" />
          
          {/* Descripción skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
          
          {/* Características skeleton */}
          <Skeleton className="h-4 w-4/5 mx-auto" />
          
          {/* Amenidades skeleton */}
          <div className="flex justify-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
          
          {/* Precio skeleton */}
          <Skeleton className="h-6 w-32 mx-auto" />
          
          {/* Botón skeleton */}
          <div className="pt-2 flex justify-center">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </article>
    </div>
  )
}