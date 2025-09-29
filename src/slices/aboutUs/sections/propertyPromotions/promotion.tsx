import { useTitles } from "@/shared/hooks/useTitles";
import { OrbitAnimation, platformsConfig } from "./orbitAnimation";
import { PromotionsMobile } from "./PromotionsMobile";

export function Promotions() {
  const { items, loading, error } = useTitles("");

  if (loading) {
    return (
      <>
        {/* Desktop Loading */}
        <section className="hidden md:block py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="h-32 bg-gray-300 rounded w-full max-w-4xl mx-auto"></div>
            </div>
          </div>
        </section>
        
        {/* Mobile Loading */}
        <div className="block md:hidden">
          <PromotionsMobile />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Desktop Error */}
        <section className="hidden md:block py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-500">Error al cargar la información de promociones</p>
          </div>
        </section>
        
        {/* Mobile Error */}
        <div className="block md:hidden">
          <PromotionsMobile />
        </div>
      </>
    );
  }

  if (!items.length) {
    return (
      <>
        {/* Desktop No Data */}
        <section className="hidden md:block py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500">No hay información de promociones disponible.</p>
          </div>
        </section>
        
        {/* Mobile No Data */}
        <div className="block md:hidden">
          <PromotionsMobile />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden md:block py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mt-8 text-center text-2xl md:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800 mb-4">
            {items[3]?.titulo}
          </h2>

          <div className="max-w-4xl mx-auto">
            <OrbitAnimation
              items={platformsConfig}
              centerContent={
                items[3]?.imagen ? (
                  <img 
                    src={items[3].imagen} 
                    alt="Costa Rica RentME" 
                    className="mx-auto max-w-xs md:max-w-md h-auto"
                  />
                ) : (
                  <div className="h-32 bg-gray-300 rounded w-full max-w-xs"></div>
                )
              }
              className="mb-4"
              containerSize={500}
            />
            
            <div className="text-center max-w-2xl mx-auto mt-1">
              <p className="text-gray-600 leading-relaxed">
                {items[3]?.descripcion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <PromotionsMobile />
      </div>
    </>
  );
}