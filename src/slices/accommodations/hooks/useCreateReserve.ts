import { useState } from 'react'
import { toast } from 'sonner'
import { crearReservaHospedaje } from '../api/reservaHospedajeService'
import { sanitizeForStorage } from '@/utils/sanitize'
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
      // Sanitize reservation data before sending
      const safeData = {
        ...reservationData,
        nombre: sanitizeForStorage((reservationData as any).nombre) ?? undefined,
        email: sanitizeForStorage((reservationData as any).email) ?? undefined,
        telefono: sanitizeForStorage((reservationData as any).telefono) ?? undefined,
        mensaje: sanitizeForStorage((reservationData as any).mensaje) ?? undefined,
      }

      const newReservationId = await crearReservaHospedaje(safeData as any)
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

      let errorMessage = err instanceof Error ? err.message : 'Error al crear la reserva'
      let isRateLimit = false

      if (typeof errorMessage === 'string' && errorMessage.includes('rate_limit_exceeded')) {
        isRateLimit = true
        errorMessage = 'Demasiadas solicitudes. Por favor espera un minuto antes de intentar de nuevo.'
      }

      setError(errorMessage)

      toast.error(isRateLimit ? '⏱️ Límite de solicitudes' : 'Error al crear la reserva', {
        description: errorMessage,
        duration: isRateLimit ? 6000 : 5000,
        action: isRateLimit ? undefined : {
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

