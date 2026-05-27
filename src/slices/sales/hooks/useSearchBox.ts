import { useState } from 'react';
import type { FiltrosBusqueda } from './usePropiedadesConFiltros';

interface SearchBoxState {
  ubicacion: string;
  habitaciones: number;
}

interface SearchBoxActions {
  handleHabitacionesChange: (habitaciones: number) => void;
  handleUbicacionChange: (ubicacion: string) => void;
  getFiltrosActuales: () => FiltrosBusqueda;
}

export function useSearchBox(): [SearchBoxState, SearchBoxActions] {
  const [ubicacion, setUbicacion] = useState('');
  const [habitaciones, setHabitaciones] = useState(0);

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

    return filtros;
  };

  return [
    {
      ubicacion,
      habitaciones,
    },
    {
      handleHabitacionesChange,
      handleUbicacionChange,
      getFiltrosActuales
    },
  ];
}


