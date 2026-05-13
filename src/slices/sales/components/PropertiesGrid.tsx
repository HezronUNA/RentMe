import { PropertyCard } from './PropertyCard'
import type { PropiedadVenta } from '../type'
import { Skeleton } from '@/components/ui/Skeleton'

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
      <div className="relative w-full px-4 py-8">
        <div className="relative z-10 max-w-7xl mx-auto">
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
      <div className="relative w-full px-4 py-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center py-8 rounded-[2rem] border border-[#52655B]/15 bg-white/85 shadow-[0_20px_50px_rgba(82,101,91,0.08)] backdrop-blur-sm">
            <div className="text-red-500 text-lg font-medium mb-2">
              Error al cargar las propiedades
            </div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center rounded-full border border-[#52655B] bg-[#52655B] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f4f47]"
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
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[1.75rem] border border-[#52655B]/10 bg-white px-6 py-10 text-center shadow-[0_16px_40px_rgba(16,24,40,0.06)] sm:px-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#52655B]/10 text-[#52655B] ring-1 ring-[#52655B]/10">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 20h16M6 20v-8m4 8V8m4 12v-4m4 4V4" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-[#52655B] sm:text-xl">
              {emptyMessage}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[0.95rem]">
              Prueba cambiar la ubicación o ajustar un poco los filtros para ver más opciones disponibles.
            </p>
          </div>
        </div>
      </div>
    )
  }
  // Grid de propiedades
  return (
    <div className="relative w-full px-4 py-8">
      <div className="relative z-10 max-w-7xl mx-auto">
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

