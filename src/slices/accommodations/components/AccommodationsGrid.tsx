import { AccommodationCard } from './AccommodationCard'
import type { HospedajeFrontend } from '../model/accomodationType'
import { Skeleton } from '@/components/ui/Skeleton'

interface AccommodationsGridProps {
  accommodations: HospedajeFrontend[]
  loading?: boolean
  error?: string | null
  onAccommodationClick?: (id: string) => void
  emptyMessage?: string
}

export function AccommodationsGrid({ 
  accommodations, 
  loading = false, 
  error = null,
  onAccommodationClick,
  emptyMessage = "No se encontraron hospedajes" 
}: AccommodationsGridProps) {
  // Estado de carga
  if (loading) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: 1 columna, Tablet: 2 columnas, Desktop: 3 columnas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <AccommodationCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center rounded-[2rem] border border-[#52655B]/15 bg-white/85 py-8 shadow-[0_20px_50px_rgba(82,101,91,0.08)] backdrop-blur-sm">
            <div className="text-red-500 text-lg font-medium mb-2">
              Error al cargar los hospedajes
            </div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center rounded-full border border-[#52655B] bg-[#52655B] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#435349]"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Estado vacío
  if (accommodations.length === 0) {
    return (
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center rounded-[2rem] border border-[#52655B]/15 bg-white/85 py-10 shadow-[0_20px_50px_rgba(82,101,91,0.08)] backdrop-blur-sm">
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

  // Grid de hospedajes
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid responsive: 1 col en mobile, 2 en tablet, 3 en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-4">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="w-full">
              <AccommodationCard
                accommodation={accommodation}
                onAccommodationClick={onAccommodationClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente Skeleton para el loading
function AccommodationCardSkeleton() {
  return (
    <div className="w-full">
      <article className="bg-white rounded-xl overflow-hidden shadow-md border border-zinc-200 h-full">
        {/* Imagen skeleton */}
        <Skeleton className="w-full h-48 sm:h-52 lg:h-56" />
        
        <div className="p-3 sm:p-4 space-y-2">
          {/* Nombre skeleton */}
          <Skeleton className="h-4 w-3/4 mx-auto" />
          
          {/* Ubicación skeleton */}
          <Skeleton className="h-4 w-full" />
          
          {/* Características skeleton */}
          <Skeleton className="h-4 w-4/5 mx-auto" />
          
          {/* Servicios skeleton */}
          <div className="flex justify-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
          
          {/* Reglas skeleton */}
          <div className="flex justify-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
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

