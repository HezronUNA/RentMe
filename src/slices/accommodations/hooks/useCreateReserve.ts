import { useState } from 'react'
import { toast } from 'sonner'
import { crearReservaHospedaje } from '../api/reservaHospedajeService'
import type { CrearReservaHospedaje } from '../model/accomodationType'
import { buildWhatsAppHref, SOCIAL_CONFIG } from '@/utils/socialMediaConfig'

interface UseCreateReservationProps {
  accommodationName?: string
}

function buildWhatsappMessage(reservationData: CrearReservaHospedaje, accommodationName?: string) {
  const checkIn = typeof reservationData.fechaCheckIn === 'string'
    ? reservationData.fechaCheckIn
    : reservationData.fechaCheckIn.toISOString().split('T')[0]

  const checkOut = typeof reservationData.fechaCheckOut === 'string'
    ? reservationData.fechaCheckOut
    : reservationData.fechaCheckOut.toISOString().split('T')[0]

  return [
    'Hola, quiero reservar este hospedaje.',
    '',
    accommodationName ? `Hospedaje: ${accommodationName}` : null,
    `Nombre: ${reservationData.nombre}`,
    `Correo: ${reservationData.email}`,
    `Teléfono: ${reservationData.telefono}`,
    `Huéspedes: ${reservationData.numeroHuespedes}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    reservationData.mensaje ? `Mensaje: ${reservationData.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export const useCreateReserve = ({ accommodationName }: UseCreateReservationProps = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)

  const whatsappPhone =
    SOCIAL_CONFIG.find((entry) => entry.platform === 'whatsapp')?.phone ?? '50683888231'

  const createReservation = async (reservationData: CrearReservaHospedaje) => {
    setIsLoading(true)
    setError(null)

    const loadingToast = toast.loading('Creando reserva...', {
      description: 'Procesando tu solicitud de reserva',
    })

    try {
      const newReservationId = await crearReservaHospedaje(reservationData)
      setReservationId(newReservationId)

      const whatsappMessage = buildWhatsappMessage(reservationData, accommodationName)
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
            navigator.clipboard.writeText(newReservationId)
            toast.success('ID copiado al portapapeles', {
              duration: 2000,
            })
          },
        },
      })

      window.open(whatsappLink, '_blank', 'noopener,noreferrer')

      return newReservationId
    } catch (err) {
      console.error('Error creando reserva:', err)

      toast.dismiss(loadingToast)

      const errorMessage = err instanceof Error ? err.message : 'Error al crear la reserva'
      setError(errorMessage)

      toast.error('Error al crear la reserva', {
        description: errorMessage,
        duration: 5000,
        action: {
          label: 'Reintentar',
          onClick: () => createReservation(reservationData),
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

