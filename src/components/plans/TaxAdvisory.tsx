import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const SERVICES = [
  { icon: "ti-receipt-tax",    label: "Asesoría tributaria especializada en Airbnb" },
  { icon: "ti-building-bank",  label: "Inscripción y actualización ante Hacienda" },
  { icon: "ti-file-invoice",   label: "Declaraciones de IVA y renta" },
  { icon: "ti-device-laptop",  label: "Facturación electrónica" },
];

const RISKS = [
  "Multas o sanciones de Hacienda",
  "Declaraciones incorrectas o incompletas",
  "Pérdida de dinero por mala organización",
  "Problemas con facturación e impuestos",
];

const BENEFITS = [
  {
    icon: "ti-search",
    title: "Consultas personalizadas",
    desc: "Analizamos tu caso particular y te orientamos según tus obligaciones reales.",
  },
  {
    icon: "ti-report-analytics",
    title: "Organización contable",
    desc: "Estructura clara de ingresos y gastos para tus propiedades vacacionales.",
  },
  {
    icon: "ti-shield-check",
    title: "Soporte profesional continuo",
    desc: "Seguimiento a cambios legales y respaldo ante cualquier situación fiscal.",
  },
  {
    icon: "ti-home",
    title: "Orientación para nuevos anfitriones",
    desc: "Te explicamos qué impuestos pagar y cómo mantener tu negocio en orden.",
  },
];

export default function TaxAdvisory() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute left-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/30 blur-[95px]" />
        <div className="absolute right-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/30 blur-[95px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Tag */}
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80">
          Cumplimiento tributario
        </p>

        {/* Header 2 columnas */}
        <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <H2 className="max-w-lg text-[#2f3a35]">
              Servicios contables y asesoría fiscal para Airbnb
            </H2>
            <P className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
              Convierte tu propiedad en un negocio rentable y en regla. Te ayudamos a gestionar
              correctamente tus obligaciones fiscales en Costa Rica, con asesoría personalizada
              para anfitriones, inversionistas y propietarios.
            </P>
          </div>

          {/* Cuadro de riesgos */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="mb-3 text-sm font-semibold text-zinc-700">
              Sin asesoría, tu Airbnb puede tener:
            </p>
            <ul className="flex flex-col gap-2.5">
              {RISKS.map((r) => (
                <li key={r} className="flex items-center gap-3 text-sm text-zinc-600">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">

          {/* LEFT — imagen hero */}
          <div className="group relative min-h-[480px] overflow-hidden rounded-3xl lg:min-h-[540px]">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85"
              alt="Asesoría fiscal para Airbnb"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2f3a35]/55 via-[#2f3a35]/75 to-[#2f3a35]/93" />

            <div className="relative flex h-full flex-col p-6 md:p-8">
              {/* Badge */}
              <div className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
                Nuestro servicio
              </div>

              {/* Servicios — empujados al fondo */}
              <div className="mt-auto flex flex-col gap-2.5">
                {SERVICES.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 backdrop-blur-sm"
                  >
                    <i className={`ti ${s.icon} text-[15px] text-white/60`} aria-hidden="true" />
                    <span className="text-xs font-medium text-white/85">{s.label}</span>
                  </div>
                ))}

                <Button
                  asChild
                  className="mt-2 w-fit rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#2f3a35] hover:cursor-pointer hover:bg-white/90"
                >
                  <Link to="/reservar-servicio" search={{ servicio: "Asesoría Fiscal Airbnb" }}>
                    Agendar asesoría personalizada →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4">
                <p className="text-2xl font-semibold text-[#2f3a35] md:text-3xl">Legal</p>
                <p className="mt-1 text-xs text-zinc-500">Operación segura y ordenada</p>
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4">
                <p className="text-2xl font-semibold text-[#2f3a35] md:text-3xl">CR</p>
                <p className="mt-1 text-xs text-zinc-500">Especialistas en Costa Rica</p>
              </div>
            </div>

            {/* Benefit cards */}
            {BENEFITS.map((b) => (
              <article
                key={b.title}
                className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_20px_rgba(82,101,91,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(82,101,91,0.11)]"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#52655B]/10">
                  <i className={`ti ${b.icon} text-base text-[#52655B]`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800">{b.title}</h3>
                  <P className="mt-1 text-xs leading-5 text-zinc-500">{b.desc}</P>
                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}