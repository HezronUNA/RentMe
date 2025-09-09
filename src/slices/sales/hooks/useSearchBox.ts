import { useState } from 'react';

interface SearchBoxState {
  guests: number;
  price: string;
  currency: 'USD' | 'CRC';
}

interface SearchBoxActions {
  decreaseGuests: () => void;
  increaseGuests: () => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  toggleCurrency: () => void;
  handleSearch: () => void;
}

export function useSearchBox(): [SearchBoxState, SearchBoxActions] {
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'CRC'>('USD');

  const decreaseGuests = () => {
    if (guests > 0) {
      setGuests(prev => prev - 1);
    }
  };

  const increaseGuests = () => {
    setGuests(prev => prev + 1);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d.]/g, '');
    setPrice(value);
  };

  const handlePriceBlur = () => {
    let value = price;
    if (value === '' || value === '.') {
      setPrice('0.00');
    } else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setPrice(num.toFixed(2));
      }
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'CRC' : 'USD');
  };

  const handleSearch = () => {
    // Aquí iría la lógica de búsqueda
    console.log('Búsqueda con:', { guests, price });
  };

  return [
    // Estado
    {
      guests,
      price,
      currency,
    },
    // Acciones
    {
      decreaseGuests,
      increaseGuests,
      handlePriceChange,
      handlePriceBlur,
      toggleCurrency,
      handleSearch,
    },
  ];
}
