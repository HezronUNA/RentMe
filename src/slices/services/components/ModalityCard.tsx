import type { ModalidadProcesada, ServicioItem } from '../hooks/useModalidadesServicio'

interface ModalityCardProps {
  modalidad: ModalidadProcesada
  className?: string
}

interface ServiceListItemProps {
  servicio: ServicioItem
}

const ServiceListItem = ({ servicio }: ServiceListItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <div className="w-6 h-6 bg-zinc-600 rounded-sm flex-shrink-0" />
      <span className="text-black text-base leading-relaxed">
        {servicio.nombre}
      </span>
    </li>
  )
}

interface ServiceSectionProps {
  titulo: string
  servicios: ServicioItem[]
}

const ServiceSection = ({ titulo, servicios }: ServiceSectionProps) => {
  if (servicios.length === 0) return null

  return (
    <div className="w-full flex flex-col gap-3.5">
      <p className="text-black text-base font-medium">{titulo}</p>
      <ul className="flex flex-col gap-3.5">
        {servicios.map((servicio, index) => (
          <ServiceListItem key={index} servicio={servicio} />
        ))}
      </ul>
    </div>
  )
}

export const ModalityCard = ({ modalidad, className = "" }: ModalityCardProps) => {
  const handleReservar = () => {
    // TODO: Implementar lógica de reserva
    console.log(`Reservar modalidad: ${modalidad.titulo}`)
  }

  return (
    <div 
      className={`w-72 px-3.5 py-6 rounded-[10px] outline-1 outline-offset-[-1px] outline-zinc-600 flex flex-col items-center gap-7 bg-white ${className}`}
    >
      {/* Header con número y título */}
      <div className="flex flex-col items-center gap-3.5">
        <div className="w-9 h-9 p-2.5 bg-zinc-600 rounded-full flex justify-center items-center">
          <span className="text-white text-xl font-bold">
            {modalidad.numero}
          </span>
        </div>
        <h3 className="text-center text-black text-xl font-medium leading-tight">
          {modalidad.titulo}
        </h3>
      </div>

      {/* Botón de reserva */}
      <button 
        onClick={handleReservar}
        className="w-full px-3.5 py-2.5 bg-zinc-600 rounded text-white text-base font-medium hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
      >
        {modalidad.textoBoton}
      </button>

      {/* Servicios incluidos */}
      <ServiceSection 
        titulo="Esta modalidad incluye:"
        servicios={modalidad.serviciosIncluidos}
      />

      {/* Servicios adicionales (si existen) */}
      {modalidad.serviciosAdicionales.length > 0 && (
        <ServiceSection 
          titulo="Servicios adicionales:"
          servicios={modalidad.serviciosAdicionales}
        />
      )}
    </div>
  )
}