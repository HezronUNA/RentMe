// src/slices/accomodations/components/FeaturedAccommodations.tsx
import useGetAccomodationHighlights from "../../hooks/useAccomodationHighligths"
import AccomodationsDesktop from "./components/AccomodationsDesktop"
import AccomodationsMobile from "./components/AccomodationsMobile"

export default function Accomodations() {
  const { hospedajes, loading } = useGetAccomodationHighlights()

  if (loading) return <div className="py-10 text-center">Cargando...</div>
  if (!hospedajes.length) return <div className="py-10 text-center">Sin propiedades destacadas.</div>

  return (
    <section className="w-full flex flex-col items-center gap-8 py-10 px-4">
      <h2 className="text-center text-2xl md:text-4xl font-regular uppercase tracking-widest">
        Alojamientos Disponibles
      </h2>

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
