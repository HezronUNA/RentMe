import { H2, P } from "@/components/ui/Typography";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Plan3() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const updateMatches = () => setIsDesktop(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/45 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/52 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 space-y-2 text-center md:mb-10 md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Modalidades · Plan 03
          </p>
          <H2 className="mx-auto max-w-2xl text-2xl leading-tight tracking-normal text-[#2f3a35] md:mx-0 md:text-3xl">
            Administración Total
          </H2>
          <P className="mx-auto max-w-2xl text-sm text-gray-600 md:mx-0 md:hidden">
            Delega todo y recibe reportes mensuales claros.
          </P>
          <P className="mx-auto hidden max-w-2xl text-sm text-gray-600 md:mx-0 md:block md:text-base">
            La solución más completa. Para propietarios que quieren delegar todo y recibir reportes mensuales.
          </P>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fbfbfa] shadow-[0_12px_30px_rgba(82,101,91,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.08)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8f8f7] via-[#fbfbfa] to-[#f5f6f5]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.04),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.55),transparent_42%)]" />

            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-[#e1e3e1] bg-white/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#686f6a] shadow-sm">
                  <span className="text-sm leading-none">03</span>
                  <span className="h-1 w-1 rounded-full bg-[#c7cdca]" />
                  Premium
                </div>

                <span className="rounded-full border border-[#e1e3e1] bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d746f] shadow-sm">
                  Completo
                </span>
              </div>

              <div className="mt-8 max-w-2xl space-y-4">
                <h3 className="text-xl leading-tight font-semibold text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-3xl">
                  Administración<br />
                  Total
                </h3>

                <P className="max-w-xl text-sm leading-6 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 md:hidden">
                  Gestión completa con reportes para que no te preocupes.
                </P>
                <P className="hidden max-w-xl text-sm leading-6 text-gray-600 transition-colors duration-500 group-hover:text-gray-700 md:block md:text-base">
                  La solución más completa para propietarios que quieren delegar todo y recibir reportes mensuales detallados.
                </P>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Todo lo incluido en los planes anteriores",
                  "Pago de servicios públicos y proveedores",
                  "Contabilidad del alojamiento",
                  "Reportes mensuales de ocupación, ingresos y estrategias",
                  "Gestión operativa integral sin intervención del propietario",
                  "Asesoría en decoración y presentación del espacio",
                ].map((feature, index) => (
                  <div
                    key={feature}
                    className={`${index > 3 ? "hidden md:flex" : "flex"} items-start gap-3 rounded-2xl border border-[#e1e3e1] bg-white/88 px-4 py-3 shadow-[0_8px_20px_rgba(82,101,91,0.03)] backdrop-blur-sm`}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#dfe4e1] bg-[#f8faf9] text-xs font-bold text-[#6a716d]">
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
                  onClick={() => navigate({ to: "/reservar-plan" })}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d0d7d3] bg-[#f0f4f2] px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#c3cbc7] hover:bg-[#e8ede8]"
                >
                  Consultar este plan
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </button>

                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7a807d]">
                  Solución integral
                </span>
              </div>
            </div>
          </article>

          <aside className="group relative overflow-hidden rounded-3xl border border-[#e1e3e1] bg-[#fafafa]/92 p-6 shadow-[0_18px_45px_rgba(82,101,91,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.08)] backdrop-blur-sm md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,101,91,0.03),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(226,231,229,0.5),transparent_44%)]" />

            <details className="group relative md:open:shadow-none" open={isDesktop}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B] md:cursor-default md:justify-start md:text-left md:tracking-[0.28em]">
                <span className="w-full md:w-auto">Lo que cubre</span>
                <span className="text-sm leading-none text-[#97a09b] transition-transform duration-300 group-open:rotate-180 md:hidden">⌄</span>
              </summary>

              <div className="mt-4 space-y-5 md:mt-0">
                <p className="text-sm leading-6 text-gray-600 md:hidden">
                  Delegación total con seguimiento mensual.
                </p>
                <p className="hidden text-sm leading-6 text-gray-600 md:block">
                  Un acompañamiento total que gestiona cada aspecto de tu propiedad mientras tu recibes reportes completos mensualmente.
                </p>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-[#e1e3e1] bg-white/90 px-4 py-3 text-sm font-medium text-[#2f3a35] shadow-[0_8px_20px_rgba(82,101,91,0.025)]">
                    Gestión operativa 100% delegada
                  </div>
                  <div className="rounded-2xl border border-[#e1e3e1] bg-white/90 px-4 py-3 text-sm font-medium text-[#2f3a35] shadow-[0_8px_20px_rgba(82,101,91,0.025)]">
                    Administración financiera completa
                  </div>
                  <div className="rounded-2xl border border-[#e1e3e1] bg-white/90 px-4 py-3 text-sm font-medium text-[#2f3a35] shadow-[0_8px_20px_rgba(82,101,91,0.025)]">
                    Marketing y promoción integral
                  </div>
                  <div className="rounded-2xl border border-[#e1e3e1] bg-white/90 px-4 py-3 text-sm font-medium text-[#2f3a35] shadow-[0_8px_20px_rgba(82,101,91,0.025)]">
                    Reportes mensuales detallados
                  </div>
                </div>

                <div className="rounded-3xl bg-[#fbfbfb] p-5 text-[#2f3a35] shadow-[0_12px_30px_rgba(82,101,91,0.03)] md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#97a09b]">
                    Ideal para
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Propietarios que prefieren total tranquilidad delegando toda la gestión de su alojamiento y recibiendo solo reportes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate({ to: "/reservar-plan" })}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-[#d7ddda] bg-white px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#c3cbc7] hover:bg-[#f7f8f7]"
                >
                  Ver detalle
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </details>
          </aside>
        </div>
      </div>
    </section>
  );
}
