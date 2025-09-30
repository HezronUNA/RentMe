import { Button } from "@/shared/components/button"
import { Small } from "@/shared/components/Typography"
import type { PropiedadVenta } from "../type"
import { useNavigate } from "@tanstack/react-router"

interface PropertyCardProps {
  property: PropiedadVenta
  onPropertyClick?: (id: string) => void
}

export function PropertyCard({ property, onPropertyClick }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-500'
      case 'Reservada':
        return 'bg-yellow-500'
      case 'Vendida':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const navigate = useNavigate()

  const handleClick = () => {
    if (onPropertyClick) {
      onPropertyClick(property.id)
    } else {
      navigate({ to: `/ventas/${property.id}` })
    }
  }

  const img = property.imagenes && property.imagenes.length > 0 
    ? property.imagenes[0] 
    : "https://placehold.co/600x360"

  return (
    <article 
      className="
        bg-white rounded-xl overflow-hidden shadow-md
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
          alt={`Propiedad en ${property.ubicacion.canton}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/600x360'
          }}
        />
        
        {/* Badge de estado */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getEstadoBadgeColor(property.estado)}`}>
            {property.estado}
          </div>
        </div>
        
        {/* Contador de imágenes */}
        {property.imagenes && property.imagenes.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
            +{property.imagenes.length - 1} fotos
          </div>
        )}
        
        {/* Overlay sutil para mejor contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        {/* Ubicación */}
        <h3 className="text-center text-base font-semibold uppercase tracking-widest text-zinc-900 group-hover:text-zinc-700 transition-colors duration-200">
          {property.ubicacion.distrito}, {property.ubicacion.canton}
        </h3>
        
        {/* Características */}
        <p className="text-sm text-zinc-600 text-center">
          {property.habitaciones} Habitaciones, {property.baños} Baños, {property.areaTerreno}m²
        </p>
        
        {/* Amenidades destacadas */}
        {property.amenidades && property.amenidades.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-1 justify-center">
              {property.amenidades.slice(0, 2).map((amenidad, index) => (
                <span key={index} className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  {amenidad}
                </span>
              ))}
              {property.amenidades.length > 2 && (
                <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                  +{property.amenidades.length - 2} más
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Precio */}
        <p className="text-center text-lg font-medium text-zinc-900">
          ₡{formatPrice(property.precio)}
        </p>
        
        {/* Botón */}
        <div className="pt-2 flex justify-center">
          <Button 
            variant="white" 
            className="hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200"
            onClick={handleClick}
          >
            <Small>Ver propiedad</Small>
          </Button>
        </div>
      </div>
    </article>
  )
}