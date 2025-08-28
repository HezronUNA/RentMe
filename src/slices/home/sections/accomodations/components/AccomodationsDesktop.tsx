// src/slices/accomodations/components/FeaturedDesktop.tsx
import { Button } from "@/shared/components/Button"
import { Link } from "@tanstack/react-router"
import useHorizontalCarousel from "@/shared/hooks/useCarrouselScroll"
import { Small } from "@/shared/components/Typography"

type Props = { hospedajes: any[] }

export default function AccomodationsDesktop({ hospedajes }: Props) {
  const { scrollerRef, bindHover } = useHorizontalCarousel({
    slideSelector: "[data-slide]",
    gapPx: 24,
    autoplayMs: 6000,
    pauseOnHover: true,
    loop: true,
  })

  return (
    <>
      <div className="relative w-full flex justify-center px-4">
        <div
          ref={scrollerRef}
          className="
            max-w-[1700px] w-full overflow-x-auto whitespace-nowrap snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          <div
            className="
              flex gap-10
              px-2 py-4
            "
          >
            {hospedajes.map((h) => {
              const img =
                (h.imagenes && h.imagenes[0]) ||
                (h.Imagenes && h.Imagenes[0]) ||
                "https://placehold.co/600x400"

              return (
                <div
                  key={h.id}
                  data-slide
                  className="
                    snap-center flex-shrink-0
                    w-[95%] sm:w-[47%] xl:w-[33%] max-w-[520px]
                    h-[360px] relative rounded-lg overflow-hidden
                    bg-black shadow-md group
                  "
                  {...bindHover}
                >
                  <img
                    src={img}
                    alt={h.nombre}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-6 left-6 text-white max-w-[90%] space-y-1">
                    <h3 className="text-lg font-medium font-body uppercase tracking-wide">
                      {h.ubicacion?.direccion}
                    </h3>
                    <p className="text-sm">
                      {h.camas} Camas, {h.baños} Baños, {h.cuartos} Habitaciones
                    </p>
                    <p className="text-base font-semibold">
                      {h.precioNoche?.toLocaleString?.("es-CR") ?? h.precioNoche}₡ por noche
                    </p>

                    <Button
                      variant="whiteBorder"
                      className="mt-2 px-4 py-1.5 text-xs hover:bg-gray-300 hover:cursor-pointer"
                    >
                      <Small>
                      Ver propiedad
                      </Small>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link to="/alojamientos">
          <Button variant="green" className="hover:cursor-pointer hover:bg-[#435349]">
            <Small>
            Ver más propiedades
            </Small>
          </Button>
        </Link>
      </div>
    </>
  )
}
