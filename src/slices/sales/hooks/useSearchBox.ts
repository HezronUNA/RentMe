import { useState } from 'react';
import type { FiltrosBusqueda } from './usePropiedadesConFiltros';

interface SearchBoxState {
  price: string;
  ubicacion: string;
  habitaciones: number;
  precioMax: string;
}

interface SearchBoxActions {
  handleHabitacionesChange: (habitaciones: number) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  handlePriceMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceMaxBlur: () => void;
  handleUbicacionChange: (ubicacion: string) => void;
  getFiltrosActuales: () => FiltrosBusqueda;
}

export function useSearchBox(): [SearchBoxState, SearchBoxActions] {
  const [price, setPrice] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [habitaciones, setHabitaciones] = useState(0);

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

  const handleHabitacionesChange = (nuevaCantidad: number) => {
    if (Number.isNaN(nuevaCantidad) || nuevaCantidad < 0) {
      setHabitaciones(0);
      return;
    }

    setHabitaciones(nuevaCantidad);
  };

  const getFiltrosActuales = (): FiltrosBusqueda => {
    const filtros: FiltrosBusqueda = {};

    if (ubicacion.trim()) {
      filtros.canton = ubicacion.trim();
    }

    if (habitaciones > 0) {
      filtros.habitaciones = habitaciones;
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

  return [
    {
      price,
      precioMax,
      ubicacion,
      habitaciones,
    },
    {
      handleHabitacionesChange,
      handlePriceChange,
      handlePriceBlur,
      handlePriceMaxChange,
      handlePriceMaxBlur,
      handleUbicacionChange,
      getFiltrosActuales
    },
  ];
}


