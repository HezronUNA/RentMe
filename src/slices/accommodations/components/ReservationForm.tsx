import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { FcGoogle } from "react-icons/fc"
import { useAccomodationForm } from '../hooks/useAccomodationForm'
import { useCalendar } from '../hooks/useCalendar'
import { Calendar } from './Calendar'
import type { CrearReservaHospedaje } from '../type'

interface ReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  maxGuests: number
  onSubmit: (reservationData: CrearReservaHospedaje) => Promise<void>
}

export function ReservationForm({ 
  accommodationId, 
  accommodationName, 
  pricePerNight,
  maxGuests 
}: ReservationFormProps) {
  const {
    form,
    errors,
    isPending,
    isSubmitted,
    googleLoading,
    user,
    googleUser,
    nights,
    totalPrice,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
    handleCancel,
    formatPrice,
    getGuestOptions
  } = useAccomodationForm({
    accommodationId,
    accommodationName,
    pricePerNight,
    maxGuests
  })

  // Hook del calendario
  const calendar = useCalendar({
    hospedajeId: accommodationId
  })

  // Estado de éxito
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
            <p>Total: ₡{formatPrice(totalPrice)}</p>
            <p>Noches: {nights}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-7 md:p-8 flex flex-col gap-5 w-full"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Reservar Hospedaje
        </h3>
        <p className="text-gray-600 text-sm">
          ₡{formatPrice(pricePerNight)} por noche
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Máximo {maxGuests} {maxGuests === 1 ? 'huésped' : 'huéspedes'}
        </p>
      </div>

      {/* Calendario de disponibilidad */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Selecciona tus fechas
        </h4>
        {calendar.isLoading ? (
          <div className="flex justify-center items-center p-8 bg-gray-50 rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Cargando calendario...</span>
          </div>
        ) : calendar.error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">
              Error al cargar el calendario: {calendar.error}
            </p>
          </div>
        ) : (
          <Calendar
            availableDates={calendar.availableDates}
            minDate={new Date().toISOString().split('T')[0]}
          />
        )}
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fechaCheckIn" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de entrada
          </label>
          <Input
            id="fechaCheckIn"
            type="date"
            name="fechaCheckIn"
            value={form.fechaCheckIn}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={errors.fechaCheckIn ? 'border-red-500' : ''}
          />
          {errors.fechaCheckIn && (
            <p className="text-red-500 text-xs mt-1">{errors.fechaCheckIn}</p>
          )}
        </div>

        <div>
          <label htmlFor="fechaCheckOut" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de salida
          </label>
          <Input
            id="fechaCheckOut"
            type="date"
            name="fechaCheckOut"
            value={form.fechaCheckOut}
            onChange={handleChange}
            min={form.fechaCheckIn || new Date().toISOString().split('T')[0]}
            className={errors.fechaCheckOut ? 'border-red-500' : ''}
          />
          {errors.fechaCheckOut && (
            <p className="text-red-500 text-xs mt-1">{errors.fechaCheckOut}</p>
          )}
        </div>
      </div>

      {/* Número de huéspedes */}
      <div>
        <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-gray-700 mb-1">
          Número de huéspedes
        </label>
        <select
          id="numeroHuespedes"
          name="numeroHuespedes"
          value={form.numeroHuespedes}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.numeroHuespedes ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {getGuestOptions().map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Huésped' : 'Huéspedes'}
            </option>
          ))}
        </select>
        {errors.numeroHuespedes && (
          <p className="text-red-500 text-xs mt-1">{errors.numeroHuespedes}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Esta propiedad puede alojar hasta {maxGuests} {maxGuests === 1 ? 'persona' : 'personas'}
        </p>
      </div>
      {/* Datos personales */}
      <div className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <Input
            id="nombre"
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ejemplo: Juan Pérez Rodríguez"
            maxLength={100}
            className={errors.nombre ? 'border-red-500' : ''}
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ejemplo: juan@email.com"
            maxLength={50}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <Input
            id="telefono"
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ejemplo: 8888-8888"
            maxLength={15}
            className={errors.telefono ? 'border-red-500' : ''}
          />
          {errors.telefono && (
            <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje adicional (opcional)
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Cualquier solicitud especial o pregunta..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
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
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4 w-full">
        {/* Botón de Google */}
        <Button
          type="button"
          variant="white"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-3 text-base hover:cursor-pointer font-medium shadow-sm hover:bg-gray-100"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
        >
          <FcGoogle size={22} />
          {googleLoading 
            ? "Cargando..." 
            : user || googleUser 
            ? "Cambiar cuenta de Google" 
            : "Completar con Google"
          }
        </Button>

        {/* Error de Google */}
        {errors.google && (
          <p className="text-red-500 text-xs text-center">{errors.google}</p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col justify-end sm:flex-row gap-3">
          <Button
            type="submit"
            variant="green"
            className="hover:bg-[#435349] hover:cursor-pointer w-full md:w-auto py-3"
            disabled
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Enviando...
              </div>
            ) : (
              'Reservar Ahora'
            )}
          </Button>

          <Button 
            type="button"
            variant="white" 
            className="hover:bg-gray-200 hover:cursor-pointer py-3"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>

      {/* Error de envío */}
      {errors.submit && (
        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
      )}
    </form>
  )
}