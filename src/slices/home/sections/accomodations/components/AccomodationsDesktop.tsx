// src/slices/home/sections/accomodations/components/AccomodationsDesktop.tsx
import { Button } from "../../../../../shared/components/Button"
import { Link, useNavigate } from "@tanstack/react-router"
import { Small } from "@/shared/components/Typography"
import useEmblaCarousel from 'embla-carousel-react';
import Autoscroll from 'embla-carousel-auto-scroll';

type Props = { hospedajes: any[] };

export default function AccomodationsDesktop({ hospedajes }: Props) {
  // Configuración de Embla Carousel con auto-scroll
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: true,
    },
    [
      Autoscroll({
        speed: 0.8, // Velocidad del scroll
        startDelay: 1500,
        // No detener nunca el scroll, ni en hover ni en interacción
      })
    ]
  );

  // Duplicar hospedajes para mejor efecto infinito visual
  const duplicatedHospedajes = [...hospedajes, ...hospedajes];
  const navigate = useNavigate()

  return (
    <>
      <div className="relative w-full flex justify-center px-4">
        <div className="embla max-w-[1700px] w-full" ref={emblaRef}>
          <div className="embla__container flex gap-10 px-2 py-6">
            {duplicatedHospedajes.map((h, index) => {
              const img =
                (h.imagenes && h.imagenes[0]) ||
                (h.Imagenes && h.Imagenes[0]) ||
                "https://placehold.co/600x360";

              return (
                <div
                  key={`${h.id}-${index}`}
                  className="embla__slide flex-[0_0_auto] w-[34vw] max-w-[420px] min-w-[340px]"
                >
                  <article
                    onClick={() => navigate({ to: `/alojamientos/${h.id}` })}
                    className="
                    bg-white rounded-xl overflow-hidden shadow-md
                    border border-zinc-200 bg-gray-50 hover:bg-white hover:shadow-lg 
                    transition-all duration-300 hover:scale-[1.02]
                    h-full cursor-pointer
                  ">
                    {/* Imagen */}
                    <div className="relative h-56 group overflow-hidden">
                      <img
                        src={img}
                        alt={h.nombre}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Indicador de auto-scroll - se desvanece al hacer hover */}
                      <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" />
                      </div>
                      {/* Overlay sutil para mejor contraste del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {/* Info */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-center text-base font-semibold uppercase tracking-widest text-zinc-900 group-hover:text-zinc-700 transition-colors duration-200">
                        {h.ubicacion?.direccion}
                      </h3>
                      <p className="text-sm text-zinc-600 text-center">
                        {h.camas} Camas, {h.baños} Baños, {h.cuartos} Habitaciones
                      </p>
                      <p className="text-center text-lg font-medium text-zinc-900">
                        {h.precioNoche?.toLocaleString?.("es-CR") ?? h.precioNoche}₡ por noche
                      </p>
                      <div className="pt-2 flex justify-center">
                        <Button
                          variant="white"
                          className="hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200"
                          onClick={(e) => { e.stopPropagation(); navigate({ to: `/alojamientos/${h.id}` }) }}
                        >
                          <Small>Ver propiedad</Small>
                        </Button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Link to="/alojamientos">
          <Button variant="green" className="hover:cursor-pointer hover:bg-[#435349] transition-colors duration-300">
            <Small>Ver más propiedades</Small>
          </Button>
        </Link>
      </div>
    </>
  );
}