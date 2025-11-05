import { Button } from "@/shared/components/Button"
import { Small } from "@/shared/components/Typography"
import type { PropiedadVenta } from "../type"
import { useNavigate } from "@tanstack/react-router"
import { MapPin, Bed, Home } from 'lucide-react'

interface PropertyCardProps {
  property: PropiedadVenta
  onPropertyClick?: (id: string) => void
}

export function PropertyCard({ property, onPropertyClick }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const navigate = useNavigate()

  const handleClick = () => {
    if (onPropertyClick) {
      onPropertyClick(property.id)
    } else {
      navigate({ to: `/ventas/${property.id}` })
    }
  }

  const img = property.imagenes && property.imagenes.length > 0 
    ? property.imagenes[0] 
    : "https://placehold.co/600x360"

  return (
    <article 
      className="
        rounded-xl overflow-hidden shadow-md
        border border-zinc-200 bg-gray-50 hover:bg-white hover:shadow-lg 
        bg-zinc-100 transition-all duration-300 hover:scale-[1.02]
        h-full cursor-pointer group
      "
      onClick={handleClick}
    >
      {/* Imagen */}
      <div className="relative h-56 group overflow-hidden">
        <img
          src={img}
          alt={`Propiedad en ${property.ubicacion.canton}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/600x360'
          }}
        />

        <div className="absolute top-3 right-3 z-30">
          <div className="bg-white/95 text-[#52655B] px-4 py-2 rounded-lg text-lg font-semibold shadow-lg border border-zinc-100">
            ₡{formatPrice(property.precio)}
          </div>
        </div>

        {/* Overlay oscuro permanente para mejor legibilidad del título */}
        <div className="absolute inset-0 bg-black/50 opacity-100 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Título sobre la imagen, parte inferior centro */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center pointer-events-none">
          <div className=" px-4 py-2 rounded-md text-center max-w-[92%] pointer-events-auto">
            <h3 className="text-white text-base md:text-lg font-semibold uppercase tracking-widest leading-6 line-clamp-2">
              {`${property.ubicacion.distrito}, ${property.ubicacion.canton}`}
            </h3>
          </div>
        </div>

        {property.imagenes && property.imagenes.length > 1 && (
          <div className="absolute top-20 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
            +{property.imagenes.length - 1} fotos
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        {/* Ubicación con icono */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-zinc-600" />
          <p className="text-lg text-zinc-600 font-bold">{property.ubicacion.distrito}, {property.ubicacion.canton}</p>
        </div>

        {/* Características compactas */}
        <div className="pt-2 grid grid-cols-3 gap-2 items-stretch">
          <div className="bg-zinc-50 rounded-lg border border-zinc-200 px-2 py-2 text-center flex flex-col items-center justify-center">
            <Bed className="h-4 w-4 text-[#52655B]" />
            <span className="text-[11px] text-zinc-600 mt-1">Habitac.</span>
            <span className="text-sm font-medium text-zinc-900 mt-1">{property.habitaciones}</span>
          </div>

          <div className="bg-zinc-50 rounded-lg border border-zinc-200 px-2 py-2 text-center flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#52655B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12a9 9 0 1018 0v-3a3 3 0 00-3-3h-1" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7v1m0 4v1m4-5v1m0 4v1" />
            </svg>
            <span className="text-[11px] text-zinc-600 mt-1">Baños</span>
            <span className="text-sm font-medium text-zinc-900 mt-1">{property.baños}</span>
          </div>

          <div className="bg-zinc-50 rounded-lg border border-zinc-200 px-2 py-2 text-center flex flex-col items-center justify-center">
            <Home className="h-4 w-4 text-[#52655B]" />
            <span className="text-[11px] text-zinc-600 mt-1">Terreno</span>
            <span className="text-sm font-medium text-zinc-900 mt-1">{property.areaTerreno}m²</span>
          </div>
        </div>
        
        {/* Botón centrado */}
        <div className="pt-2 flex justify-center">
          <Button 
            variant="green" 
            className="hover:bg-[#435349] hover:cursor-pointer  transition-colors duration-200 max-w-[220px]"
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            <Small>Ver propiedad</Small>
          </Button>
        </div>
        
      </div>
    </article>
  )
}