import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const CAPABILITIES = [
  {
    id: "01",
    title: "Páginas web que convierten",
    text: "Landing pages, sitios corporativos y vitrinas digitales con enfoque visual y comercial.",
    icon: "ti-layout-2",
  },
  {
    id: "02",
    title: "Sistemas a medida",
    text: "Herramientas internas, paneles administrativos y flujos que simplifican operaciones.",
    icon: "ti-settings-2",
  },
  {
    id: "03",
    title: "Resolución de problemas",
    text: "Tomamos necesidades puntuales y las transformamos en procesos claros y funcionales.",
    icon: "ti-bulb",
  },
];

const DELIVERABLES = [
  { icon: "ti-layout-2",        label: "Diseño y desarrollo de páginas web" },
  { icon: "ti-repeat",          label: "Automatización de tareas y formularios" },
  { icon: "ti-plug-connected",  label: "Integración con herramientas y APIs" },
];

const STATS = [
  { num: "+4",  label: "Webs y sistemas creados" },
  { num: "100%", label: "Soluciones a medida" },
];

export default function TechnologySolutions() {
  return (
    <section id="desarrollo-tecnologico" className="relative w-full overflow-hidden bg-white">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute left-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/30 blur-[95px]" />
        <div className="absolute right-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/30 blur-[95px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">

        {/* Header */}
        <div className="mb-10 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80">
            Desarrollo de soluciones tecnológicas
          </p>
          <H2 className="max-w-xl text-[#2f3a35]">
            Creamos páginas web y sistemas que resuelven problemas reales.
          </H2>
        </div>

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">

          {/* ── LEFT: imagen hero ── */}
          <div className="group relative min-h-[480px] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900 shadow-[0_24px_60px_rgba(47,58,53,0.12)] lg:min-h-[560px]">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
              alt="Desarrollo tecnológico"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Overlay degradado más limpio */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2623]/82 via-[#2f3a35]/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />

            {/* Contenido sobre la imagen */}
            <div className="relative flex h-full flex-col p-6 md:p-8">
              {/* Badge */}
              <div className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
                Nuestro enfoque
              </div>

              <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium text-white/85 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#d8e7d9]" />
                Diseño, desarrollo y soporte continuo
              </div>

              {/* Texto principal */}
              <div className="mt-6 max-w-sm">
                <P className="text-sm leading-7 text-white/88 md:text-base">
                  Escuchamos lo que tu negocio necesita, ordenamos el problema y lo
                  convertimos en una herramienta digital práctica: desde una web de
                  presentación hasta un sistema completo.
                </P>
              </div>

              {/* Deliverables — empujados al fondo */}
              <div className="mt-auto flex flex-col gap-2.5">
                {DELIVERABLES.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-3 rounded-xl border border-white/14 bg-white/10 px-4 py-2.5 backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <i className={`ti ${d.icon} text-[15px] text-white/75`} aria-hidden="true" />
                    <span className="text-xs font-medium text-white/95 md:text-[13px]">{d.label}</span>
                  </div>
                ))}

                <Button
                  asChild
                  className="mt-2 w-fit rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#2f3a35] shadow-none transition-transform hover:cursor-pointer hover:bg-white/90 hover:-translate-y-0.5"
                  variant="green"
                >
                  <Link to="/reservar-servicio" search={{ servicio: "Desarrollo de soluciones tecnológicas" }}>
                    Contactar ahora
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: stats + capability cards ── */}
          <div className="flex flex-col gap-4">

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/70">
                Qué resolvemos
              </p>
              <P className="max-w-lg text-sm leading-6 text-zinc-600">
                Convertimos ideas en productos digitales con foco en claridad, eficiencia y una
                experiencia visual consistente.
              </P>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4 shadow-[0_8px_20px_rgba(82,101,91,0.05)]"
                >
                  <p className="text-2xl font-semibold text-[#2f3a35] md:text-3xl">{s.num}</p>
                  <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Capability cards */}
            {CAPABILITIES.map((cap) => (
              <article
                key={cap.id}
                className="flex flex-1 items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_20px_rgba(82,101,91,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(82,101,91,0.12)]"
              >
                {/* Número */}
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#52655B]/10 text-sm font-semibold text-[#3a5940]">
                  {cap.id}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800 md:text-base">
                    {cap.title}
                  </h3>
                  <P className="mt-1.5 text-sm leading-6 text-zinc-500">
                    {cap.text}
                  </P>
                </div>
              </article>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}