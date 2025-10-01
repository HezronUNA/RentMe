import { useState } from "react";

export interface AccommodationSearchFilters {
  destino: string;
  entrada: string;
  salida: string;
  huespedes: number;
}

export function useAccommodationSearch() {
  // Generar fechas dinámicas
  const getDefaultEntrada = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getDefaultSalida = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [destino, setDestino] = useState<string>("");
  const [entrada, setEntrada] = useState<string>(getDefaultEntrada());
  const [salida, setSalida] = useState<string>(getDefaultSalida());
  const [huespedes, setHuespedes] = useState<number>(0);

  const handleDestinoChange = (value: string) => {
    setDestino(value);
  };

  const handleEntradaChange = (value: string) => {
    setEntrada(value);
  };

  const handleSalidaChange = (value: string) => {
    setSalida(value);
  };

  const increaseHuespedes = () => {
    setHuespedes(prev => prev + 1);
  };

  const decreaseHuespedes = () => {
    setHuespedes(prev => Math.max(0, prev - 1));
  };

  const getFiltrosActuales = (): AccommodationSearchFilters => {
    return {
      destino,
      entrada,
      salida,
      huespedes,
    };
  };

  const resetFilters = () => {
    setDestino("");
    setEntrada(getDefaultEntrada());
    setSalida(getDefaultSalida());
    setHuespedes(0);
  };

  return [
    {
      destino,
      entrada,
      salida,
      huespedes,
    },
    {
      handleDestinoChange,
      handleEntradaChange,
      handleSalidaChange,
      increaseHuespedes,
      decreaseHuespedes,
      getFiltrosActuales,
      resetFilters,
    }
  ] as const;
}