import { AccommodationsHero } from "./sections/hero/AccommodationsHero"
import { AccommodationSearchBox } from "./sections/hero/components/AccommodationSearchBox"
import { AccommodationsGrid } from "./components/component"
import type { AccommodationSearchFilters } from "./sections/hero/components/AccommodationSearchBox"
import { useHospedajesConFiltros, type FiltrosBusquedaHospedajes } from "./hooks/useHospedajesConFiltros"

export default function AccommodationsPage() {
  
  const {
    hospedajes,
    loading,
    error,
    filtrosActivos,
    buscarConFiltros,
    tieneFiltrosActivos,
    limpiarFiltros
  } = useHospedajesConFiltros()

  const handleApplyFilters = (filters: FiltrosBusquedaHospedajes) => {
    buscarConFiltros(filters);
  };

  const handleAccommodationSearchFilters = (filters: AccommodationSearchFilters) => {
    const filtrosConvertidos: FiltrosBusquedaHospedajes = {}

    if (filters.destino && filters.destino.trim()) {
      filtrosConvertidos.canton = filters.destino.trim()
    }

    if (filters.huespedes && filters.huespedes > 0) {
      filtrosConvertidos.huespedes = filters.huespedes
    }

    handleApplyFilters(filtrosConvertidos)
  }

  return (
    <section>
      {/* Hero Section */}
      <AccommodationsHero onApplyFilters={handleApplyFilters} />
      
      {/* Content Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
          <div className="absolute left-[-14rem] top-16 h-[42rem] w-[42rem] rounded-full bg-[#e7eee9]/75 blur-[110px]" />
          <div className="absolute right-[-14rem] bottom-[-10rem] h-[44rem] w-[44rem] rounded-full bg-[#f1e8dc]/80 blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 pb-4">
          <div className="mb-8 hidden lg:block">
            <AccommodationSearchBox variant="desktop" onSearchFilters={handleAccommodationSearchFilters} />
          </div>
            <div className="mb-4 lg:hidden" />

          {/* Filtros activos indicator */}
          {tieneFiltrosActivos && (
            <div className="mb-8 max-w-7xl mx-auto rounded-2xl border border-[#52655B]/10 bg-white/85 px-4 py-3 shadow-[0_16px_40px_rgba(82,101,91,0.08)] backdrop-blur-md transition-all duration-300">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <div className="min-w-0 text-neutral-900">
                    <p className="text-xs sm:text-sm font-medium text-neutral-700">
                      Se encontraron <span className="font-semibold text-neutral-900">{hospedajes.length}</span> alojamientos
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#52655B]/10 bg-[#52655B]/8 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#52655B] shadow-sm transition-all duration-200 hover:bg-[#52655B]/12">
                      Filtros
                    </span>

                    {filtrosActivos.canton && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:bg-[#52655B]/15">
                        <span className="truncate">{filtrosActivos.canton}</span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ precioMin: filtrosActivos.precioMin, precioMax: filtrosActivos.precioMax, cuartos: filtrosActivos.cuartos, huespedes: filtrosActivos.huespedes })}
                          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de ubicación"
                        >
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}

                    {(filtrosActivos.precioMin || filtrosActivos.precioMax) && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:bg-[#52655B]/15">
                        <span>
                          ₡{filtrosActivos.precioMin?.toLocaleString() || '0'} - {filtrosActivos.precioMax ? `₡${filtrosActivos.precioMax.toLocaleString()}` : 'Sin límite'}
                        </span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ canton: filtrosActivos.canton, cuartos: filtrosActivos.cuartos, huespedes: filtrosActivos.huespedes })}
                          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de precio"
                        >
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end lg:shrink-0">
                  <button
                    type="button"
                    onClick={limpiarFiltros}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#52655B]/15 bg-white text-[#52655B] shadow-sm transition-all duration-200 hover:bg-[#52655B]/5 hover:shadow-md"
                    aria-label="Limpiar todos los filtros"
                    title="Limpiar todos los filtros"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Accommodations Grid */}
          <AccommodationsGrid
            accommodations={hospedajes}
            loading={loading}
            error={error?.message || null}
            emptyMessage={
              tieneFiltrosActivos
                ? "No se encontraron hospedajes con los filtros aplicados"
                : "No hay hospedajes disponibles en este momento"
            }
          />
        </div>
      </div>
   
    </section>
  )
}


