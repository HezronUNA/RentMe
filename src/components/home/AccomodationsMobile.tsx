import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "@tanstack/react-router"

type Props = { hospedajes: any[] }

export default function AccomodationsMobile({ hospedajes }: Props) {
  const navigate = useNavigate()
  return (
    <>
      <div className="relative -mx-4 px-4">
        {/* Carrusel con scroll-snap */}
        <div
          className="
            w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory
            scrollbar-hide
            flex gap-4 
            touch-pan-x
          "
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
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
            const img =
              (h.imagenes && h.imagenes[0]) ||
              (h.Imagenes && h.Imagenes[0]) ||
              "https://placehold.co/600x360"

            return (
              <article
                key={h.id}
                onClick={() => navigate({ to: `/alojamientos/${h.id}` })}
                className="
                  snap-center shrink-0
                  w-[82vw] max-w-sm
                  bg-white rounded-xl overflow-hidden shadow-md
                  border border-zinc-200
                "
              >
                {/* Imagen */}
                <div className="relative h-48">
                  <img
                    src={img}
                    alt={h.nombre}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-center text-base font-semibold uppercase tracking-widest text-zinc-900">
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
                      onClick={(e) => { e.stopPropagation(); navigate({ to: `/alojamientos/${h.id}` }) }}
                    >
                      Ver propiedad
                    </Button>
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
        <Button variant="green">
          <Link to="/alojamientos">Ver más propiedades</Link>
        </Button>
      </div>
    </>
  )
}


