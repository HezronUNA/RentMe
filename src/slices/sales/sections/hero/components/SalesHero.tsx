
import { SearchBox } from "./SearchBox";
import type { FiltrosBusqueda } from "../../../hooks/usePropiedadesConFiltros";
import { H1 } from "@/components/ui/Typography";

interface SalesHeroProps {
  onApplyFilters?: (filters: FiltrosBusqueda) => void;
}

export function SalesHero({ onApplyFilters }: SalesHeroProps) {
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
            <H1>
              {heroData.titulo}
            </H1>
          </div>

          {/* Desktop Search Box */}
          <div className="hidden lg:flex justify-center mt-6">
            <SearchBox variant="desktop" onSearchFilters={handleSearchFilters} />
          </div>

          {/* Mobile Search Box */}
          <div className="lg:hidden mt-4 overflow-visible">
            <SearchBox variant="mobile" onSearchFilters={handleSearchFilters} />
          </div>
        </div>
      </div>
    </section>
  );
}


