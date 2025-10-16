import { AccommodationDestination } from './AccommodationDestination';
import { AccommodationDates } from './AccommodationDates';
import { AccommodationGuests } from './AccommodationGuests';
import { AccommodationSearchButton } from './AccommodationSearchButton';
import { useAccommodationSearch, type AccommodationSearchFilters } from '../../../hooks/useAccommodationSearch';

interface AccommodationSearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: AccommodationSearchFilters) => void;
}

export function AccommodationSearchBox({ variant, onSearchFilters }: AccommodationSearchBoxProps) {
  const [
    { destino, entrada, salida, huespedes },
    { 
      handleDestinoChange,
      handleEntradaChange,
      handleSalidaChange,
      increaseHuespedes,
      decreaseHuespedes,
      getFiltrosActuales
    }
  ] = useAccommodationSearch();

  const handleSearchClick = () => {
    const filtros = getFiltrosActuales();
    
    // Llamar la función de callback si existe
    if (onSearchFilters) {
      onSearchFilters(filtros);
    }
    
    console.log('Filtros de búsqueda:', filtros);
  };

  if (variant === 'desktop') {
    return (
      <div className="w-[1600px] bg-neutral-50 rounded-lg inline-flex items-stretch shadow-lg p-2">
        <AccommodationDestination 
          variant="desktop" 
          destino={destino}
          onDestinoChange={handleDestinoChange}
        />
        <AccommodationDates
          variant="desktop"
          entrada={entrada}
          salida={salida}
          onEntradaChange={handleEntradaChange}
          onSalidaChange={handleSalidaChange}
        />
        <AccommodationGuests
          variant="desktop"
          huespedes={huespedes}
          onDecrease={decreaseHuespedes}
          onIncrease={increaseHuespedes}
        />
        <AccommodationSearchButton variant="desktop" onClick={handleSearchClick} />
      </div>
    );
  }

  // Versión Mobile
  return (
    <div className="w-[95%] max-w-2xl mx-auto bg-neutral-50 rounded-lg shadow-lg p-2 overflow-visible">
      <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 mx-2">
        <div className="text-zinc-600 text-lg font-medium tracking-wide">
          Buscar Alojamientos
        </div>
        <AccommodationSearchButton variant="mobile" onClick={handleSearchClick} />
      </div>

      <AccommodationDestination 
        variant="mobile" 
        destino={destino}
        onDestinoChange={handleDestinoChange}
      />
      <AccommodationDates
        variant="mobile"
        entrada={entrada}
        salida={salida}
        onEntradaChange={handleEntradaChange}
        onSalidaChange={handleSalidaChange}
      />
      <AccommodationGuests
        variant="mobile"
        huespedes={huespedes}
        onDecrease={decreaseHuespedes}
        onIncrease={increaseHuespedes}
      />
    </div>
  );
}