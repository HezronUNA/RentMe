import { Button } from "@/components/ui/button"
import { P } from "@/components/ui/Typography"
import { Link, useNavigate } from "@tanstack/react-router"
import type { HospedajeDestacado } from "@/types/AccomodationsHighlights"

type HospedajeMobileCard = HospedajeDestacado & {
  imagenes?: Array<string | { url?: string }>
  Imagenes?: Array<string | { url?: string }>
  ubicacion?: HospedajeDestacado["ubicacion"] & {
    provincia?: string
  }
}

type Props = { hospedajes: HospedajeMobileCard[] }

export default function AccomodationsMobile({ hospedajes }: Props) {
  const navigate = useNavigate()
  
  const truncate = (text?: string, max = 80) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
  }

  const getImageUrl = (value?: string | { url?: string }) => {
    if (!value) return "https://placehold.co/600x360"
    if (typeof value === "string") return value
    return value.url || "https://placehold.co/600x360"
  }
  return (
    <>
      <div className="relative -mx-4 px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-6rem] top-[15%] h-44 w-44 rounded-full bg-[#e7eee9]/55 blur-3xl" />
          <div className="absolute right-[-5rem] bottom-[12%] h-40 w-40 rounded-full bg-[#f1e8dc]/60 blur-3xl" />
          <div className="absolute left-1/2 top-[8%] h-32 w-32 -translate-x-1/2 rounded-full bg-[#52655B]/10 blur-3xl" />
        </div>
        {/* Carrusel con scroll-snap */}
        <div
          className="
            w-full overflow-x-auto overflow-y-visible snap-x snap-mandatory
            scrollbar-hide
            flex gap-4
          "
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pan-y"
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { 
              display: none; 
            }
          `}</style>

          {/* Spacer inicial para centrar primera tarjeta */}
          <div className="shrink-0 w-4" aria-hidden="true" />
          
          {hospedajes.map((h) => {
            const img = getImageUrl((h.imagenes && h.imagenes[0]) || (h.Imagenes && h.Imagenes[0]))

            return (
              <article
                key={h.id}
                onClick={() => navigate({ to: `/alojamientos/${h.id}` })}
                className={`snap-center shrink-0 w-[82vw] max-w-sm group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 transform hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.14)] border border-zinc-200`}
              >
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#52655B]/10 to-[#52655B]/5 sm:h-40">
                  <img
                    src={img}
                    alt={h.nombre}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/65 via-[#2f3a35]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                    {h.ubicacion?.provincia || 'Alojamiento'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold leading-5 text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-base">
                      {h.nombre || h.ubicacion?.direccion}
                    </h3>
                    <div className="shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2.5 py-1 text-xs font-semibold text-[#52655B]">
                      {h.precioNoche ? `₡${h.precioNoche?.toLocaleString?.('es-CR') ?? h.precioNoche}` : ''}
                    </div>
                  </div>

                  <P className="mb-3 text-xs leading-5 text-gray-600 transition-colors duration-500 group-hover:text-gray-700">
                    {truncate(h.descripcion)}
                  </P>

                  <div className="flex flex-col gap-3">
                    {/* Amenidades */}
                    <div className="flex flex-wrap items-center justify-start gap-2 text-xs font-semibold text-gray-600">
                      <span className="rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-3 py-1">
                        {h.camas} Camas
                      </span>
                      <span className="rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-3 py-1">
                        {h.cuartos} Hab.
                      </span>
                      <span className="rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-3 py-1">
                        {h.baños} Baños
                      </span>
                    </div>

                    {/* Botón a la derecha */}
                    <div className="flex items-center justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate({ to: `/alojamientos/${h.id}` }) }}
                        className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#52655B]/20 bg-white px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
                      >
                        Reservar
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
          
          {/* Spacer final para centrar última tarjeta */}
          <div className="shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="green"
          className="group inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#435349] hover:shadow-[0_18px_32px_rgba(82,101,91,0.28)]"
        >
          <Link to="/alojamientos">Ver más propiedades</Link>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </div>
    </>
  )
}


