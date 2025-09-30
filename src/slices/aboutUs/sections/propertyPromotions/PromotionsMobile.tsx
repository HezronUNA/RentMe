import { useTitles } from "@/shared/hooks/useTitles";
import { OrbitAnimation } from "./orbitAnimation/OrbitAnimation";
import { platformsConfigMobile } from "./orbitAnimation/orbitConfigMobile";
import { H2 } from "@/shared/components/Typography";


export function PromotionsMobile() {
  const { items, loading, error } = useTitles("");

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-48 bg-gray-300 rounded w-full max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 text-sm">Error al cargar la información de promociones</p>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">No hay información de promociones disponible.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título optimizado para móvil */}
        <H2 className="text-center mb-4">
          {items[3]?.titulo}
        </H2>

        {/* Contenido principal con animación orbital para móvil */}
        <div className="max-w-sm mx-auto">
          <OrbitAnimation
            items={platformsConfigMobile}
            centerContent={
              items[3]?.imagen ? (
                <img 
                  src={items[3].imagen} 
                  alt="Costa Rica RentME" 
                  className="max-w-[160px] h-auto rounded-lg" // Cambiado de 120px a 160px
                />
              ) : (
                <div className="h-28 bg-gray-300 rounded w-[160px]"></div> // Cambiado de h-20 y w-120px a h-28 y w-160px
              )
            }
            className="mb-4"
            containerSize={300} // Aumentado ligeramente el contenedor de 280 a 300
          />
          
          {/* Descripción */}
          <div className="text-center">
            <p className="text-sm text-gray-600 leading-relaxed px-2">
              {items[3]?.descripcion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}