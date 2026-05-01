import { useState } from 'react'
import { toast } from 'sonner'
import { crearReservaVenta } from '../api/reservaVentaService'
import { buildWhatsAppHref, SOCIAL_CONFIG } from '@/utils/socialMediaConfig'

interface UseCreatePropertyReserveProps {
  propertyTitle?: string
}

interface PropertyReserveData {
  propiedadId: string
  nombre: string
  email: string
  telefono: string
  mensaje?: string
}

function buildWhatsappMessage(data: PropertyReserveData, propertyTitle?: string) {
  return [
    'Hola, me interesa esta propiedad en venta.',
    '',
    propertyTitle ? `Propiedad: ${propertyTitle}` : null,
    `Nombre: ${data.nombre}`,
    `Correo: ${data.email}`,
    `Teléfono: ${data.telefono}`,
    data.mensaje ? `Mensaje: ${data.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export const useCreatePropertyReserve = ({ propertyTitle }: UseCreatePropertyReserveProps = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)

  const whatsappPhone =
    SOCIAL_CONFIG.find((entry) => entry.platform === 'whatsapp')?.phone ?? '50683888231'

  const createReservation = async (data: PropertyReserveData) => {
    setIsLoading(true)
    setError(null)

    const loadingToast = toast.loading('Creando reserva...', {
      description: 'Procesando tu solicitud',
    })

    try {
      // Guardar la reserva usando el servicio
      const reservaId = await crearReservaVenta({
        propiedadId: data.propiedadId,
        propiedadTitulo: propertyTitle,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        mensaje: data.mensaje,
        usuarioId: undefined,
      })

      setReservationId(reservaId)

      // Construir mensaje de WhatsApp
      const whatsappMessage = buildWhatsappMessage(data, propertyTitle)
      const whatsappLink = buildWhatsAppHref(whatsappPhone, whatsappMessage)

      toast.dismiss(loadingToast)

      toast.success('¡Reserva creada exitosamente!', {
        description: 'Tu solicitud fue registrada y se abrirá WhatsApp para continuar.',
        duration: 5000,
        style: {
          backgroundColor: '#10B981',
          color: 'white',
          border: '1px solid #059669',
        },
        className: 'text-white',
        action: {
          label: 'Copiar ID',
          onClick: () => {
            navigator.clipboard.writeText(reservaId)
            toast.success('ID copiado al portapapeles', {
              duration: 2000,
            })
          },
        },
      })

      window.open(whatsappLink, '_blank', 'noopener,noreferrer')

      return reservaId
    } catch (err) {
      console.error('Error creando reserva de propiedad:', err)

      toast.dismiss(loadingToast)

      const errorMessage = err instanceof Error ? err.message : 'Error al crear la reserva'
      setError(errorMessage)

      toast.error('Error al crear la reserva', {
        description: errorMessage,
        duration: 5000,
        action: {
          label: 'Reintentar',
          onClick: () => createReservation(data),
        },
      })

      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setError(null)
    setReservationId(null)
    setIsLoading(false)
  }

  return {
    createReservation,
    isLoading,
    error,
    reservationId,
    resetState,
  }
}
