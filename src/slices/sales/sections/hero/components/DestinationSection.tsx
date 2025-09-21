import { useState, useMemo, useRef, useEffect } from 'react';
import { useAllCantones } from '@/shared/hooks/useAllCantones';

interface DestinationSectionProps {
  variant: 'desktop' | 'mobile';
  ubicacion: string;
  onUbicacionChange: (ubicacion: string) => void;
}

export function DestinationSection({ variant, ubicacion, onUbicacionChange }: DestinationSectionProps) {
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
    onUbicacionChange(cantonDescripcion);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onUbicacionChange('');
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoading) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (!newIsOpen) {
        setSearchTerm('');
      }
    }
  };

  // Componente de loading
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#52655B]"></div>
      <span className="ml-2 text-zinc-500">Cargando cantones...</span>
    </div>
  );

  // Componente de error
  const ErrorMessage = () => (
    <div className="px-4 py-2 text-red-600 text-center">
      Error al cargar cantones. Intenta de nuevo.
    </div>
  );

  // Renderizar contenido del dropdown
  const renderDropdownContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;

    if (!Array.isArray(filteredCantones) || filteredCantones.length === 0) {
      return (
        <div className="px-4 py-2 text-zinc-500 text-center">
          {searchTerm ? `No se encontraron cantones con "${searchTerm}"` : 'No hay cantones disponibles'}
        </div>
      );
    }

    return (
      <>
        {ubicacion && (
          <button
            onClick={handleClearSelection}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 border-b border-zinc-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>✕</span>
              <span>Limpiar selección</span>
            </div>
          </button>
        )}
        {filteredCantones.map((canton) => (
          <button
            key={canton.id || canton.descripcion}
            onClick={() => handleSelectCanton(canton.descripcion)}
            className={`w-full px-4 py-2 text-left hover:bg-zinc-50 transition-colors ${
              ubicacion === canton.descripcion ? 'bg-blue-50 text-blue-700' : 'text-black'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{canton.descripcion || 'Cantón sin nombre'}</span>
            </div>
          </button>
        ))}
      </>
    );
  };

  if (variant === 'desktop') {
    return (
      <div className="flex-1 flex items-center border-r border-zinc-200 mx-2 relative" ref={dropdownRef}>
        <div className="w-full px-8 py-5 flex flex-col justify-center gap-3">
          <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
            Ubicación
          </div>
          <button
            onClick={handleToggleDropdown}
            className="flex items-center gap-3 w-full text-left group"
            disabled={isLoading}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="text-black text-base font-medium group-hover:text-zinc-700 transition-colors">
              {isLoading 
                ? 'Cargando ubicaciones...' 
                : ubicacion || 'Selecciona una ubicación'
              }
            </div>
            {!isLoading && (
              <svg 
                className={`h-4 w-4 text-zinc-600 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Dropdown Desktop */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 mt-1">
              <div className="p-3 border-b border-zinc-200">
                <input
                  type="text"
                  placeholder="Buscar cantón..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/20 transition-all"
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {renderDropdownContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2 relative" ref={dropdownRef}>
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Ubicación
      </div>
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-3 w-full text-left group"
        disabled={isLoading}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <div className="text-black text-sm font-medium flex-1 group-hover:text-zinc-700 transition-colors">
          {isLoading 
            ? 'Cargando ubicaciones...' 
            : ubicacion || 'Selecciona una ubicación'
          }
        </div>
        {!isLoading && (
          <svg 
            className={`h-4 w-4 text-zinc-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Dropdown Mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 mt-1">
          <div className="p-3 border-b border-zinc-200">
            <input
              type="text"
              placeholder="Buscar cantón..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/20 transition-all"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {renderDropdownContent()}
          </div>
        </div>
      )}
    </div>
  );
}