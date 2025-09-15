import { Button } from "@/shared/components/Button";
import { Link } from "@tanstack/react-router";
import { Input } from "@/shared/components/Input";

import { useLogicFormService } from "@/slices/services/hooks/useLogicFormService";


export function ServiceReservationForm() {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    isError,
    error,
    user,
  } = useLogicFormService();

  return (
    <form
      className="bg-white border border-zinc-200 rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-xl mx-auto"
  onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        Solicita más información sobre este servicio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <Input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ejemplo: Juan Pérez"
            maxLength={50}
          />
          {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <Input
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ejemplo: 8888-8888"
            maxLength={15}
          />
          {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
        </div>
      </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ejemplo: juan@email.com"
            disabled={!!user}
            maxLength={50}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
      <div>
        <label htmlFor="detalle" className="block text-sm font-medium text-gray-700 mb-1">
          Detalle de reservación
        </label>
        <textarea
          id="detalle"
          name="detalle"
          value={form.detalle}
          onChange={handleChange}
          placeholder="Ejemplo: Quiero reservar para el mes de octubre"
          maxLength={200}
          rows={3}
          className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[48px] max-h-40"
        />
        {errors.detalle && <p className="text-red-600 text-xs mt-1">{errors.detalle}</p>}
      </div>
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          variant="green"
          className="hover:bg-[#435349] hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Enviando..." : "Solicitar"}
        </Button>
        <Link to="/servicios">
          <Button variant="white" className="hover:bg-gray-200 hover:cursor-pointer">
            Cancelar
          </Button>
        </Link>
      </div>
      {isError && <p className="text-red-600 mt-2">Error: {String(error)}</p>}
    </form>
  );
}