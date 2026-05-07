import { DestinationSection } from './DestinationSection';
import { PriceSection } from './PriceSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: any) => void;
}

export function SearchBox({ variant, onSearchFilters }: SearchBoxProps) {
  const [
    { price, precioMax, currency, ubicacion},
    { 
      handlePriceChange, 
      handlePriceBlur,
      handlePriceMaxChange,
      handlePriceMaxBlur,
      handleUbicacionChange,
      toggleCurrency, 
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
      <div className="w-full max-w-6xl bg-white rounded-full inline-flex items-stretch shadow-[0_8px_28px_rgba(0,0,0,0.12)] p-2 border border-zinc-200/80">
        <DestinationSection 
          variant="desktop" 
          ubicacion={ubicacion}
          onUbicacionChange={handleUbicacionChange}
        />
        <PriceSection
          variant="desktop"
          price={price}
          precioMax={precioMax}
          currency={currency}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
          onCurrencyToggle={toggleCurrency}
        />
        <SearchButton variant="desktop" onClick={handleSearchClick} />
      </div>
    );
  }

  // Versión Mobile
  return (
    <div className="w-[95%] max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-zinc-200/80 p-3 overflow-visible">
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-200/80">
        <div className="text-zinc-600 text-lg font-medium tracking-wide">
          Buscar Propiedades
        </div>
        <SearchButton variant="mobile" onClick={handleSearchClick} />
      </div>

      <DestinationSection 
        variant="mobile" 
        ubicacion={ubicacion}
        onUbicacionChange={handleUbicacionChange}
      />
      <PriceSection
        variant="mobile"
        price={price}
        precioMax={precioMax}
        currency={currency}
        onPriceChange={handlePriceChange}
        onPriceBlur={handlePriceBlur}
        onPriceMaxChange={handlePriceMaxChange}
        onPriceMaxBlur={handlePriceMaxBlur}
        onCurrencyToggle={toggleCurrency}
      />
    </div>
  );
}


