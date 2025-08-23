// src/slices/accomodations/components/FeaturedDesktop.tsx
import { Button } from "@/shared/components/button"
import { Link } from "@tanstack/react-router"

type Props = { hospedajes: any[] }

export default function AccomodationsDesktop({ hospedajes }: Props) {
  return (
    <>
      <div className="relative w-full flex justify-center overflow-x-auto">
        <div className="flex gap-8 w-full max-w-[1200px] px-6 md:px-16 justify-center">
          {hospedajes.map((h) => {
            const img = (h.imagenes && h.imagenes[0]) || (h.Imagenes && h.Imagenes[0]) || "https://placehold.co/1100x650"
            return (
              <div
                key={h.id}
                className="relative w-full max-w-[1000px] h-[600px] flex-shrink-0 rounded-lg overflow-hidden bg-black shadow-md group"
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

                  <Button variant="whiteBorder" className="hover:cursor-pointer hover:bg-gray-300">Ver propiedad</Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="green" className="hover:cursor-pointer"><Link to="/alojamientos">Ver más propiedades</Link></Button>
      </div>
    </>
  )
}
