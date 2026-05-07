import { useDestinationLogic } from "@/hooks/useDestinationLogic";

interface AccommodationDestinationProps {
  variant: 'desktop' | 'mobile';
  destino: string;
  onDestinoChange: (value: string) => void;
}

export function AccommodationDestination({
  variant,
  destino,
  onDestinoChange,
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

  const renderDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#52655B]"></div>
          <span className="ml-2 text-zinc-500">Cargando destinos...</span>
        </div>
      );
    }

    if (error) {
      return <div className="px-4 py-2 text-red-600 text-center">Error al cargar destinos. Intenta de nuevo.</div>;
    }

    const statusMessage = getStatusMessage();
    if (statusMessage) {
      return <div className="px-4 py-2 text-zinc-500 text-center">{statusMessage}</div>;
    }

    return (
      <div className="py-2">
        <div className="px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Destinos sugeridos</div>

        {shouldShowClearButton() && (
          <button
            onClick={handleClearSelection}
            className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-3 rounded-xl px-2 py-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="font-medium">Limpiar selección</span>
            </div>
          </button>
        )}

        {filteredCantones.map((canton, index) => (
          <button
            key={canton.id || `canton-${index}`}
            onClick={() => handleSelectCanton(canton.descripcion || '')}
            className={`w-full px-4 py-2 text-left transition-colors cursor-pointer ${
              isCantonSelected(canton.descripcion || '') ? 'text-[#52655B]' : 'text-gray-700 hover:bg-zinc-50'
            }`}
            type="button"
          >
            <div className={`flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 w-full ${
              isCantonSelected(canton.descripcion || '') ? 'bg-[#52655B]/10' : ''
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 flex-shrink-0 ${isCantonSelected(canton.descripcion || '') ? 'text-[#52655B]' : 'text-zinc-400'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium truncate">{canton.descripcion || 'Cantón sin nombre'}</span>
              </div>
              {isCantonSelected(canton.descripcion || '') && (
                <svg className="h-4 w-4 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.495 6.493-6.494a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  };

  const triggerContent = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <input
        type="text"
        placeholder={isLoading ? 'Cargando destinos...' : 'Selecciona una ubicación'}
        value={isOpen ? searchTerm : destino}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) handleToggleDropdown(e as any);
        }}
        onFocus={(e) => {
          if (!isOpen && !isLoading) handleToggleDropdown(e);
        }}
        disabled={isLoading}
        className="flex-1 min-w-0 text-gray-900 text-sm font-medium bg-transparent border-none outline-none placeholder:text-zinc-400 transition-colors"
      />
      {!isLoading && (
        <button onClick={handleToggleDropdown} type="button" className="flex-shrink-0 p-1.5 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer">
          <svg className={`h-4 w-4 text-zinc-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </>
  );

  if (variant === 'desktop') {
    return (
      <div className="flex-[1.6] flex items-center border-r border-zinc-200 relative" ref={dropdownRef}>
        <div className="w-full px-6 py-3 flex flex-col justify-center gap-2">
          <div className="text-zinc-700 text-xs font-semibold tracking-wide text-left uppercase">Destino</div>
          <div className="relative">
            <div className="w-full border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-300 transition-all duration-200 rounded-full">
              <div className="flex items-center gap-3 px-3 py-2">{triggerContent}</div>
            </div>
            {isOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[9999] bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="max-h-64 overflow-y-auto">{renderDropdownContent()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 border-b border-zinc-200/80 relative" ref={dropdownRef}>
      <div className="text-zinc-700 text-xs font-semibold tracking-wide mb-2 uppercase">Destino</div>
      <div className="relative">
        <button
          onClick={handleToggleDropdown}
          className="flex items-center gap-3 w-full text-left px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-full hover:bg-white hover:border-zinc-300 transition-all duration-200 cursor-pointer"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#52655B] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="flex-1 text-gray-800 text-sm font-medium min-w-0">{destino || "Selecciona una ubicación"}</span>
          <svg className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[9999] bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="max-h-56 overflow-y-auto">{renderDropdownContent()}</div>
          </div>
        )}
      </div>

      <input type="text" placeholder="Selecciona una ubicación" value={destino} onChange={(e) => onDestinoChange(e.target.value)} className="sr-only" />
    </div>
  );
}

