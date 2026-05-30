import { DestinationSection } from './DestinationSection';
import { BedroomsSection } from './BedroomsSection';
import { SearchButton } from './SearchButton';
import { useSearchBox } from '../../../hooks/useSearchBox';
import type { FiltrosBusqueda } from '../../../hooks/usePropiedadesConFiltros';

interface SearchBoxProps {
  variant: 'desktop' | 'mobile';
  onSearchFilters?: (filters: FiltrosBusqueda) => void;
}

export function SearchBox({ variant, onSearchFilters }: SearchBoxProps) {
  const [
    { ubicacion, habitaciones },
    { 
      handleUbicacionChange,
      handleHabitacionesChange,
      getFiltrosActuales
    }
  ] = useSearchBox();

  const handleSearchClick = () => {
    const filtros = getFiltrosActuales();
    
    // Llamar la función de callback si existe
    if (onSearchFilters) {
      onSearchFilters(filtros);
    }
    
  };

  if (variant === 'desktop') {
    return (
      <div className="w-full bg-transparent">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[22px] border border-black/10 bg-white px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.09)]">
            <div className="flex w-full items-center gap-2">
              <div className="flex min-w-0 flex-1 items-stretch gap-2">
                <div className="min-w-0 flex-[1.1]">
                <DestinationSection
                  variant="desktop"
                  ubicacion={ubicacion}
                  onUbicacionChange={handleUbicacionChange}
                />
              </div>
                <div className="w-px bg-black/10" />
                <div className="flex min-w-[220px] flex-[0.9] items-center justify-start pl-1">
                  <BedroomsSection
                    variant="desktop"
                    habitaciones={habitaciones}
                    onHabitacionesChange={handleHabitacionesChange}
                  />
                </div>
            </div>

            <SearchButton variant="desktop" onClick={handleSearchClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Versión Mobile — tarjeta tipo Airbnb: filas apiladas + CTA ancho completo
  return (
    <div className="w-full max-w-lg mx-auto overflow-visible">
      <div className="rounded-2xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)] divide-y divide-neutral-100">
        <DestinationSection
          variant="mobile"
          ubicacion={ubicacion}
          onUbicacionChange={handleUbicacionChange}
        />
        <BedroomsSection
          variant="mobile"
          habitaciones={habitaciones}
          onHabitacionesChange={handleHabitacionesChange}
        />
        <div className="p-4">
          <SearchButton variant="mobile" onClick={handleSearchClick} />
        </div>
      </div>
    </div>
  );
}


