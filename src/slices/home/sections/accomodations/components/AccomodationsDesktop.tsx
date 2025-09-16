// src/slices/accomodations/components/FeaturedDesktop.tsx
import { Button } from "@/shared/components/Button"
import { Link } from "@tanstack/react-router"

type Props = { hospedajes: any[] }

export default function AccomodationsDesktop({ hospedajes }: Props) {
  return (
    <>
      <div className="relative w-full flex justify-center px-4">
        <div
          className="
            max-w-[1700px] w-full overflow-x-auto snap-x snap-mandatory
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          <div className="flex gap-12 w-max px-[9vw] py-6">
            {hospedajes.map((h) => {
              const img =
                (h.imagenes && h.imagenes[0]) ||
                (h.Imagenes && h.Imagenes[0]) ||
                "https://placehold.co/600x360"

              return (
                <article
                  key={h.id}
                  className="
                    snap-center shrink-0
                    w-[34vw] max-w-[420px] min-w-[340px]
                    bg-white rounded-xl overflow-hidden shadow-md
                    border border-zinc-200 bg-gray-50 hover:bg-white hover:shadow-lg transition-shadow duration-300
                  "
                >
                  {/* Imagen */}
                  <div className="relative h-56 group">
                    <img
                      src={img}
                      alt={h.nombre}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        className="hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Ver propiedad
                      </Button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="green">
          <Link to="/alojamientos">Ver más propiedades</Link>
        </Button>
      </div>
    </>
  )
}
