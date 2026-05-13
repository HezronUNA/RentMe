import { SalesHero } from "./sections/hero/components/SalesHero"
import { PropertiesGrid } from "./components/component"
import { usePropiedadesConFiltros, type FiltrosBusqueda } from "./hooks"

export default function SalesPage() {
  
  const {
    propiedades,
    loading,
    error,
    filtrosActivos,
    buscarConFiltros,
    tieneFiltrosActivos
  } = usePropiedadesConFiltros()

  const handleApplyFilters = (filters: FiltrosBusqueda) => {
    buscarConFiltros(filters);
  };

  return (
    <section>
      {/* Hero Section */}
      <SalesHero onApplyFilters={handleApplyFilters} />
      
      {/* Content Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-15rem] top-16 h-[42rem] w-[42rem] rounded-full bg-[#e7eee9]/75 blur-[110px]" />
          <div className="absolute right-[-14rem] bottom-[-10rem] h-[46rem] w-[46rem] rounded-full bg-[#f1e8dc]/80 blur-[120px]" />
          <div className="absolute left-[-8rem] bottom-[6rem] h-[24rem] w-[24rem] rounded-full bg-[#dbe9e2]/45 blur-[90px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 pb-4">
          
          {/* Filtros activos indicator */}
          {tieneFiltrosActivos && (
            <div className="mb-8 rounded-[1.5rem] border border-black/5 bg-white/90 p-4 shadow-[0_12px_32px_rgba(16,24,40,0.08)] backdrop-blur-md transition-all duration-300">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <div className="min-w-0 text-neutral-900">
                    <p className="text-sm font-medium text-neutral-700">
                      Se encontraron <span className="font-semibold text-neutral-900">{propiedades.length}</span> propiedades
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#52655B]/10 bg-[#52655B]/8 px-4 py-2 text-sm font-medium text-[#52655B] shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#52655B]/12">
                      Filtros
                    </span>

                    {filtrosActivos.canton && (
                      <span className="inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-4 py-2 text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:scale-105 hover:bg-[#52655B]/15">
                        <span className="truncate">{filtrosActivos.canton}</span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ habitaciones: filtrosActivos.habitaciones, baños: filtrosActivos.baños, precioMin: filtrosActivos.precioMin, precioMax: filtrosActivos.precioMax, estado: filtrosActivos.estado })}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de ubicación"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}

                    {filtrosActivos.habitaciones && (
                      <span className="inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-4 py-2 text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:scale-105 hover:bg-[#52655B]/15">
                        <span>{filtrosActivos.habitaciones} habitacion{filtrosActivos.habitaciones !== 1 ? 'es' : ''}</span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ canton: filtrosActivos.canton, baños: filtrosActivos.baños, precioMin: filtrosActivos.precioMin, precioMax: filtrosActivos.precioMax, estado: filtrosActivos.estado })}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de habitaciones"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}

                    {filtrosActivos.baños && (
                      <span className="inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-4 py-2 text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:scale-105 hover:bg-[#52655B]/15">
                        <span>{filtrosActivos.baños} baño{filtrosActivos.baños !== 1 ? 's' : ''}</span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ canton: filtrosActivos.canton, habitaciones: filtrosActivos.habitaciones, precioMin: filtrosActivos.precioMin, precioMax: filtrosActivos.precioMax, estado: filtrosActivos.estado })}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de baños"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}

                    {(filtrosActivos.precioMin || filtrosActivos.precioMax) && (
                      <span className="inline-flex items-center gap-3 rounded-full border border-[#52655B]/15 bg-[#52655B]/10 px-4 py-2 text-sm font-medium text-[#52655B] ring-1 ring-[#52655B]/15 transition-all duration-200 hover:scale-105 hover:bg-[#52655B]/15">
                        <span>
                          ₡{filtrosActivos.precioMin?.toLocaleString() || '0'} - {filtrosActivos.precioMax ? `₡${filtrosActivos.precioMax.toLocaleString()}` : 'Sin límite'}
                        </span>
                        <button
                          type="button"
                          onClick={() => buscarConFiltros({ canton: filtrosActivos.canton, habitaciones: filtrosActivos.habitaciones, baños: filtrosActivos.baños, estado: filtrosActivos.estado })}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#52655B] transition-all duration-200 hover:bg-white/70 hover:shadow-sm"
                          aria-label="Quitar filtro de precio"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Properties Grid */}
          <PropertiesGrid
            properties={propiedades}
            loading={loading}
            error={error}
            emptyMessage={
              tieneFiltrosActivos
                ? "No se encontraron propiedades con los filtros aplicados"
                : "No hay propiedades disponibles en este momento"
            }
          />
        </div>
      </div>
    </section>
  )
}


