
import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"
import { useCreateReserve } from "../hooks/useCreateReserve"
import { toast } from 'sonner'

interface ReservationFormProps {
  accommodationId: string
  accommodationName?: string
  pricePerNight: number
  maxGuests: number
}

export function ReservationForm({ 
  accommodationId,
  accommodationName,
  maxGuests 
}: ReservationFormProps) {

  const { createReservation, isLoading } = useCreateReserve({ accommodationName })

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    fechaCheckIn: "",
    fechaCheckOut: "",
    numeroHuespedes: "1",
    mensaje: "",
  })

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Basic client-side validation
    if (!form.fechaCheckIn || !form.fechaCheckOut) {
      toast.error('Seleccione fecha de entrada y salida')
      return
    }

    const start = new Date(form.fechaCheckIn)
    const end = new Date(form.fechaCheckOut)
    if (start >= end) {
      toast.error('La fecha de salida debe ser posterior a la de entrada')
      return
    }

    if (Number(form.numeroHuespedes) > maxGuests) {
      toast.error('El número de huéspedes supera el máximo permitido')
      return
    }

    await createReservation({
      hospedajeId: accommodationId,
      hospedajeNombre: accommodationName,
      nombre: form.nombre,
      email: form.correo,
      telefono: form.telefono,
      fechaCheckIn: form.fechaCheckIn,
      fechaCheckOut: form.fechaCheckOut,
      numeroHuespedes: Number(form.numeroHuespedes),
      mensaje: form.mensaje,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-7 md:p-8 flex flex-col gap-6 w-full"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <Input id="nombre" name="nombre" type="text" value={form.nombre} onChange={onChange} placeholder="Tu nombre" required />
        </div>

        <div>
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <Input id="correo" name="correo" type="email" value={form.correo} onChange={onChange} placeholder="tu@email.com" required />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <Input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={onChange} placeholder="8888-8888" required />
        </div>

        <div>
          <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-gray-700 mb-1">Número de huéspedes</label>
          <select
            id="numeroHuespedes"
            name="numeroHuespedes"
            value={form.numeroHuespedes}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            required
          >
            {Array.from({ length: Math.max(maxGuests, 1) }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fechaCheckIn" className="block text-sm font-medium text-gray-700 mb-1">Fecha de entrada</label>
          <Input id="fechaCheckIn" name="fechaCheckIn" type="date" value={form.fechaCheckIn} onChange={onChange} required />
        </div>

        <div>
          <label htmlFor="fechaCheckOut" className="block text-sm font-medium text-gray-700 mb-1">Fecha de salida</label>
          <Input id="fechaCheckOut" name="fechaCheckOut" type="date" value={form.fechaCheckOut} onChange={onChange} required />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje adicional (opcional)</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={onChange}
            placeholder="Cuéntanos cualquier detalle extra"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="green"
        className="hover:bg-[#435349] py-3"
        disabled={isLoading}
      >
        {isLoading ? "Enviando reserva..." : "Reservar ahora"}
      </Button>
    </form>
  )
}

