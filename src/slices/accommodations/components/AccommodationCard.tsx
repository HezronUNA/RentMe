import { Button } from "@/shared/components/button"
import { Small } from "@/shared/components/Typography"
import type { Hospedaje } from "../type"
import { useNavigate } from "@tanstack/react-router"

interface AccommodationCardProps {
  accommodation: Hospedaje
  onAccommodationClick?: (id: string) => void
}

export function AccommodationCard({ accommodation, onAccommodationClick }: AccommodationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const navigate = useNavigate()

  const handleClick = () => {
    if (onAccommodationClick) {
      onAccommodationClick(accommodation.id)
    } else {
      navigate({ to: `/hospedajes/${accommodation.id}` })
    }
  }

  const img = accommodation.imagenes && accommodation.imagenes.length > 0 
    ? accommodation.imagenes[0] 
    : "https://placehold.co/600x360"

  return (
    <article 
      className="
        rounded-xl overflow-hidden shadow-md
        border border-zinc-200 bg-gray-50 hover:bg-white hover:shadow-lg 
        transition-all duration-300 hover:scale-[1.02]
        h-full cursor-pointer group
      "
      onClick={handleClick}
    >
      {/* Imagen */}
      <div className="relative h-56 group overflow-hidden">
        <img
          src={img}
          alt={accommodation.nombre}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/600x360'
          }}
        />
        
        {/* Badge de destacado */}
        {accommodation.destacado && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
              Destacado
            </div>
          </div>
        )}
        
        {/* Contador de imágenes */}
        {accommodation.imagenes && accommodation.imagenes.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
            +{accommodation.imagenes.length - 1} fotos
          </div>
        )}
        
        {/* Overlay sutil para mejor contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        {/* Nombre del hospedaje */}
        <h3 className="text-center text-base font-semibold uppercase tracking-widest text-zinc-900 group-hover:text-zinc-700 transition-colors duration-200 line-clamp-1">
          {accommodation.nombre}
        </h3>
        
        {/* Ubicación */}
        <p className="text-sm text-zinc-600 text-center">
          {accommodation.ubicacion.direccion}
        </p>
        
        {/* Características */}
        <p className="text-sm text-zinc-600 text-center">
          {accommodation.cuartos} Cuartos, {accommodation.camas} Camas, {accommodation.baños} Baños
        </p>
        
        {/* Servicios destacados */}
        {accommodation.servicios && accommodation.servicios.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-1 justify-center">
              {accommodation.servicios.slice(0, 2).map((servicio, index) => (
                <span key={index} className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  {servicio}
                </span>
              ))}
              {accommodation.servicios.length > 2 && (
                <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  +{accommodation.servicios.length - 2} más
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Precio por noche */}
        <p className="text-center text-lg font-medium text-zinc-900">
          ₡{formatPrice(accommodation.precioNoche)}
          <span className="text-sm text-zinc-500 font-normal"> /noche</span>
        </p>
        
        {/* Botón */}
        <div className="pt-2 flex justify-center">
          <Button 
            variant="white" 
            className="hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200"
            onClick={handleClick}
          >
            <Small>Ver hospedaje</Small>
          </Button>
        </div>
      </div>
    </article>
  )
}