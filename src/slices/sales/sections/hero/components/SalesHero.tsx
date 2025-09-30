import { useHero } from "@/shared/hooks/useHero";
import { SearchBox } from "./SearchBox";
import type { FiltrosBusqueda } from "../../../hooks/usePropiedadesConFiltros";
import { H1 } from "@/shared/components/Typography";

interface SalesHeroProps {
  onApplyFilters?: (filters: FiltrosBusqueda) => void;
}

export function SalesHero({ onApplyFilters }: SalesHeroProps) {
  const { items, loading, error } = useHero("sales");

  const handleSearchFilters = (filters: FiltrosBusqueda) => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  if (loading) {
    return (
      <div className="relative py-16 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center bg-teal-600">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 sm:h-10 md:h-12 bg-white/20 rounded-lg w-4/5 mx-auto" />
            <div className="h-4 sm:h-5 md:h-6 bg-white/20 rounded-lg w-3/5 mx-auto" />
            <div className="h-[120px] sm:h-[100px] md:h-20 bg-white/20 rounded-lg max-w-[900px] w-[95%] mx-auto mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative py-20 min-h-[50vh] flex items-center bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <div className="text-white space-y-4">
            <h2 className="text-2xl font-bold">Error al cargar el contenido</h2>
            <p className="text-teal-100">No se pudo cargar la información del hero.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="relative py-20 min-h-[50vh] flex items-center bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <p className="text-white text-lg">No hay contenido disponible.</p>
        </div>
      </div>
    );
  }

  // ✅ Buscar por id "6" (string). Si no aparece, usar el primero.
  const heroData = items.find((x) => x.id === "6") ?? items[0];

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
