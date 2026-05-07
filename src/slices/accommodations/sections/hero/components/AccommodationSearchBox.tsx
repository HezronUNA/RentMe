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
  const [currency, setCurrency] = useState<'USD' | 'CRC'>('USD');

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

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'CRC' : 'USD'));
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
          currency={currency}
          onPriceChange={handlePriceChange}
          onPriceBlur={handlePriceBlur}
          onPriceMaxChange={handlePriceMaxChange}
          onPriceMaxBlur={handlePriceMaxBlur}
          onCurrencyToggle={toggleCurrency}
        />
        <AccommodationSearchButton variant="desktop" onClick={handleSearchClick} />
      </div>
    );
  }

  // Versión Mobile
  return (
    <div className="w-[95%] max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-zinc-200/80 p-3 overflow-visible">
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-200/80">
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
      <AccommodationPriceSection
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

