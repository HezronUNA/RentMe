import { useDestinationLogic } from '../../../hooks/useDestinationLogic';

interface DestinationSectionProps {
  variant: 'desktop' | 'mobile';
  ubicacion: string;
  onUbicacionChange: (ubicacion: string) => void;
}

export function DestinationSection({ variant, ubicacion, onUbicacionChange }: DestinationSectionProps) {
  const {
    isOpen,
    searchTerm,
    dropdownRef,
    isLoading,
    error,
    filteredCantones,
    handleToggleDropdown,
    handleSelectCanton,
    handleClearSelection,
    setSearchTerm,
    getStatusMessage,
    shouldShowClearButton,
    isCantonSelected,
  } = useDestinationLogic({ ubicacion, onUbicacionChange });

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

    const statusMessage = getStatusMessage();
    if (statusMessage) {
      return (
        <div className="px-4 py-2 text-zinc-500 text-center">
          {statusMessage}
        </div>
      );
    }

    return (
      <>
        {shouldShowClearButton() && (
          <button
            onClick={handleClearSelection}
            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 border-b border-zinc-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">Limpiar selección</span>
            </div>
          </button>
        )}
        {filteredCantones.map((canton) => (
          <button
            key={canton.id || canton.descripcion}
            onClick={() => handleSelectCanton(canton.descripcion)}
            className={`w-full px-4 py-3 text-left hover:bg-[#52655B]/5 transition-colors cursor-pointer ${
              isCantonSelected(canton.descripcion) ? 'bg-[#52655B]/10 text-[#52655B] border-l-4 border-[#52655B]' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isCantonSelected(canton.descripcion) ? 'text-[#52655B]' : 'text-zinc-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{canton.descripcion || 'Cantón sin nombre'}</span>
            </div>
          </button>
        ))}
      </>
    );
  };

  if (variant === 'desktop') {
    return (
      <div className="flex-[1.5] flex items-center border-r border-zinc-200 mx-2 relative" ref={dropdownRef}>
        <div className="w-full px-6 py-5 flex flex-col justify-center gap-3">
          <div className="text-zinc-600 text-base font-medium tracking-wide text-left mb-2">
            Ubicación
          </div>
          <div className="relative flex items-center gap-3 w-full group min-w-0 bg-white rounded-lg border border-zinc-200 px-4 py-2.5 hover:border-[#52655B] hover:shadow-sm transition-all duration-200 focus-within:border-[#52655B] focus-within:ring-2 focus-within:ring-[#52655B]/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            
            <input
              type="text"
              placeholder={isLoading ? 'Cargando ubicaciones...' : 'Selecciona una ubicación'}
              value={isOpen ? searchTerm : ubicacion}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (!isOpen) {
                  handleToggleDropdown(e as any);
                }
              }}
              onFocus={() => {
                if (!isOpen && !isLoading) {
                  handleToggleDropdown({} as any);
                }
              }}
              disabled={isLoading}
              className="flex-1 min-w-0 text-gray-800 text-base font-medium bg-transparent border-none outline-none placeholder:text-zinc-400 transition-colors"
            />
            
            {!isLoading && (
              <button
                onClick={handleToggleDropdown}
                type="button"
                className="flex-shrink-0 p-1.5 hover:bg-[#52655B]/10 rounded-md transition-colors cursor-pointer"
              >
                <svg 
                  className={`h-4 w-4 text-[#52655B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown Desktop */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-xl shadow-xl z-[9999] mt-2 min-w-[300px] max-w-[500px] overflow-hidden">
              <div className="max-h-64 overflow-y-auto">
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
        className="flex items-center gap-3 w-full text-left group bg-white rounded-lg border border-zinc-200 px-4 py-3 hover:border-[#52655B] hover:shadow-sm transition-all duration-200 cursor-pointer"
        disabled={isLoading}
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <div className="text-gray-800 text-sm font-medium flex-1 transition-colors">
          {isLoading 
            ? 'Cargando ubicaciones...' 
            : ubicacion || 'Selecciona una ubicación'
          }
        </div>
        {!isLoading && (
          <svg 
            className={`h-4 w-4 text-[#52655B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Dropdown Mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-xl shadow-xl z-[9999] mt-2 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50">
            <input
              type="text"
              placeholder="Buscar cantón..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/20 transition-all bg-white"
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