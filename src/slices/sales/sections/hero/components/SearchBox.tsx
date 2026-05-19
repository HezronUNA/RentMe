import { DestinationSection } from './DestinationSection';
import { PriceSection } from './PriceSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';
import type { FiltrosBusqueda } from '../../../hooks/usePropiedadesConFiltros';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: FiltrosBusqueda) => void;
}

export function SearchBox({ variant, onSearchFilters }: SearchBoxProps) {
  const [
    { price, precioMax, ubicacion},
    { 
      handlePriceChange, 
      handlePriceBlur,
      handlePriceMaxChange,
      handlePriceMaxBlur,
      handleUbicacionChange,
      getFiltrosActuales
    }
  ] = useSearchBox();

  const handleSearchClick = () => {
    const filtros = getFiltrosActuales();
    
    // Llamar la función de callback si existe
    if (onSearchFilters) {
      onSearchFilters(filtros);
    }
    
  };

  if (variant === 'desktop') {
    return (
      <div className="w-full max-w-5xl bg-white rounded-full inline-flex items-stretch shadow-[0_6px_20px_rgba(0,0,0,0.1)] p-1.5 border border-zinc-200/80">
        <DestinationSection 
          variant="desktop" 
          ubicacion={ubicacion}
          onUbicacionChange={handleUbicacionChange}
        />
        <PriceSection
          variant="desktop"
          price={price}
          precioMax={precioMax}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
        />
        <SearchButton variant="desktop" onClick={handleSearchClick} />
      </div>
    );
  }

  // Versión Mobile — tarjeta tipo Airbnb: filas apiladas + CTA ancho completo
  return (
    <div className="w-full max-w-lg mx-auto overflow-visible">
      <div className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)] divide-y divide-neutral-100">
        <DestinationSection
          variant="mobile"
          ubicacion={ubicacion}
          onUbicacionChange={handleUbicacionChange}
        />
        <PriceSection
          variant="mobile"
          price={price}
          precioMax={precioMax}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
        />
        <div className="p-3.5">
          <SearchButton variant="mobile" onClick={handleSearchClick} />
        </div>
      </div>
    </div>
  );
}


