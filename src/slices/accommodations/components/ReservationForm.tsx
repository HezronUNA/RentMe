import { useState } from 'react'
import { Button } from '@/shared/components/button'
import { Input } from '@/shared/components/Input'
import type { CrearReservaHospedaje } from '../type'

interface ReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  onSubmit: (reservationData: CrearReservaHospedaje) => Promise<void>
}

export function ReservationForm({ 
  accommodationId, 
  accommodationName, 
  pricePerNight,
  onSubmit 
}: ReservationFormProps) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaCheckIn: '',
    fechaCheckOut: '',
    numeroHuespedes: 1,
    mensaje: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPending, setIsPending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const calculateTotalPrice = () => {
    if (!form.fechaCheckIn || !form.fechaCheckOut) return 0
    
    const checkIn = new Date(form.fechaCheckIn)
    const checkOut = new Date(form.fechaCheckOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    return nights > 0 ? nights * pricePerNight : 0
  }

  const calculateNights = () => {
    if (!form.fechaCheckIn || !form.fechaCheckOut) return 0
    
    const checkIn = new Date(form.fechaCheckIn)
    const checkOut = new Date(form.fechaCheckOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    return nights > 0 ? nights : 0
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'numeroHuespedes' ? parseInt(value) : value
    }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!form.email.trim()) newErrors.email = 'El email es requerido'
    if (!form.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
    if (!form.fechaCheckIn) newErrors.fechaCheckIn = 'La fecha de check-in es requerida'
    if (!form.fechaCheckOut) newErrors.fechaCheckOut = 'La fecha de check-out es requerida'
    if (form.numeroHuespedes < 1) newErrors.numeroHuespedes = 'Debe ser al menos 1 huésped'

    // Validar que la fecha de check-out sea después del check-in
    if (form.fechaCheckIn && form.fechaCheckOut) {
      const checkIn = new Date(form.fechaCheckIn)
      const checkOut = new Date(form.fechaCheckOut)
      if (checkOut <= checkIn) {
        newErrors.fechaCheckOut = 'La fecha de check-out debe ser después del check-in'
      }
    }

    // Validar que las fechas sean futuras
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (form.fechaCheckIn && new Date(form.fechaCheckIn) < today) {
      newErrors.fechaCheckIn = 'La fecha de check-in debe ser hoy o en el futuro'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsPending(true)

    try {
      const reservationData: CrearReservaHospedaje = {
        hospedajeId: accommodationId,
        hospedajeNombre: accommodationName,
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        fechaCheckIn: new Date(form.fechaCheckIn),
        fechaCheckOut: new Date(form.fechaCheckOut),
        numeroHuespedes: form.numeroHuespedes,
        mensaje: form.mensaje
      }

      await onSubmit(reservationData)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error al crear la reserva:', error)
      setErrors({ submit: 'Error al enviar la reserva. Intenta nuevamente.' })
    } finally {
      setIsPending(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl shadow-md p-8 text-center w-full">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¡Reserva enviada!
          </h3>
          <p className="text-gray-600 mb-4">
            Gracias por tu reserva. Te contactaremos pronto para confirmar los detalles.
          </p>
          <div className="text-sm text-gray-500">
            <p>Total: ₡{formatPrice(calculateTotalPrice())}</p>
            <p>Noches: {calculateNights()}</p>
          </div>
        </div>
      </div>
    )
  }

  const nights = calculateNights()
  const totalPrice = calculateTotalPrice()

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-7 md:p-8 flex flex-col gap-5 w-full"
      onSubmit={handleSubmit}
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Reservar Hospedaje
        </h3>
        <p className="text-gray-600 text-sm">
          ₡{formatPrice(pricePerNight)} por noche
        </p>
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            type="date"
            name="fechaCheckIn"
            value={form.fechaCheckIn}
            onChange={handleChange}
            placeholder="Check-in"
            min={new Date().toISOString().split('T')[0]}
            className={errors.fechaCheckIn ? 'border-red-500' : ''}
          />
          {errors.fechaCheckIn && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaCheckIn}</p>
          )}
        </div>

        <div>
          <Input
            type="date"
            name="fechaCheckOut"
            value={form.fechaCheckOut}
            onChange={handleChange}
            placeholder="Check-out"
            min={form.fechaCheckIn || new Date().toISOString().split('T')[0]}
            className={errors.fechaCheckOut ? 'border-red-500' : ''}
          />
          {errors.fechaCheckOut && (
            <p className="text-red-500 text-sm mt-1">{errors.fechaCheckOut}</p>
          )}
        </div>
      </div>

      {/* Número de huéspedes */}
      <div>
        <select
          name="numeroHuespedes"
          value={form.numeroHuespedes}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
            </option>
          ))}
        </select>
        {errors.numeroHuespedes && (
          <p className="text-red-500 text-sm mt-1">{errors.numeroHuespedes}</p>
        )}
      </div>

      {/* Resumen de precio */}
      {nights > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>₡{formatPrice(pricePerNight)} x {nights} {nights === 1 ? 'noche' : 'noches'}</span>
            <span>₡{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
            <span>Total</span>
            <span>₡{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Datos personales */}
      <div className="space-y-4">
        <Input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          className={errors.nombre ? 'border-red-500' : ''}
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
        )}

        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}

        <Input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className={errors.telefono ? 'border-red-500' : ''}
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
        )}

        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Mensaje adicional (opcional)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {errors.submit && (
        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
      )}

      <Button
        type="submit"
        disabled={isPending || nights <= 0}
        className="w-full"
        variant="white"
      >
        {isPending ? 'Enviando...' : 'Reservar Ahora'}
      </Button>
    </form>
  )
}