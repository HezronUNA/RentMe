import { H2, P } from "@/components/ui/Typography";

export default function Plan2() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/45 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/52 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 space-y-2 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Modalidades · Plan 02
          </p>
          <H2 className="max-w-2xl text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
            Promoción en mis plataformas
          </H2>
          <P className="max-w-2xl text-sm text-gray-600 md:hidden">
            Más alcance fuera de Airbnb con respaldo directo.
          </P>
          <P className="hidden max-w-2xl text-sm text-gray-600 md:block md:text-base">
            Para propietarios que buscan mayor alcance y presencia fuera de Airbnb, con respaldo directo.
          </P>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fbfbfa] shadow-[0_12px_30px_rgba(82,101,91,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.08)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f9f9f8] via-white to-[#f6f7f6]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.05),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.6),transparent_42%)]" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#e1e3e1] bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#686f6a] shadow-sm">
                  <span className="text-sm leading-none">02</span>
                  <span className="h-1 w-1 rounded-full bg-[#c7cdca]" />
                  Más popular
                </div>

                <span className="rounded-full border border-[#e1e3e1] bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d746f] shadow-sm">
                  Destacado
                </span>
              </div>

              <div className="mt-8 max-w-2xl space-y-4">
                <h3 className="text-xl leading-tight font-semibold text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-3xl">
                  Promoción en<br />
                  mis plataformas
                </h3>

                <P className="max-w-xl text-sm leading-6 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 md:hidden">
                  Más visibilidad con promoción activa en varios canales.
                </P>
                <P className="hidden max-w-xl text-sm leading-6 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 md:block md:text-base">
                  Mayor alcance y presencia fuera de Airbnb, con respaldo directo y promoción activa.
                </P>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Todo lo incluido en el Plan Coanfitrión",
                  "Promoción en nuestra base de clientes directos",
                  "Difusión activa en redes sociales de DMR Rentals",
                  "Depósito de garantía ante posibles daños",
                  "Responsabilidad directa ante inconvenientes",
                  "Ideal para alojamientos fuera de plataformas",
                ].map((feature, index) => (
                  <div
                    key={feature}
                    className={`${index > 3 ? "hidden md:flex" : "flex"} items-start gap-3 rounded-2xl border border-[#e1e3e1] bg-white/90 px-4 py-3 shadow-[0_8px_20px_rgba(82,101,91,0.04)] backdrop-blur-sm`}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d0d7d3] bg-[#f0f4f2] text-xs font-bold text-[#52655B]">
                      ✓
                    </div>
                    <span className="text-xs leading-5 text-gray-700 md:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d0d7d3] bg-[#f0f4f2] px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#c3cbc7] hover:bg-[#e8ede8]"
                >
                  Consultar este plan
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a807d]">
                  Mejor relación
                </span>
              </div>
            </div>
          </article>

          <aside className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fafafa]/92 p-6 shadow-[0_18px_45px_rgba(82,101,91,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.08)] backdrop-blur-sm md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.04),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.55),transparent_44%)]" />

            <div className="relative space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
                  Lo que incluye
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600 md:hidden">
                  Gestión y promoción para crecer tu visibilidad.
                </p>
                <p className="mt-3 hidden text-sm leading-6 text-gray-600 md:block">
                  Un plan completo que combina gestión profesional con promoción activa en múltiples canales para maximizar tu visibilidad.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  "Gestión integral de propiedades",
                  "Promoción multi-plataforma",
                  "Soporte de clientes directos",
                  "Supervisión de presencia online",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e1e3e1] bg-white/85 px-4 py-3 text-sm font-medium text-[#2f3a35] shadow-[0_8px_20px_rgba(82,101,91,0.03)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-[#fbfbfb] p-5 text-[#2f3a35] shadow-[0_12px_30px_rgba(82,101,91,0.03)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#97a09b]">
                  Ideal para
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Propietarios con presencia en múltiples plataformas que buscan mayor visibilidad y alcance de mercado.
                </p>
              </div>

              <button
                type="button" 
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#d0d7d3] bg-[#f0f4f2] px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#c3cbc7] hover:bg-[#e8ede8]"
              >
                Ver detalle
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
