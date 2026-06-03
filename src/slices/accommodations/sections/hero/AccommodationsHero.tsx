
import { useState } from 'react';
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
  const [heroLoaded, setHeroLoaded] = useState(false);

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
    <section className="relative h-[70vh] min-h-[400px] md:h-[60vh] lg:h-[450px] flex items-center justify-center overflow-visible md:overflow-hidden bg-[#51665b]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#71877c_0%,#5a6f64_42%,#34473d_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
      <img
        src={heroData.imagen}
        alt="Alojamientos en Costa Rica"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        onLoad={() => setHeroLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
          heroLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-[1.02]'
        }`}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

      <div className="relative z-20 w-full px-4 pt-6 md:pt-8 overflow-visible">
        <div className="max-w-7xl mx-auto space-y-5 overflow-visible">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-white/60 rounded" />
              <span className="text-sm text-white/80 uppercase tracking-wide">Alojamientos</span>
              <div className="h-[1px] w-8 bg-white/60 rounded" />
            </div>
            <H1>
         NUESTROS ALOJAMIENTOS
            </H1>
          </div>

          {/* Mobile search box: kept inside hero for small screens */}
          <div className="relative z-30 lg:hidden mt-4 overflow-visible">
            <AccommodationSearchBox variant="mobile" onSearchFilters={handleSearchFilters} />
          </div>
        </div>
      </div>
    
    </section>
  );
}

