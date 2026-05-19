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
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Obtener ubicaciones de hospedajes desde Supabase
  const { data: locations = [], isLoading, error } = useHospedajeLocations();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filtrar ubicaciones basado en el término de búsqueda
  const filteredLocations = useMemo(() => {
    if (!Array.isArray(locations) || locations.length === 0) {
      return [];
    }

    if (!searchTerm.trim()) {
      return locations;
    }

    return locations.filter(
      (location) =>
        location &&
        location.descripcion &&
        typeof location.descripcion === 'string' &&
        location.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [locations, searchTerm]);

  const handleSelectLocation = (locationDescripcion: string) => {
    onLocationChange(locationDescripcion);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onLocationChange('');
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggleDropdown = (e?: React.MouseEvent | React.FocusEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isLoading) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (!newIsOpen) {
        setSearchTerm('');
      } else {
        // Si se abre el dropdown y hay una ubicación seleccionada, ponerla en el searchTerm
        if (selectedLocation && !searchTerm) {
          setSearchTerm(selectedLocation);
        }
      }
    }
  };

  // Función para obtener el mensaje de estado
  const getStatusMessage = () => {
    if (isLoading) return 'Cargando destinos...';
    if (error) return 'Error al cargar destinos. Intenta de nuevo.';
    if (!Array.isArray(filteredLocations) || filteredLocations.length === 0) {
      return searchTerm
        ? `No se encontraron destinos con "${searchTerm}"`
        : 'No hay destinos disponibles';
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
    searchTerm,
    dropdownRef,
    isLoading,
    error,
    filteredLocations,
    handleToggleDropdown,
    handleSelectLocation,
    handleClearSelection,
    setSearchTerm,
    getStatusMessage,
    shouldShowClearButton,
    isLocationSelected,
  };
}
