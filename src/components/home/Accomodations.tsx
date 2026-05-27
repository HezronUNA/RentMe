import AccomodationsDesktop from "@/components/home/AccomodationsDesktop"
import AccomodationsMobile from "@/components/home/AccomodationsMobile"
import { Skeleton } from "@/components/ui/Skeleton"
import { H2 } from "@/components/ui/Typography"
import useAccomodationHighlights from "@/hooks/useAccomodationHighlights"

export default function Accomodations() {
  const { hospedajes, loading } = useAccomodationHighlights()

  const isEmpty = !loading && !hospedajes.length

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center gap-8 py-10 px-4">
      {/* Blobs de fondo — siempre presentes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-7rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/45 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/52 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        {/* Header — siempre visible */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Nuestras Propiedades Destacadas
          </p>
          <H2 className="max-w-2xl mx-auto text-2xl md:text-4xl font-title">
            Alojamientos Destacados
          </H2>
          <p className="max-w-2xl mx-auto text-sm text-gray-600 md:text-base">
            Selección de hospedajes destacados para que encuentres tu próxima estadía con facilidad.
          </p>
        </div>

        {isEmpty && (
          <div className="py-10 text-center">Sin propiedades destacadas.</div>
        )}

        {/* Mobile — skeleton o contenido real, mismo contenedor siempre */}
        <div className="block md:hidden w-full" style={{ minHeight: '220px' }}>
          {loading ? (
            <div className="w-full overflow-x-auto">
              <div className="flex gap-4 snap-x snap-mandatory px-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="min-w-[280px] h-[220px] rounded-xl snap-center" />
                ))}
              </div>
            </div>
          ) : (
            <AccomodationsMobile hospedajes={hospedajes} />
          )}
        </div>

        {/* Desktop — skeleton o contenido real, mismo contenedor siempre */}
        <div className="hidden md:block w-full" style={{ minHeight: '220px' }}>
          {loading ? (
            <div className="grid grid-cols-3 gap-6 w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-[220px] rounded-xl" />
              ))}
            </div>
          ) : (
            <AccomodationsDesktop hospedajes={hospedajes} />
          )}
        </div>
      </div>
    </section>
  )
}
