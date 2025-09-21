import { DestinationSection } from './DestinationSection';
import { BedroomsSection } from './BedroomsSection';
import { BathroomsSection } from './BathroomsSection';
import { PriceSection } from './PriceSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: any) => void;
}

export function SearchBox({ variant, onSearchFilters }: SearchBoxProps) {
  const [
    { price, precioMax, currency, ubicacion, habitaciones, baños },
    { 
      decreaseHabitaciones,
      increaseHabitaciones,
      decreaseBaños,
      increaseBaños,
      handlePriceChange, 
      handlePriceBlur,
      handlePriceMaxChange,
      handlePriceMaxBlur,
      handleUbicacionChange,
      toggleCurrency, 
      handleSearch,
      getFiltrosActuales
    }
  ] = useSearchBox();

  const handleSearchClick = () => {
    const filtros = getFiltrosActuales();
    console.log('Filtros aplicados:', filtros);
    
    // Llamar la función de callback si existe
    if (onSearchFilters) {
      onSearchFilters(filtros);
    }
    
    handleSearch();
  };

  if (variant === 'desktop') {
    return (
      <div className="w-[1400px] bg-neutral-50 rounded-lg inline-flex items-stretch shadow-lg p-2">
        <DestinationSection 
          variant="desktop" 
          ubicacion={ubicacion}
          onUbicacionChange={handleUbicacionChange}
        />
        <BedroomsSection
          variant="desktop"
          habitaciones={habitaciones}
          onDecrease={decreaseHabitaciones}
          onIncrease={increaseHabitaciones}
        />
        <BathroomsSection
          variant="desktop"
          baños={baños}
          onDecrease={decreaseBaños}
          onIncrease={increaseBaños}
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
    <div className="w-[95%] max-w-2xl mx-auto bg-neutral-50 rounded-lg shadow-lg p-2">
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 mx-2">
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
      <BedroomsSection
        variant="mobile"
        habitaciones={habitaciones}
        onDecrease={decreaseHabitaciones}
        onIncrease={increaseHabitaciones}
      />
      <BathroomsSection
        variant="mobile"
        baños={baños}
        onDecrease={decreaseBaños}
        onIncrease={increaseBaños}
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
