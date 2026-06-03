import { useState, useMemo, useRef, useEffect } from 'react';
import { useHospedajeLocations } from '@/hooks/useHospedajeLocations';

export interface UseAccommodationDestinationProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function useAccommodationDestination({
  selectedLocation,
  onLocationChange,
}: UseAccommodationDestinationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Obtener ubicaciones de hospedajes desde Supabase
  const { data: locations = [], isLoading, error } = useHospedajeLocations();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Lista de ubicaciones disponibles
  const filteredLocations = useMemo(() => {
    if (!Array.isArray(locations) || locations.length === 0) {
      return [];
    }

    return locations;
  }, [locations]);

  const handleSelectLocation = (locationDescripcion: string) => {
    onLocationChange(locationDescripcion);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onLocationChange('');
    setIsOpen(false);
  };

  const handleToggleDropdown = (e?: React.MouseEvent | React.FocusEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isLoading) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
    }
  };

  // Función para obtener el mensaje de estado
  const getStatusMessage = () => {
    if (isLoading) return 'Cargando destinos...';
    if (error) return 'Error al cargar destinos. Intenta de nuevo.';
    if (!Array.isArray(filteredLocations) || filteredLocations.length === 0) {
      return 'No hay destinos disponibles';
    }
    return null;
  };

  // Función para verificar si debe mostrar el botón de limpiar
  const shouldShowClearButton = () => Boolean(selectedLocation);

  // Función para verificar si una ubicación está seleccionada
  const isLocationSelected = (locationDescripcion: string) =>
    selectedLocation === locationDescripcion;

  return {
    isOpen,
    dropdownRef,
    isLoading,
    error,
    filteredLocations,
    handleToggleDropdown,
    handleSelectLocation,
    handleClearSelection,
    getStatusMessage,
    shouldShowClearButton,
    isLocationSelected,
  };
}
