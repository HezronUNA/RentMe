
import { SearchBox } from "./SearchBox";
import type { FiltrosBusqueda } from "../../../hooks/usePropiedadesConFiltros";
import { H1 } from "@/components/ui/Typography";

interface SalesHeroProps {
  onApplyFilters?: (filters: FiltrosBusqueda) => void;
  showDesktopSearch?: boolean;
}

export function SalesHero({ onApplyFilters, showDesktopSearch = true }: SalesHeroProps) {
  // Contenido estático del hero
  const heroData = {
    titulo: 'ENCONTRÁ TU PRÓXIMA INVERSIÓN EN COSTA RICA',
    imagen: 'https://i.ibb.co/1fh0YydY/francesca-tosolini-t-Hk-JAMc-O3-QE-unsplash-1.jpg'
  };

  const handleSearchFilters = (filters: FiltrosBusqueda) => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  return (
    <section className="relative h-[70vh] min-h-[400px] md:h-[60vh] lg:h-[450px] flex items-center justify-center overflow-hidden">
      <img
        src={heroData.imagen}
        alt="Propiedades en venta en Costa Rica"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full px-4 pt-6 md:pt-8 overflow-visible">
        <div className="max-w-7xl mx-auto space-y-5 overflow-visible">
          <div className="space-y-2">
            <H1>
              {heroData.titulo}
            </H1>
          </div>

          {/* Desktop Search Box */}
          {showDesktopSearch && (
            <div className="hidden lg:flex justify-center mt-6">
              <SearchBox variant="desktop" onSearchFilters={handleSearchFilters} />
            </div>
          )}

          {/* Mobile Search Box */}
          <div className="lg:hidden mt-4 overflow-visible">
            <SearchBox variant="mobile" onSearchFilters={handleSearchFilters} />
          </div>
        </div>
      </div>
    </section>
  );
}


