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
      <div className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex w-full items-stretch justify-between">
            <div className="flex shrink-0 items-stretch gap-4">
              <div className="w-[360px] shrink-0">
                <AccommodationDestination
                  variant="desktop"
                  destino={destino}
                  onDestinoChange={setDestino}
                />
              </div>
              <AccommodationGuests
                variant="desktop"
                cuartos={huespedes}
                onDecrease={decreaseHuespedes}
                onIncrease={increaseHuespedes}
              />
            </div>

            <AccommodationSearchButton variant="desktop" onClick={handleSearchClick} />
          </div>
        </div>
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

