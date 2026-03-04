
import { AccommodationSearchBox } from './components/AccommodationSearchBox';
import type { AccommodationSearchFilters } from '../../hooks/useAccommodationSearch';
import type { FiltrosBusquedaHospedajes } from '../../hooks/useHospedajesConFiltros';

interface AccommodationsHeroProps {
  onApplyFilters?: (filters: FiltrosBusquedaHospedajes) => void;
}

export function AccommodationsHero({ onApplyFilters }: AccommodationsHeroProps) {
  // Contenido estático del hero
  const heroData = {
    imagen: 'https://i.ibb.co/C543ZBCF/Banner.jpg'
  };

  const handleSearchFilters = (filters: AccommodationSearchFilters) => {
    if (onApplyFilters) {
      // Convertir AccommodationSearchFilters a FiltrosBusquedaHospedajes (similar a ventas)
      const filtrosConvertidos: FiltrosBusquedaHospedajes = {}
      
      // Mapear destino -> canton (como en ventas)
      if (filters.destino && filters.destino.trim() !== '') {
        filtrosConvertidos.canton = filters.destino.trim()
      }
      
      // Mapear huéspedes -> camas (lógica: necesitas al menos tantas camas como huéspedes)
      if (filters.huespedes && filters.huespedes > 0) {
        filtrosConvertidos.camas = filters.huespedes
      }
      
      onApplyFilters(filtrosConvertidos);
    }
  };

  return (
    <section
      className="relative py-12 md:py-16 min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] flex items-start"
      style={{
        backgroundImage: heroData.imagen
          ? `url(${heroData.imagen})`
          : "linear-gradient(135deg, #3b5c50 0%, #94a593 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: heroData.imagen ? "overlay" : undefined,
      }}
    >
      {heroData.imagen && <div className="absolute inset-0 bg-black/60" />}

      <div className="relative z-10 w-full px-4 pt-6 md:pt-8 overflow-visible">
        <div className="max-w-4xl mx-auto space-y-5 overflow-visible">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide text-center">
             EXPLORÁ NUESTROS ALOJAMIENTOS
            </h1>
            <p className="text-base lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-light text-center">
                DMR Rentals Costa Rica ofrece casas, villas y hospedajes únicos en las zonas más destacadas del país.
              </p>
          </div>

          {/* Desktop Search Box */}
          <div className="hidden lg:flex justify-center mt-6">
            <AccommodationSearchBox variant="desktop" onSearchFilters={handleSearchFilters} />
          </div>

          {/* Mobile Search Box */}
          <div className="lg:hidden mt-4 overflow-visible">
            <AccommodationSearchBox variant="mobile" onSearchFilters={handleSearchFilters} />
          </div>
        </div>
      </div>
    
    </section>
  );
}

