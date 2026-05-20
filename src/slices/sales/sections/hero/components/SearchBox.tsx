import { DestinationSection } from './DestinationSection';
import { PriceSection } from './PriceSection';
import { BedroomsSection } from './BedroomsSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';
import type { FiltrosBusqueda } from '../../../hooks/usePropiedadesConFiltros';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: FiltrosBusqueda) => void;
}

export function SearchBox({ variant, onSearchFilters }: SearchBoxProps) {
  const [
    { price, precioMax, ubicacion, habitaciones },
    { 
      handlePriceChange, 
      handlePriceBlur,
      handlePriceMaxChange,
      handlePriceMaxBlur,
      handleUbicacionChange,
      handleHabitacionesChange,
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
      <div className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex w-full items-stretch justify-between">
            <div className="flex shrink-0 items-stretch gap-4">
              <div className="w-[360px] shrink-0">
                <DestinationSection
                  variant="desktop"
                  ubicacion={ubicacion}
                  onUbicacionChange={handleUbicacionChange}
                />
              </div>
              <BedroomsSection
                variant="desktop"
                habitaciones={habitaciones}
                onHabitacionesChange={handleHabitacionesChange}
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
            </div>

            <SearchButton variant="desktop" onClick={handleSearchClick} />
          </div>
        </div>
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


