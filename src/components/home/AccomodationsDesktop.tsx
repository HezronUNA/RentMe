import { Link, useNavigate } from "@tanstack/react-router"
import useEmblaCarousel from 'embla-carousel-react';
import Autoscroll from 'embla-carousel-auto-scroll';
import { Button } from "@/components/ui/button";
import { Small, P } from "@/components/ui/Typography";
import { useRef } from "react";

type HospedajeCard = {
  id: string | number;
  nombre?: string;
  descripcion?: string;
  descripcion_corta?: string;
  descripcion_larga?: string;
  precioNoche?: number;
  camas?: number;
  cuartos?: number;
  baños?: number;
  ubicacion?: {
    provincia?: string;
    direccion?: string;
  };
  imagenes?: Array<string | { url?: string }>;
  Imagenes?: Array<string | { url?: string }>;
};

type Props = { hospedajes: HospedajeCard[] };

export default function AccomodationsDesktop({ hospedajes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const truncate = (text?: string, max = 120) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
  }

  const getImageUrl = (value?: string | { url?: string }) => {
    if (!value) return "https://placehold.co/600x360";
    if (typeof value === "string") return value;
    return value.url || "https://placehold.co/600x360";
  }

  return (
    <>
      <div className="relative w-full flex justify-center px-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-7rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/45 blur-3xl" />
          <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/52 blur-3xl" />
        </div>
        <div className="embla max-w-[1700px] w-full" ref={emblaRef}>
          <div ref={containerRef} className="embla__container flex gap-10 px-2 py-6">
            {duplicatedHospedajes.map((h, index) => {
              const img = getImageUrl(h.imagenes?.[0] || h.Imagenes?.[0]);

              return (
                <div
                  key={`${h.id}-${index}`}
                  className="embla__slide flex-[0_0_auto] w-[34vw] max-w-[420px] min-w-[340px]"
                >
                  <article
                    onClick={() => navigate({ to: `/alojamientos/${h.id}` })}
                    className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 transform hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.14)] border border-zinc-200 h-full"
                  >
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#52655B]/10 to-[#52655B]/5 sm:h-40">
                      <img
                        src={img}
                        alt={h.nombre || h.ubicacion?.direccion || "Alojamiento"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/65 via-[#2f3a35]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                        {h.ubicacion?.provincia || 'Alojamiento'}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold leading-5 text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-base">
                          {h.ubicacion?.direccion || h.nombre || "Alojamiento"}
                        </h3>
                        <div className="shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2.5 py-1 text-xs font-semibold text-[#52655B]">
                          {h.precioNoche ? `₡${h.precioNoche?.toLocaleString?.('es-CR') ?? h.precioNoche}` : ''}
                        </div>
                      </div>

                      <P className="mx-auto mb-5 max-w-[92%] text-center text-xs leading-5 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 sm:text-left">
                        {truncate(h.descripcion || h.descripcion_corta || h.descripcion_larga)}
                      </P>

                      <div className="mt-7 flex items-center justify-between gap-3">
                        <div className="flex flex-1 items-center justify-center gap-3 text-xs font-semibold text-gray-600 sm:justify-start">
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

                        <Button
                          variant="white"
                          className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#52655B]/20 bg-white px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
                          onClick={(e) => { e.stopPropagation(); navigate({ to: `/alojamientos/${h.id}` }) }}
                        >
                          <Small>Reservar</Small>
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
          <Button
            variant="green"
            className="group inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#435349] hover:shadow-[0_18px_32px_rgba(82,101,91,0.28)]"
          >
            <Small>Ver más propiedades</Small>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </Link>
      </div>
    </>
  );
}

