
import { Skeleton } from "@/shared/components/Skeleton"
import useGetAccomodationHighlights from "../../hooks/useAccomodationHighligths"
import AccomodationsDesktop from "./components/AccomodationsDesktop"
import AccomodationsMobile from "./components/AccomodationsMobile"
import { H2 } from "@/shared/components/Typography"

export default function Accomodations() {
  const { hospedajes, loading } = useGetAccomodationHighlights()

  if (loading) {
    return (
      <section className="w-full flex flex-col items-center gap-8 py-10 px-4">
        <H2 className="text-center text-2xl md:text-4xl font-title uppercase">
          Alojamientos Disponibles
        </H2>

        {/* Mobile Skeleton */}
        <div className="block md:hidden w-full overflow-x-auto">
          <div className="flex gap-4 snap-x snap-mandatory px-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="min-w-[280px] h-[220px] rounded-xl snap-center"
              />
            ))}
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-[220px] rounded-xl"
            />
          ))}
        </div>
      </section>
    )
  }

  if (!hospedajes.length)
    return <div className="py-10 text-center">Sin propiedades destacadas.</div>

  return (
    <section className="w-full flex flex-col items-center gap-8 py-10 px-4">
      <H2 className="text-center text-2xl md:text-4xl font-title uppercase">
        Alojamientos Disponibles
      </H2>

      {/* Mobile */}
      <div className="block md:hidden w-full">
        <AccomodationsMobile hospedajes={hospedajes} />
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full">
        <AccomodationsDesktop hospedajes={hospedajes} />
      </div>
    </section>
  )
}
