import type { ModalidadUI } from '@/slices/services/hooks/useModalidadesServicio'

interface ModalidadCardProps {
  modalidad: ModalidadUI
  className?: string
}

interface ServiceListProps {
  titulo: string
  items: string[]
  subtitulo?: string
}

const ServiceList = ({ titulo, items, subtitulo }: ServiceListProps) => {
  if (items.length === 0) return null

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-black text-base font-medium">{titulo}</p>
      {subtitulo && (
        <p className="text-black text-base font-medium">{subtitulo}</p>
      )}
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-zinc-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg 
                className="w-3 h-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <span className="text-black text-sm leading-relaxed tracking-wide flex-1">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ModalidadCard = ({ modalidad, className = "" }: ModalidadCardProps) => {
  const handleReservar = () => {
    // TODO: Implementar lógica de reserva
    console.log(`Reservar modalidad: ${modalidad.titulo}`)
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div 
        className="w-80 h-[700px] px-6 py-6 rounded-xl border border-zinc-300 shadow-sm flex flex-col bg-white hover:shadow-md transition-shadow"
      >
        {/* Header con número y título */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="w-12 h-12 bg-zinc-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {modalidad.index}
            </span>
          </div>
          <h3 className="text-center text-black text-xl font-semibold leading-tight max-w-64 min-h-[3rem] flex items-center">
            {modalidad.titulo}
          </h3>
        </div>

        {/* Botón de reserva */}
        <button 
          onClick={handleReservar}
          className="w-full px-6 py-3 bg-zinc-600 rounded-lg text-white font-medium hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 mt-4 mb-8"
        >
          {modalidad.boton}
        </button>

        {/* Contenido principal - ocupa el espacio restante */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* Servicios incluidos */}
          <ServiceList 
            titulo="Esta modalidad incluye:"
            items={modalidad.incluidos}
          />

          {/* Servicios adicionales */}
          {modalidad.adicionales.length > 0 && (
            <ServiceList 
              titulo={modalidad.id === "3" ? "Además de eso incluye:" : "Servicios adicionales:"}
              items={modalidad.adicionales}
            />
          )}
        </div>
      </div>
    </div>
  )
}