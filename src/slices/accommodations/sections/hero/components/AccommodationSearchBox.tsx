import { useState } from 'react';
import { AccommodationDestination } from './AccommodationDestination';
import { AccommodationGuests } from './AccommodationRooms';
import { AccommodationSearchButton } from './AccommodationSearchButton';

export interface AccommodationSearchFilters {
  destino: string;
  cuartos: number;
}

interface AccommodationSearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: AccommodationSearchFilters) => void;
}

export function AccommodationSearchBox({ variant, onSearchFilters }: AccommodationSearchBoxProps) {
  const [destino, setDestino] = useState('');
  const [cuartos, setCuartos] = useState(0);

  const handleSearchClick = () => {
    const filtros: AccommodationSearchFilters = {
      destino,
      cuartos,
    };
    
    if (onSearchFilters) {
      onSearchFilters(filtros);
    }
  };

  const increaseHuespedes = () => {
    setCuartos((prev) => prev + 1);
  };

  const decreaseHuespedes = () => {
    setCuartos((prev) => Math.max(0, prev - 1));
  };

  if (variant === 'desktop') {
    return (
      <div className="w-[1600px] bg-neutral-50 rounded-lg inline-flex items-stretch shadow-lg p-2">
        <AccommodationDestination 
          variant="desktop" 
          destino={destino}
          onDestinoChange={setDestino}
        />
        <AccommodationGuests
          variant="desktop"
          cuartos={cuartos}
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
        onDestinoChange={setDestino}
      />
      <AccommodationGuests
        variant="mobile"
        cuartos={cuartos}
        onDecrease={decreaseHuespedes}
        onIncrease={increaseHuespedes}
      />
    </div>
  );
}

