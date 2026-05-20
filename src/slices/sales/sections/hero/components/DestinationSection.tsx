import { useDestinationLogic } from "@/hooks/useDestinationLogic";

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
  } = useDestinationLogic({ selectedLocation: ubicacion, onLocationChange: onUbicacionChange });

  const renderDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#52655B]"></div>
          <span className="ml-2 text-zinc-500">Cargando cantones...</span>
        </div>
      );
    }

    if (error) {
      return <div className="px-4 py-2 text-red-600 text-center">Error al cargar cantones. Intenta de nuevo.</div>;
    }

    const statusMessage = getStatusMessage();
    if (statusMessage) {
      return <div className="px-4 py-2 text-zinc-500 text-center">{statusMessage}</div>;
    }

    return (
      <div className="py-2">
        <div className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Destinos sugeridos</div>

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

        {filteredCantones.map((canton) => (
          <button
            key={canton.id || canton.descripcion}
            onClick={() => handleSelectCanton(canton.descripcion)}
            className={`w-full px-4 py-2 text-left transition-colors cursor-pointer ${
              isCantonSelected(canton.descripcion) ? 'text-[#52655B]' : 'text-gray-700 hover:bg-zinc-50'
            }`}
            type="button"
          >
            <div className={`flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 ${
              isCantonSelected(canton.descripcion) ? 'bg-[#52655B]/10' : ''
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isCantonSelected(canton.descripcion) ? 'text-[#52655B]' : 'text-zinc-400'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium truncate">{canton.descripcion || 'Cantón sin nombre'}</span>
              </div>
              {isCantonSelected(canton.descripcion) && (
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
        placeholder={isLoading ? 'Cargando ubicaciones...' : 'Selecciona una ubicación'}
        value={isOpen ? searchTerm : ubicacion}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) handleToggleDropdown(e as any);
        }}
        onFocus={() => {
          if (!isOpen && !isLoading) handleToggleDropdown({} as any);
        }}
        disabled={isLoading}
        className="flex-1 min-w-0 text-gray-900 text-sm font-medium bg-transparent border-none outline-none placeholder:text-zinc-400 transition-colors"
      />
      {!isLoading && (
        <button
          onClick={handleToggleDropdown}
          type="button"
          className="flex-shrink-0 p-1.5 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer"
        >
          <svg className={`h-4 w-4 text-zinc-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </>
  );

  if (variant === 'desktop') {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div className="h-[56px] w-full rounded-xl border border-zinc-300 bg-white/70 px-3 transition-colors hover:border-zinc-400 focus-within:border-[#52655B]/40 focus-within:ring-1 focus-within:ring-[#52655B]/10">
          <div className="mb-1 text-left text-[10px] font-semibold uppercase tracking-wide text-zinc-700">Ubicacion</div>
          <div className="relative">
            <div className="w-full">
              <div className="flex items-center gap-2 px-0 py-0">
                {triggerContent}
              </div>
            </div>
            {isOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[9999] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
                <div className="max-h-42 overflow-y-auto">{renderDropdownContent()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 py-3" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex w-full min-h-[3.25rem] items-center gap-3 rounded-xl py-1 text-left transition-colors active:bg-neutral-50"
        disabled={isLoading}
        type="button"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-[#52655B]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-neutral-900">¿Dónde?</p>
          <p className="mt-0.5 truncate text-sm text-neutral-500">
            {isLoading ? 'Cargando ubicaciones…' : ubicacion || 'Buscar destino'}
          </p>
        </div>
        {!isLoading && (
          <svg
            className={`h-4.5 w-4.5 shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-2 right-2 top-full z-[9999] mt-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl ring-1 ring-black/5">
          <div className="border-b border-neutral-100 bg-neutral-50 px-3 py-3">
            <input
              type="search"
              placeholder="Buscar cantón..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#52655B] focus:ring-2 focus:ring-[#52655B]/20"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="max-h-[min(40vh,220px)] overflow-y-auto overscroll-contain">{renderDropdownContent()}</div>
        </div>
      )}
    </div>
  );
}

