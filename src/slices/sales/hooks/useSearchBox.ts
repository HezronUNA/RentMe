import { useState } from 'react';
import type { FiltrosBusqueda } from './usePropiedadesConFiltros';

interface SearchBoxState {
  guests: number;
  price: string;
  currency: 'USD' | 'CRC';
  ubicacion: string;
  habitaciones: number;
  baños: number;
  precioMax: string;
}

interface SearchBoxActions {
  decreaseGuests: () => void;
  increaseGuests: () => void;
  decreaseHabitaciones: () => void;
  increaseHabitaciones: () => void;
  decreaseBaños: () => void;
  increaseBaños: () => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  handlePriceMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceMaxBlur: () => void;
  handleUbicacionChange: (ubicacion: string) => void;
  toggleCurrency: () => void;
  handleSearch: () => void;
  getFiltrosActuales: () => FiltrosBusqueda;
}

export function useSearchBox(): [SearchBoxState, SearchBoxActions] {
  const [guests, setGuests] = useState(0);
  const [price, setPrice] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'CRC'>('USD');
  const [ubicacion, setUbicacion] = useState('');
  const [habitaciones, setHabitaciones] = useState(0);
  const [baños, setBaños] = useState(0);

  const decreaseGuests = () => {
    if (guests > 0) {
      setGuests(prev => prev - 1);
    }
  };

  const increaseGuests = () => {
    setGuests(prev => prev + 1);
  };

  const decreaseHabitaciones = () => {
    if (habitaciones > 0) {
      setHabitaciones(prev => prev - 1);
    }
  };

  const increaseHabitaciones = () => {
    setHabitaciones(prev => prev + 1);
  };

  const decreaseBaños = () => {
    if (baños > 0) {
      setBaños(prev => prev - 1);
    }
  };

  const increaseBaños = () => {
    setBaños(prev => prev + 1);
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

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d.]/g, '');
    setPrecioMax(value);
  };

  const handlePriceMaxBlur = () => {
    let value = precioMax;
    if (value === '' || value === '.') {
      setPrecioMax('');
    } else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setPrecioMax(num.toFixed(2));
      }
    }
  };

  const handleUbicacionChange = (nuevaUbicacion: string) => {
    setUbicacion(nuevaUbicacion);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'CRC' : 'USD');
  };

  const getFiltrosActuales = (): FiltrosBusqueda => {
    const filtros: FiltrosBusqueda = {};

    if (ubicacion.trim()) {
      filtros.canton = ubicacion.trim();
    }

    if (habitaciones > 0) {
      filtros.habitaciones = habitaciones;
    }

    if (baños > 0) {
      filtros.baños = baños;
    }

    const precioMinNum = parseFloat(price);
    const precioMaxNum = parseFloat(precioMax);

    if (!isNaN(precioMinNum) && precioMinNum > 0) {
      filtros.precioMin = precioMinNum;
    }

    if (!isNaN(precioMaxNum) && precioMaxNum > 0) {
      filtros.precioMax = precioMaxNum;
    }

    return filtros;
  };

  const handleSearch = () => {
    const filtros = getFiltrosActuales();
    console.log('Búsqueda con filtros:', filtros);
    
    // Aquí se aplicarían los filtros al hook de propiedades
    // Esto se manejará desde el componente padre
  };

  return [
    // Estado
    {
      guests,
      price,
      precioMax,
      currency,
      ubicacion,
      habitaciones,
      baños,
    },
    // Acciones
    {
      decreaseGuests,
      increaseGuests,
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
      getFiltrosActuales,
    },
  ];
}
