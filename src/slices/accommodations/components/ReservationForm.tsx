
import { FcGoogle } from "react-icons/fc"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"

interface ReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  maxGuests: number
}

export function ReservationForm({ 
  pricePerNight,
  maxGuests 
}: ReservationFormProps) {
  // Función para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR').format(price);
  };

  return (
    <div
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-7 md:p-8 flex flex-col gap-5 w-full"
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

      {/* Formulario Estático - Solo visualización */}
      <div className="space-y-4">
        <div>
          <label htmlFor="fechaCheckIn" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de entrada
          </label>
          <Input
            id="fechaCheckIn"
            type="date"
            disabled
            className="bg-gray-100 cursor-not-allowed"
            placeholder="Selecciona una fecha"
          />
          <p className="text-gray-500 text-xs mt-1">Función en desarrollo</p>
        </div>

        <div>
          <label htmlFor="fechaCheckOut" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de salida
          </label>
          <Input
            id="fechaCheckOut"
            type="date"
            disabled
            className="bg-gray-100 cursor-not-allowed"
            placeholder="Selecciona una fecha"
          />
          <p className="text-gray-500 text-xs mt-1">Función en desarrollo</p>
        </div>
      </div>

      {/* Número de huéspedes */}
      <div>
        <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-gray-700 mb-1">
          Número de huéspedes
        </label>
        <select
          id="numeroHuespedes"
          disabled
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed`}
        >
          <option>Función en desarrollo</option>
        </select>
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
            disabled
            className="bg-gray-100 cursor-not-allowed"
            placeholder="Función en desarrollo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            disabled
            className="bg-gray-100 cursor-not-allowed"
            placeholder="Función en desarrollo"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <Input
            id="telefono"
            type="tel"
            disabled
            className="bg-gray-100 cursor-not-allowed"
            placeholder="Función en desarrollo"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje adicional (opcional)
          </label>
          <textarea
            id="mensaje"
            disabled
            placeholder="Función en desarrollo"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed resize-none"
          />
        </div>

        {/* Resumen de precios */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Cálculo de precio en desarrollo</p>
            <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
              <span>Precio por noche</span>
              <span>₡{formatPrice(pricePerNight)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4 w-full">
        {/* Botón de Google */}
        <Button
          type="button"
          variant="white"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-3 text-base hover:cursor-not-allowed font-medium shadow-sm bg-gray-100 text-gray-600 opacity-50"
          disabled
        >
          <FcGoogle size={22} />
          Completar con Google (en desarrollo)
        </Button>

        {/* Botón de reserva */}
        <Button
          type="button"
          variant="green"
          className="hover:bg-[#435349] py-3 opacity-50 cursor-not-allowed"
          disabled
        >
          Reservar Ahora (en desarrollo)
        </Button>

        {/* Mensaje informativo */}
        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            🔄 La funcionalidad de reservas se habilitará próximamente
          </p>
        </div>
      </div>
    </div>
  )
}

