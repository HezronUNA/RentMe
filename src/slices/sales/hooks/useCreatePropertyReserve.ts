import { useState } from 'react'
import { toast } from 'sonner'
import { crearReservaVenta } from '../api/reservaVentaService'
import { sanitizeForStorage } from '@/utils/sanitize'
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

const SALES_RATE_LIMIT_WINDOW_MS = 60_000

function getSalesCooldownKey(email: string, telefono: string, propiedadId: string) {
  return `sales-reserve-last-send:${propiedadId}:${email.toLowerCase()}:${telefono}`
}

function getRemainingCooldownMs(key: string) {
  const lastSentAtRaw = localStorage.getItem(key)
  if (!lastSentAtRaw) return 0

  const lastSentAt = Number(lastSentAtRaw)
  if (!Number.isFinite(lastSentAt)) return 0

  const elapsed = Date.now() - lastSentAt
  return Math.max(0, SALES_RATE_LIMIT_WINDOW_MS - elapsed)
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
    const email = sanitizeForStorage(data.email) ?? ''
    const telefono = sanitizeForStorage(data.telefono) ?? ''
    const cooldownKey = getSalesCooldownKey(email, telefono, data.propiedadId)
    const remainingCooldownMs = getRemainingCooldownMs(cooldownKey)

    if (remainingCooldownMs > 0) {
      const remainingSeconds = Math.ceil(remainingCooldownMs / 1000)
      const message = `Debes esperar ${remainingSeconds} segundos antes de volver a enviar.`
      setError(message)
      toast.error('⏱️ Límite de solicitudes', {
        description: message,
        duration: 5000,
      })
      throw new Error('rate_limit_exceeded: client_cooldown_active')
    }

    setIsLoading(true)
    setError(null)

    const loadingToast = toast.loading('Creando reserva...', {
      description: 'Procesando tu solicitud',
    })

    try {
      // Guardar la reserva usando el servicio
      const safePayload = {
        propiedadId: data.propiedadId,
        propiedadTitulo: propertyTitle,
        nombre: sanitizeForStorage(data.nombre) ?? '',
        email,
        telefono,
        mensaje: sanitizeForStorage(data.mensaje) ?? null,
        usuarioId: undefined,
      }

      const reservaId = await crearReservaVenta(safePayload as any)

      localStorage.setItem(cooldownKey, Date.now().toString())

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
