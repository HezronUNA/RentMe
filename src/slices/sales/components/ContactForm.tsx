
import { useContactFormLogic } from '../hooks/useContactFormLogic'
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/button"

interface ContactFormProps {
  propertyId: string
  propertyTitle?: string
}

export function ContactForm({ propertyId, propertyTitle }: ContactFormProps) {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    isSubmitted,
    error,
  } = useContactFormLogic(propertyId, propertyTitle)

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
            ¡Mensaje enviado!
          </h3>
          <p className="text-gray-600">
            Gracias por tu interés. Nos pondremos en contacto contigo pronto.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-md p-7 md:p-8 flex flex-col gap-5 w-full"
      onSubmit={handleSubmit}
    >
      {/* Fila 1: Nombre completo y Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ejemplo: Juan Pérez Rodríguez"
            value={form.nombre}
            onChange={handleChange}
            maxLength={100}
            className="w-full"
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Ejemplo: juan@email.com"
            value={form.email}
            onChange={handleChange}
            maxLength={50}
            className="w-full"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Fila 2: Teléfono (campo completo) */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder="Ejemplo: 8888-8888"
          value={form.telefono}
          onChange={handleChange}
          maxLength={15}
          className="w-full"
        />
        {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
      </div>

      {/* Fila 3: Mensaje (textarea) */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje (opcional)
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Cuéntanos más sobre tu interés en esta propiedad..."
          value={form.mensaje}
          onChange={handleChange}
          maxLength={500}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52655B] resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{form.mensaje.length}/500 caracteres</p>
      </div>

      <Button
        type="submit"
        variant="green"
        className="hover:bg-[#435349] py-3"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar"}
      </Button>

      {error && <p className="text-red-600 mt-2">Error: {String(error)}</p>}
    </form>
  )
}

