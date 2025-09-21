import { SalesHero } from "./sections/hero/components/SalesHero"
import { PropertiesGrid } from "./components/component"
import { usePropiedadesConFiltros } from "./hooks"

export default function SalesPage() {
  
  const {
    propiedades,
    loading,
    error,
    filtrosActivos,
  } = usePropiedadesConFiltros()

  return (
    <section>
      {/* Hero Section */}
      <SalesHero />
      
      {/* Content Section */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">

          {/* Properties Grid */}
          <PropertiesGrid
            properties={propiedades}
            loading={loading}
            error={error}
            emptyMessage={
              Object.keys(filtrosActivos).length > 0
                ? "No se encontraron propiedades con los filtros aplicados"
                : "No hay propiedades disponibles en este momento"
            }
          />
        </div>
      </div>
    </section>
  )
}
