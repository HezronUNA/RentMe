
import { useDestinationLogic } from '@/shared/hooks/useDestinationLogic';

interface AccommodationDestinationProps {
  variant: 'desktop' | 'mobile';
  destino: string;
  onDestinoChange: (value: string) => void;
}

export function AccommodationDestination({ 
  variant, 
  destino, 
  onDestinoChange 
}: AccommodationDestinationProps) {
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
  } = useDestinationLogic({ selectedLocation: destino, onLocationChange: onDestinoChange });

  // Componente de loading
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#52655B]"></div>
      <span className="ml-2 text-zinc-500">Cargando destinos...</span>
    </div>
  );

  // Componente de error
  const ErrorMessage = () => (
    <div className="px-4 py-2 text-red-600 text-center">
      Error al cargar destinos. Intenta de nuevo.
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
        {/* Search input for mobile */}
        {variant === 'mobile' && (
          <div className="px-4 py-3 border-b border-zinc-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/10"
                autoFocus
              />
              {shouldShowClearButton() && (
                <button
                  onClick={handleClearSelection}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#52655B]/10 rounded-md transition-colors"
                >
                  <svg className="h-3 w-3 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        
        {filteredCantones.map((canton, index) => (
          <button
            key={canton.id || `canton-${index}`}
            onClick={() => handleSelectCanton(canton.descripcion || '')}
            className={`w-full px-4 py-3 text-left hover:bg-[#52655B]/10 transition-colors flex items-center gap-3 ${
              isCantonSelected(canton.descripcion || '') ? 'bg-[#52655B]/5 text-[#52655B]' : 'text-gray-700'
            }`}
            type="button"
          >
            <div className="flex items-center gap-3 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
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
            Destino
          </div>
          <div className="relative flex items-center gap-3 w-full group min-w-0 bg-white rounded-lg border border-zinc-200 px-4 py-2.5 hover:border-[#52655B] hover:shadow-sm transition-all duration-200 focus-within:border-[#52655B] focus-within:ring-2 focus-within:ring-[#52655B]/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            
            <input
              type="text"
              placeholder={isLoading ? 'Cargando destinos...' : 'Selecciona una ubicación'}
              value={isOpen ? searchTerm : destino}
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

  // Mobile version
  return (
    <div className="px-6 py-5 border-b border-zinc-200 mx-2 relative" ref={dropdownRef}>
      <div className="text-zinc-600 text-sm font-medium tracking-wide mb-3">
        Destino
      </div>
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-3 w-full text-left group bg-white rounded-lg border border-zinc-200 px-4 py-3 hover:border-[#52655B] hover:shadow-sm transition-all duration-200 cursor-pointer"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span className="flex-1 text-gray-800 text-sm font-medium min-w-0">
          {destino || "Selecciona una ubicación"}
        </span>
        <svg 
          className={`h-4 w-4 text-[#52655B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-zinc-200 rounded-xl shadow-xl z-[9999] mt-2 min-w-[250px] max-w-[350px] overflow-hidden">
          <div className="max-h-48 overflow-y-auto">
            {renderDropdownContent()}
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Selecciona una ubicación"
        value={destino}
        onChange={(e) => onDestinoChange(e.target.value)}
        className="sr-only"
      />
    </div>
  );
}