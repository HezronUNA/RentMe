import { useState } from 'react';
import { AccommodationDestination } from './AccommodationDestination';
import { AccommodationGuests } from './AccommodationRooms';
import { AccommodationSearchButton } from './AccommodationSearchButton';
import { AccommodationPriceSection } from './AccommodationPriceSection';

export interface AccommodationSearchFilters {
  destino: string;
  cuartos: number;
  price: string;
  precioMax: string;
}

interface AccommodationSearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: AccommodationSearchFilters) => void;
}

export function AccommodationSearchBox({ variant, onSearchFilters }: AccommodationSearchBoxProps) {
  const [destino, setDestino] = useState('');
  const [cuartos, setCuartos] = useState(0);
  const [price, setPrice] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const handleSearchClick = () => {
    const filtros: AccommodationSearchFilters = {
      destino,
      cuartos,
      price,
      precioMax,
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setPrice(value);
  };

  const handlePriceBlur = () => {
    if (price === '' || price === '.') {
      setPrice('0.00');
      return;
    }
    const num = parseFloat(price);
    if (!isNaN(num)) {
      setPrice(num.toFixed(2));
    }
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setPrecioMax(value);
  };

  const handlePriceMaxBlur = () => {
    if (precioMax === '' || precioMax === '.') {
      setPrecioMax('');
      return;
    }
    const num = parseFloat(precioMax);
    if (!isNaN(num)) {
      setPrecioMax(num.toFixed(2));
    }
  };

  if (variant === 'desktop') {
    return (
      <div className="w-full max-w-6xl bg-white rounded-full inline-flex items-stretch shadow-[0_8px_28px_rgba(0,0,0,0.12)] p-2 border border-zinc-200/80">
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
        <AccommodationPriceSection
          variant="desktop"
          price={price}
          precioMax={precioMax}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
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
          cuartos={cuartos}
          onDecrease={decreaseHuespedes}
          onIncrease={increaseHuespedes}
        />
        <AccommodationPriceSection
          variant="mobile"
          price={price}
          precioMax={precioMax}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
        />
        <div className="p-4">
          <AccommodationSearchButton variant="mobile" onClick={handleSearchClick} />
        </div>
      </div>
    </div>
  );
}

