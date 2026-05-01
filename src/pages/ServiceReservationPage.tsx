import { Mail, Phone, Send, Sparkles, User, CheckCircle2 } from "lucide-react";
import { useServiceReservationForm } from "@/hooks/useServiceReservationForm";

export default function ServiceReservationPage() {
  const { formData, isSubmitting, errorMessage, onFieldChange, handleSubmit, availableServices } =
    useServiceReservationForm();

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:items-start md:gap-8 md:px-8">
        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(82,101,91,0.12)] md:col-start-1">
          <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#52655B]">
            <span className="h-px w-10 bg-[#52655B]" />
            Solicitar servicio
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-[#0f2545] sm:text-5xl">
            Empecemos
            <br />
            juntos
          </h1>

          <p className="mt-5 max-w-md text-lg text-slate-600">
            Estas a un paso de reservar con Rent Me. Completá el formulario y te contactamos por
            WhatsApp.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="rounded-lg bg-[#52655B]/10 p-2 text-[#52655B]">
                <Send className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[#0f2545]">Respuesta en 24 horas</p>
                <p className="text-sm text-slate-600">Te contactamos rapido por WhatsApp.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="rounded-lg bg-[#52655B]/10 p-2 text-[#52655B]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[#0f2545]">Asesoria personalizada</p>
                <p className="text-sm text-slate-600">Ajustamos el servicio a lo que necesitás.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="rounded-lg bg-[#52655B]/10 p-2 text-[#52655B]">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[#0f2545]">Calidad garantizada</p>
                <p className="text-sm text-slate-600">Experiencia y profesionalismo en cada gestion.</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="md:col-start-2 md:row-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,37,69,0.12)]"
          >
            <h2 className="text-3xl font-semibold text-[#0f2545]">Completá tus datos</h2>
            <p className="mt-2 text-slate-600">Nos pondremos en contacto para coordinar los detalles.</p>

            <div className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f2545]">
                  <User className="h-4 w-4" /> Nombre completo
                </span>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={onFieldChange("nombre")}
                  placeholder="Juan Perez"
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-800 outline-none transition focus:border-[#52655B]"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f2545]">
                  <Mail className="h-4 w-4" /> Correo electronico
                </span>
                <input
                  type="email"
                  required
                  value={formData.correo}
                  onChange={onFieldChange("correo")}
                  placeholder="juan@email.com"
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-800 outline-none transition focus:border-[#52655B]"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f2545]">
                  <Phone className="h-4 w-4" /> Numero de telefono
                </span>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={onFieldChange("telefono")}
                  placeholder="+506 1234-5678"
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-800 outline-none transition focus:border-[#52655B]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0f2545]">Servicio de interes</span>
                <select
                  required
                  value={formData.servicio}
                  onChange={onFieldChange("servicio")}
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-800 outline-none transition focus:border-[#52655B]"
                >
                  <option value="" disabled>
                    Seleccioná un servicio
                  </option>
                  {availableServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#0f2545]">Contanos mas (opcional)</span>
                <textarea
                  rows={4}
                  value={formData.mensaje}
                  onChange={onFieldChange("mensaje")}
                  placeholder="Detalles sobre tu propiedad o consulta..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-[#52655B]"
                />
              </label>

              {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-xl bg-[#52655B] px-6 text-base font-semibold text-white transition hover:bg-[#445349] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud"}
              </button>

              <p className="text-center text-xs text-slate-500">
                Al enviar, aceptás que te contactemos para brindarte informacion.
              </p>
            </div>
          </form>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-[#52655B] to-[#6f8078] p-6 text-white shadow-[0_16px_36px_rgba(43,66,57,0.34)] md:col-start-1">
          <p className="text-xs uppercase tracking-[0.18em] text-white/80">Lo que sigue</p>
          <h3 className="mt-2 text-xl font-semibold">Tu solicitud se procesa de inmediato</h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-xs text-white/80">Tiempo de respuesta</p>
              <p className="mt-1 text-sm font-semibold">Menos de 24 horas</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-xs text-white/80">Canal principal</p>
              <p className="mt-1 text-sm font-semibold">WhatsApp directo</p>
            </div>
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <p className="text-xs text-white/80">Primera gestion</p>
              <p className="mt-1 text-sm font-semibold">Diagnostico sin costo</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-white/90">
            Revisamos tu necesidad y coordinamos la siguiente
            accion sin complicaciones.
          </p>
        </div>
      </div>
    </section>
  );
}
