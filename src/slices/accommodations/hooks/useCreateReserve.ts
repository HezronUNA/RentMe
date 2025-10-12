import { useState } from 'react'
import { toast } from 'sonner'
import { crearReservaHospedaje } from '../api/reservaHospedajeService'
import type { CrearReservaHospedaje } from '../type'

interface UseCreateReservationProps {
  pricePerNight: number
}

export const useCreateReserve = ({ pricePerNight }: UseCreateReservationProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reservationId, setReservationId] = useState<string | null>(null)

  const createReservation = async (reservationData: CrearReservaHospedaje) => {
    setIsLoading(true)
    setError(null)

    // Toast de carga
    const loadingToast = toast.loading('Creando reserva...', {
      description: 'Procesando tu solicitud de reserva',
    })

    try {
      // Crear la reserva en Firebase
      console.log('Creando reserva en Firebase...', reservationData)
      const newReservationId = await crearReservaHospedaje(reservationData, pricePerNight)
      
      console.log('Reserva creada con ID:', newReservationId)
      setReservationId(newReservationId)

      // Dismiss loading toast
      toast.dismiss(loadingToast)

      // Toast de éxito
      toast.success('¡Reserva creada exitosamente!', {
        description: `Tu solicitud de reserva ha sido registrada`,
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

      return newReservationId

    } catch (err: any) {
      console.error('Error creando reserva:', err)
      
      toast.dismiss(loadingToast)
      
      const errorMessage = err.message || 'Error al crear la reserva'
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
    resetState
  }
}