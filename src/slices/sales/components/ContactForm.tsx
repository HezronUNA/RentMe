import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { FcGoogle } from "react-icons/fc"
import { Link } from "@tanstack/react-router"
import { useContactFormLogic } from '../hooks/useContactFormLogic'

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
    handleGoogleLogin,
    googleLoading,
    isPending,
    isSubmitted,
    user,
    googleUser,
    resetForm,
  } = useContactFormLogic(propertyId, propertyTitle)

  if (isSubmitted) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl shadow-lg p-6 text-center w-full max-w-xl mx-auto">
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
        <Button 
          onClick={resetForm}
          className="bg-[#52655B] text-white hover:bg-[#3f4f42]"
        >
          Enviar otro mensaje
        </Button>
      </div>
    )
  }

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        Agenda una cita con el propietario
      </h2>
      
      {/* Fila 1: Nombre y Primer Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange('nombre')}
            maxLength={50}
            required
            className="w-full"
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="primerApellido" className="block text-sm font-medium text-gray-700 mb-1">
            Primer apellido
          </label>
          <Input
            id="primerApellido"
            name="primerApellido"
            type="text"
            placeholder="Primer apellido"
            value={form.primerApellido}
            onChange={handleChange('primerApellido')}
            maxLength={50}
            required
            className="w-full"
          />
          {errors.primerApellido && <p className="text-red-600 text-xs mt-1">{errors.primerApellido}</p>}
        </div>
      </div>

      {/* Fila 2: Segundo Apellido y Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700 mb-1">
            Segundo apellido
          </label>
          <Input
            id="segundoApellido"
            name="segundoApellido"
            type="text"
            placeholder="Segundo apellido"
            value={form.segundoApellido}
            onChange={handleChange('segundoApellido')}
            maxLength={50}
            className="w-full"
          />
          {errors.segundoApellido && <p className="text-red-600 text-xs mt-1">{errors.segundoApellido}</p>}
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
            onChange={handleChange('email')}
            maxLength={50}
            disabled={!!user || !!googleUser}
            required
            className="w-full"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Fila 3: Teléfono (campo completo) */}
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
          onChange={handleChange('telefono')}
          maxLength={15}
          required
          className="w-full"
        />
        {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4 w-full">
        {/* Botón de Google */}
        <Button
          type="button"
          variant="white"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 text-base font-medium shadow-sm hover:bg-gray-100"
          onClick={handleGoogleLogin}
          disabled={googleLoading || !!user || !!googleUser}
        >
          <FcGoogle size={22} />
          {googleLoading ? "Cargando..." : "Completar con Google"}
        </Button>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row justify-end gap-4 w-full">
          <Button
            type="submit"
            variant="green"
            className="hover:bg-[#435349] hover:cursor-pointer w-full md:w-auto"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Enviando...
              </div>
            ) : (
              'Enviar'
            )}
          </Button>
          <Link to="/ventas" className="w-full md:w-auto">
            <Button variant="white" className="hover:bg-gray-200 hover:cursor-pointer w-full md:w-auto">
              Cancelar
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}