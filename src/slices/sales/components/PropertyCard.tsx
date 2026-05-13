import type { PropiedadVenta } from "../type"
import { useNavigate } from "@tanstack/react-router"
import {  Bed, Home, } from 'lucide-react'
import { Small } from "@/components/ui/Typography"


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
      className="group rounded-2xl bg-white overflow-hidden cursor-pointer shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.14)]"
      onClick={handleClick}
    >
      {/* Imagen */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#52655B]/10 to-[#52655B]/5">
        <img
          src={img}
          alt={`Propiedad en ${property.ubicacion.canton}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/600x360'
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/65 via-[#2f3a35]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Pill tipo (esquina superior izquierda) */}
        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
          {property.ubicacion.canton}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="p-4">
        {/* Título + Precio */}
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-5 text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B]">
            {property.ubicacion.distrito}
          </h3>
          <div className="shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2.5 py-1 text-xs font-semibold text-[#52655B]">
            ₡{formatPrice(property.precio)}
          </div>
        </div>

        {/* Características compactas (inline) */}
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5 text-[#52655B]" />
            <span className="font-medium text-[#2f3a35]">{property.habitaciones}</span>
            <span className="ml-1 text-gray-400">hab</span>
          </div>

          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#52655B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12a9 9 0 1018 0v-3a3 3 0 00-3-3h-1" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7v1m0 4v1m4-5v1m0 4v1" />
            </svg>
            <span className="font-medium text-[#2f3a35]">{property.baños}</span>
            <span className="ml-1 text-gray-400">baños</span>
          </div>

          <div className="flex items-center gap-1">
            <Home className="h-3.5 w-3.5 text-[#52655B]" />
            <span className="font-medium text-[#2f3a35]">{property.area_terreno}m²</span>
            <span className="ml-1 text-gray-400">terreno</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-end gap-3">
           <button
             onClick={(e) => {
               e.stopPropagation()
               handleClick()
             }}
             className="inline-flex items-center gap-2 rounded-lg border border-[#52655B]/20 bg-white px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
           >
             <Small>Ver propiedad</Small>
             <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
           </button>
         </div>
      </div>
    </article>
  )
}

