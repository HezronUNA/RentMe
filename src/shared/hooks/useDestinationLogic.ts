import { useState, useMemo, useRef, useEffect } from 'react';
import { useAllCantones } from '@/shared/hooks/useAllCantones';

export interface UseDestinationLogicProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export function useDestinationLogic({ selectedLocation, onLocationChange }: UseDestinationLogicProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Usar el hook para obtener cantones de la API
  const { data: cantones = [], isLoading, error } = useAllCantones();

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

  // Filtrar cantones basado en el término de búsqueda
  const filteredCantones = useMemo(() => {
    if (!Array.isArray(cantones) || cantones.length === 0) {
      return [];
    }

    if (!searchTerm.trim()) {
      return cantones;
    }
    
    return cantones.filter(canton => 
      canton && 
      canton.descripcion && 
      typeof canton.descripcion === 'string' &&
      canton.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cantones, searchTerm]);

  const handleSelectCanton = (cantonDescripcion: string) => {
    onLocationChange(cantonDescripcion);
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
    if (error) return 'Error al cargar cantones. Intenta de nuevo.';
    if (!Array.isArray(filteredCantones) || filteredCantones.length === 0) {
      return searchTerm ? `No se encontraron destinos con "${searchTerm}"` : 'No hay destinos disponibles';
    }
    return null;
  };

  // Función para verificar si debe mostrar el botón de limpiar
  const shouldShowClearButton = () => Boolean(selectedLocation);

  // Función para verificar si un cantón está seleccionado
  const isCantonSelected = (cantonDescripcion: string) => selectedLocation === cantonDescripcion;

  return {
    // Estados
    isOpen,
    searchTerm,
    dropdownRef,
    isLoading,
    error,
    filteredCantones,
    
    // Handlers
    handleSelectCanton,
    handleClearSelection,
    handleToggleDropdown,
    setSearchTerm,
    
    // Funciones utilitarias
    getStatusMessage,
    shouldShowClearButton,
    isCantonSelected,
  };
}