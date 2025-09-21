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
    console.log('Aplicando filtros desde SearchBox:', filters);
    buscarConFiltros(filters);
  };

  return (
    <section>
      {/* Hero Section */}
      <SalesHero onApplyFilters={handleApplyFilters} />
      
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
                        <span className="text-lg">📍</span>
                        <span>{filtrosActivos.canton}</span>
                      </span>
                    )}
                    {filtrosActivos.habitaciones && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span className="text-lg">🛏️</span>
                        <span>{filtrosActivos.habitaciones} habitacion{filtrosActivos.habitaciones !== 1 ? 'es' : ''}</span>
                      </span>
                    )}
                    {filtrosActivos.baños && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span className="text-lg">🚿</span>
                        <span>{filtrosActivos.baños} baño{filtrosActivos.baños !== 1 ? 's' : ''}</span>
                      </span>
                    )}
                    {(filtrosActivos.precioMin || filtrosActivos.precioMax) && (
                      <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                        <span className="text-lg">💰</span>
                        <span>
                          ${filtrosActivos.precioMin?.toLocaleString() || '0'} - 
                          ${filtrosActivos.precioMax?.toLocaleString() || '∞'}
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
