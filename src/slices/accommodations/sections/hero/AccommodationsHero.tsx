
import { H1 } from '@/components/ui/Typography';
import { AccommodationSearchBox, type AccommodationSearchFilters } from './components/AccommodationSearchBox';
import type { FiltrosBusquedaHospedajes } from '../../hooks/useHospedajesConFiltros';

interface AccommodationsHeroProps {
  onApplyFilters?: (filters: FiltrosBusquedaHospedajes) => void;
}

export function AccommodationsHero({ onApplyFilters }: AccommodationsHeroProps) {
  // Contenido estático del hero
  const heroData = {
    imagen: 'https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779663842/dji_fly_20240603_141814_222_1779297601679_photo_optimized_1_dvzyip.avif'
  };

  const handleSearchFilters = (filters: AccommodationSearchFilters) => {
    if (!onApplyFilters) return;

    const filtrosConvertidos: FiltrosBusquedaHospedajes = {};
    if (filters.destino && filters.destino.trim() !== '') {
      filtrosConvertidos.canton = filters.destino.trim();
    }
    if (filters.huespedes && filters.huespedes > 0) {
      filtrosConvertidos.huespedes = filters.huespedes;
    }

    onApplyFilters(filtrosConvertidos);
  };

  return (
    <section className="relative h-[70vh] min-h-[400px] md:h-[60vh] lg:h-[450px] flex items-center justify-center overflow-hidden">
      <img
        src={heroData.imagen}
        alt="Alojamientos en Costa Rica"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full px-4 pt-6 md:pt-8 overflow-visible">
        <div className="max-w-7xl mx-auto space-y-5 overflow-visible">
          <div className="space-y-2">
            <H1>
             EXPLORÁ NUESTROS ALOJAMIENTOS
            </H1>
          </div>

          {/* Mobile search box: kept inside hero for small screens */}
          <div className="lg:hidden mt-4">
            <AccommodationSearchBox variant="mobile" onSearchFilters={handleSearchFilters} />
          </div>
        </div>
      </div>
    
    </section>
  );
}

