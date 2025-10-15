import { AccommodationsHero } from "./sections/hero/AccommodationsHero"
import { AccommodationsGrid } from "./components/component"
import { useHospedajesConFiltros, type FiltrosBusquedaHospedajes } from "./hooks/useHospedajesConFiltros"

export default function AccommodationsPage() {
  
  const {
    hospedajes,
    loading,
    error,
    filtrosActivos,
    buscarConFiltros,
    tieneFiltrosActivos
  } = useHospedajesConFiltros()

  const handleApplyFilters = (filters: FiltrosBusquedaHospedajes) => {
    buscarConFiltros(filters);
  };

  return (
    <section>
      {/* Hero Section */}
      <AccommodationsHero onApplyFilters={handleApplyFilters} />
      
      {/* Content Section */}
      <div>
        <div className="container mx-auto px-4 py-16 pb-4">
          
          {/* Filtros activos indicator */}
          {tieneFiltrosActivos && (
            <div className="mb-8 p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#52655B' }}>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-3">Filtros aplicados</h3>
                  <div className="flex flex-wrap gap-3">
                    {filtrosActivos.canton && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span>{filtrosActivos.canton}</span>
                      </span>
                    )}
                    {filtrosActivos.camas && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span>{filtrosActivos.camas} cama{filtrosActivos.camas !== 1 ? 's' : ''}</span>
                      </span>
                    )}
                    {filtrosActivos.cuartos && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span>{filtrosActivos.cuartos} cuarto{filtrosActivos.cuartos !== 1 ? 's' : ''}</span>
                      </span>
                    )}
                    {filtrosActivos.baños && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span>{filtrosActivos.baños} baño{filtrosActivos.baños !== 1 ? 's' : ''}</span>
                      </span>
                    )}
                    {(filtrosActivos.precioMin || filtrosActivos.precioMax) && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span>
                          ₡{filtrosActivos.precioMin?.toLocaleString() || '0'} - 
                          ₡{filtrosActivos.precioMax?.toLocaleString() || '∞'}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => buscarConFiltros({})}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md border border-white/30 hover:cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtros
                </button>
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
