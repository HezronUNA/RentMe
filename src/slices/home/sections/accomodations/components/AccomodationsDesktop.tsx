// src/slices/accomodations/components/FeaturedDesktop.tsx
import { Button } from "@/shared/components/button"
import { Link } from "@tanstack/react-router"
import  useHorizontalCarousel  from "../../../../../shared/hooks/useCarrouselScroll"

type Props = { hospedajes: any[] }

export default function AccomodationsDesktop({ hospedajes }: Props) {
  const { scrollerRef, bindHover } = useHorizontalCarousel({
    slideSelector: "[data-slide]",
    gapPx: 0,          // sin espacio: 1 card por pantalla
    autoplayMs: 4000,  // cada 4s
    pauseOnHover: true,
    loop: true,
  })

  return (
    <>
      <div className="relative w-full flex justify-center">
        <div
          ref={scrollerRef}
          className="
            max-w-[1000px] w-full overflow-x-auto snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          {/* Track SIN gap */}
          <div className="flex items-stretch w-full mx-auto">
            {hospedajes.map((h) => {
              const img =
                (h.imagenes && h.imagenes[0]) ||
                (h.Imagenes && h.Imagenes[0]) ||
                "https://placehold.co/1100x650"

              return (
                <div
                  key={h.id}
                  data-slide
                  className="
                    snap-center flex-shrink-0
                    basis-full min-w-full       /* 1 card visible */
                    h-[56vw] md:h-[520px] lg:h-[600px]
                    relative rounded-lg overflow-hidden
                    bg-black shadow-md group
                  "
                   {...bindHover}
                >
                  <img
                    src={img}
                    alt={h.nombre}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-10 left-10 text-white max-w-[600px] space-y-2">
                    <h3 className="text-2xl md:text-4xl font-light uppercase tracking-widest">
                      {h.ubicacion?.direccion}
                    </h3>
                    <p className="text-lg">
                      {h.camas} Camas, {h.baños} Baños, {h.cuartos} Habitaciones
                    </p>
                    <p className="text-2xl font-medium tracking-wide">
                      {h.precioNoche?.toLocaleString?.("es-CR") ?? h.precioNoche}₡ por noche
                    </p>

                    <Button variant="whiteBorder" className="hover:cursor-pointer hover:bg-gray-300">
                      Ver propiedad
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="green" className="hover:cursor-pointer">
          <Link to="/alojamientos">Ver más propiedades</Link>
        </Button>
      </div>
    </>
  )
}
