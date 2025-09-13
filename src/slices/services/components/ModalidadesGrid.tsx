import { useModalidadesServicio } from '@/slices/services/hooks/useModalidadesServicio'
import { ModalidadCard } from './ModalidadCard'

interface ModalidadesGridProps {
  className?: string
}

export const ModalidadesGrid = ({ className = "" }: ModalidadesGridProps) => {
  const { modalidades, loading, error, refetch } = useModalidadesServicio()

  if (loading) {
    return (
      <div className={`w-full min-h-[400px] flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-600 rounded-full animate-spin" />
          <p className="text-zinc-600 text-lg font-medium">Cargando modalidades de servicio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`w-full min-h-[400px] flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-red-700">Error al cargar</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  if (modalidades.length === 0) {
    return (
      <div className={`w-full min-h-[400px] flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
            <span className="text-zinc-400 text-xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-700">No hay modalidades disponibles</h3>
          <p className="text-zinc-500 text-sm">No se encontraron modalidades de servicio configuradas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Grid de las 3 modalidades con mejor espaciado */}
      <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12 xl:gap-16 px-4">
        {modalidades.slice(0, 3).map((modalidad) => (
          <ModalidadCard
            key={modalidad.id}
            modalidad={modalidad}
          />
        ))}
      </div>
    </div>
  )
}