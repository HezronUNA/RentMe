import { useState } from 'react';
import { AccommodationDestination } from './AccommodationDestination';
import { AccommodationGuests } from './AccommodationRooms';
import { AccommodationSearchButton } from './AccommodationSearchButton';

export interface AccommodationSearchFilters {
  destino: string;
  huespedes: number;
}

interface AccommodationSearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: AccommodationSearchFilters) => void;
}

export function AccommodationSearchBox({ variant, onSearchFilters }: AccommodationSearchBoxProps) {
  const [destino, setDestino] = useState('');
  const [huespedes, setHuespedes] = useState(0);

  const handleSearchClick = () => {
    const filtros: AccommodationSearchFilters = {
      destino,
      huespedes,
    };

    if (onSearchFilters) onSearchFilters(filtros);
  };

  const increaseHuespedes = () => {
    setHuespedes((prev) => prev + 1);
  };

  const decreaseHuespedes = () => {
    setHuespedes((prev) => Math.max(0, prev - 1));
  };

  if (variant === 'desktop') {
    return (
      <div className="w-full max-w-5xl bg-white rounded-full inline-flex items-stretch shadow-[0_6px_20px_rgba(0,0,0,0.1)] p-1.5 border border-zinc-200/80">
        <AccommodationDestination 
          variant="desktop" 
          destino={destino}
          onDestinoChange={setDestino}
        />
        <AccommodationGuests
          variant="desktop"
          cuartos={huespedes}
          onDecrease={decreaseHuespedes}
          onIncrease={increaseHuespedes}
        />
        <AccommodationSearchButton variant="desktop" onClick={handleSearchClick} />
      </div>
    );
  }

  // Versión Mobile — misma línea visual que ventas (estilo Airbnb)
  return (
    <div className="w-full max-w-lg mx-auto overflow-visible">
      <div className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)] divide-y divide-neutral-100">
        <AccommodationDestination
          variant="mobile"
          destino={destino}
          onDestinoChange={setDestino}
        />
        <AccommodationGuests
          variant="mobile"
          cuartos={huespedes}
          onDecrease={decreaseHuespedes}
          onIncrease={increaseHuespedes}
        />
        <div className="p-4">
          <AccommodationSearchButton variant="mobile" onClick={handleSearchClick} />
        </div>
      </div>
    </div>
  );
}

