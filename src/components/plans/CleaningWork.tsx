import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, Building2, RefreshCw, Check, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SMALL_SERVICES = [
  {
    icon: Home,
    title: "Limpieza residencial",
    desc: "Mantenimiento completo para alojamientos vacacionales",
    tag: "Presupuesto basado en tamaño",
  },
  {
    icon: Building2,
    title: "Limpieza comercial",
    desc: "Oficinas, locales y espacios corporativos",
    tag: "Presupuesto",
  },
  {
    icon: RefreshCw,
    title: "Limpieza profunda",
    desc: "Sanitización total con protocolos tipo hotel",
    tag: "4-6 horas",
  },
];

const FEATURES = [
  "Protocolos profesionales tipo hotel",
  "Productos ecológicos certificados",
  "Personal capacitado y con seguro",
];

export default function CleaningServiceHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24">
      {/* Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/30 blur-[95px]" />
        <div className="absolute right-[-6rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/30 blur-[95px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80">
            Servicios de limpieza profesional
          </p>
          <H2 className="max-w-xl text-[#2f3a35]">
            Impecable, siempre
          </H2>
        </div>

        {/* Bento grid — asimétrico */}
        <div className="grid gap-5 lg:grid-cols-[1.5fr_0.5fr]">

          {/* ─── Hero card (left, grande) ─── */}
          <div className="group relative min-h-[520px] overflow-hidden rounded-3xl lg:min-h-[600px]">
            <img
              src="https://res.cloudinary.com/dmq5jbp3z/image/upload/v1778645973/ashwini-chaudhary-monty-Iu6parQAO-U-unsplash_1_zvk4sk.avif"
              alt="Limpieza profesional"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2f3a35]/50 via-[#2f3a35]/70 to-[#2f3a35]/92" />

            <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                Limpieza profesional
              </div>

              {/* Bottom content */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    Servicio de limpieza<br />de primera clase
                  </h3>
                  <p className="max-w-md text-sm leading-6 text-white/80 md:text-base">
                    Limpieza profesional con protocolos estrictos, productos de calidad
                    y control visual. Tu propiedad lista para cada huésped.
                  </p>
                </div>

                {/* Features con checkmark */}
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                      <Check className="h-4 w-4 text-[#a8c5b3]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#2f3a35] hover:cursor-pointer hover:bg-white/90"
                >
                  <Link to="/reservar-servicio" search={{ servicio: "Limpieza profesional" }}>
                    Solicitar servicio →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* ─── Small cards (right, apiladas) ─── */}
          <div className="flex flex-col gap-4">
            {SMALL_SERVICES.map((s) => (
              <article
                key={s.title}
                className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_8px_20px_rgba(82,101,91,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(82,101,91,0.12)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#52655B]/10">
                  <s.icon className="h-5 w-5 text-[#52655B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-800">{s.title}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-zinc-500">{s.desc}</p>
                </div>
                <div className="mt-auto inline-flex w-fit items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1">
                  <Star className="h-3 w-3 text-[#52655B]" />
                  <span className="text-[11px] font-medium text-zinc-600">{s.tag}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
