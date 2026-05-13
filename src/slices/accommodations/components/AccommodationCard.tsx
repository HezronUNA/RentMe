
import type { MouseEvent } from 'react'
import type { HospedajeFrontend } from "../model/accomodationType"
import { useNavigate } from "@tanstack/react-router"
import { Bed, Home } from 'lucide-react'
import { P, Small } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'

interface AccommodationCardProps {
  accommodation: HospedajeFrontend
  onAccommodationClick?: (id: string) => void
}

export function AccommodationCard({ accommodation, onAccommodationClick }: AccommodationCardProps) {

  const navigate = useNavigate()

  const truncate = (text?: string, max = 120) => {
    if (!text) return ""
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
  }

  const truncateWords = (text?: string | null, maxWords = 2) => {
    if (!text) return 'Alojamiento'
    const words = text.trim().split(/\s+/)
    const out = words.slice(0, maxWords).join(' ')
    return words.length > maxWords ? `${out}…` : out
  }

  const handleClick = () => {
    if (onAccommodationClick) {
      onAccommodationClick(accommodation.id)
    } else {
      navigate({ to: `/alojamientos/${accommodation.id}` })
    }
  }

  const img = (() => {
    if (!accommodation.imagenes || accommodation.imagenes.length === 0) return 'https://placehold.co/600x360'
    // imagenes es un array de strings (URLs)
    const primeraImagen = accommodation.imagenes[0]
    if (typeof primeraImagen === 'string' && primeraImagen.length > 0) return primeraImagen
    return 'https://placehold.co/600x360'
  })()

  return (
    <article 
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.14)]"
      onClick={handleClick}
    >
      {/* Imagen */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#52655B]/10 to-[#52655B]/5 sm:h-44">
        <img
          src={img}
          alt={accommodation.nombre}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/65 via-[#2f3a35]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm sm:text-[11px]">
          {truncateWords(accommodation.ubicacion)}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-5 text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-base">
            {accommodation.nombre}
          </h3>
          <div className="shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2.5 py-1">
            <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        <P className="line-clamp-2 mb-4 text-left text-xs leading-5 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 sm:text-sm">
          {truncate(accommodation.descripcion ?? undefined, 120)}
        </P>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:flex-1 flex min-w-0 items-center justify-start gap-2 text-[11px] font-semibold text-gray-600 overflow-x-auto sm:overflow-visible sm:justify-start sm:text-sm sm:flex-wrap">
            <span className="flex-shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2 py-0.5 sm:px-3 sm:py-1 inline-flex items-center gap-1.5 text-[11px] sm:text-[13px]">
              <Bed className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#52655B]" />
              {accommodation.camas} Camas
            </span>
            <span className="flex-shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2 py-0.5 sm:px-3 sm:py-1 inline-flex items-center gap-1.5 text-[11px] sm:text-[13px]">
              <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#52655B]" />
              {accommodation.cuartos} Hab.
            </span>
            <span className="flex-shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2 py-0.5 sm:px-3 sm:py-1 inline-flex items-center gap-1.5 text-[11px] sm:text-[13px]">
              <span className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border border-[#52655B] text-[10px] leading-3 text-center text-[#52655B]">H</span>
              {accommodation.num_huespedes} Huespedes
            </span>
          </div>

          <div className="w-full sm:hidden flex justify-end">
            <Button
              variant="white"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[#52655B]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#52655B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
              onClick={(e: MouseEvent) => { e.stopPropagation(); handleClick(); }}
            >
              <Small>Ver hospedaje</Small>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Button>
          </div>

          <Button
            variant="white"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-full border border-[#52655B]/20 bg-white px-4 py-2.5 text-xs font-semibold text-[#52655B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
            onClick={(e: MouseEvent) => { e.stopPropagation(); handleClick(); }}
          >
            <Small>Ver hospedaje</Small>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

