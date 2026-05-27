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
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[22px] border border-black/10 bg-white px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.09)]">
            <div className="flex w-full items-center gap-2">
              <div className="flex min-w-0 flex-1 items-stretch gap-2">
                <div className="min-w-0 flex-[1.1]">
                <AccommodationDestination
                  variant="desktop"
                  destino={destino}
                  onDestinoChange={setDestino}
                />
              </div>
              <div className="w-px bg-black/10" />
              <div className="flex min-w-[220px] flex-[0.9] items-center justify-start pl-1">
                <AccommodationGuests
                  variant="desktop"
                  cuartos={huespedes}
                  onDecrease={decreaseHuespedes}
                  onIncrease={increaseHuespedes}
                />
              </div>
            </div>
              <AccommodationSearchButton variant="desktop" onClick={handleSearchClick} />
            </div>
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

