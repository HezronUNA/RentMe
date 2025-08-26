// src/slices/accomodations/components/FeaturedDesktop.tsx
import { Button } from "@/shared/components/Button"
import { Link } from "@tanstack/react-router"
import useHorizontalCarousel from "@/shared/hooks/useCarrouselScroll"

type Props = { hospedajes: any[] }

export default function AccomodationsDesktop({ hospedajes }: Props) {
  const { scrollerRef, bindHover } = useHorizontalCarousel({
    slideSelector: "[data-slide]",
    gapPx: 24,           // espacio entre los 2 cards
    autoplayMs: 4000,    // scroll automático
    pauseOnHover: true,  // pausa al hacer hover
    loop: true,          // que se repita en bucle
  })

  return (
    <>
      <div className="relative w-full flex justify-center">
        <div
          ref={scrollerRef}
          className="
            max-w-[1100px] w-full overflow-x-auto snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          <div className="flex items-stretch mx-auto w-max gap-8 px-2">
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
                    basis-[520px] min-w-[520px]
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

                  <div className="absolute bottom-6 left-6 text-white max-w-[460px] space-y-1">
                    <h3 className="text-xl font-medium font-body uppercase tracking-wide">
                      {h.ubicacion?.direccion}
                    </h3>
                    <p className="text-base">
                      {h.camas} Camas, {h.baños} Baños, {h.cuartos} Habitaciones
                    </p>
                    <p className="text-lg font-semibold">
                      {h.precioNoche?.toLocaleString?.("es-CR") ?? h.precioNoche}₡ por noche
                    </p>

                    <Button
                      variant="whiteBorder"
                      className="mt-2 px-4 py-1.5 text-sm hover:bg-gray-300 hover:cursor-pointer"
                    >
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
        <Link to="/alojamientos">
          <Button variant="green" className="hover:cursor-pointer">
            Ver más propiedades
          </Button>
        </Link>
      </div>
    </>
  )
}
