import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { H2, P } from "@/components/ui/Typography";

function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24">
      {/* Blobs — centrados verticalmente a los lados, sin desbordarse hacia otras secciones */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-1/2 -translate-y-1/2 h-[26rem] w-[26rem] rounded-full bg-[#e7eee9]/25 blur-[90px]" />
        <div className="absolute right-[-6rem] top-1/2 -translate-y-1/2 h-[26rem] w-[26rem] rounded-full bg-[#f1e8dc]/25 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Split layout: text left, image card right — aligned from the top */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Left: all text + CTA */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold">
                Sobre Nosotros
              </p>
              <H2 className="mt-4 max-w-lg">
                Transparencia y cercanía en cada paso.
              </H2>
              <P className="mt-4 text-base md:text-lg text-zinc-700">
                Un equipo local que combina experiencia en gestión y servicio para
                ofrecer soluciones prácticas en alquileres, ventas y reservas.
              </P>
            </div>

            <P className="text-base md:text-lg text-zinc-700 leading-relaxed">
              En la sección de Sobre Nosotros encontrarás nuestra visión,
              metodología y el enfoque humano que guía cada decisión de la
              plataforma.
            </P>

            <Link
              to="/nosotros"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#52655B]/20 bg-[#52655B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#435349] hover:shadow-[0_18px_32px_rgba(82,101,91,0.28)]"
            >
              Ir a Sobre Nosotros
              <span className="transition-transform duration-300">→</span>
            </Link>
          </div>

          {/* Right: image card — same style as category cards */}
          <article className="group relative overflow-hidden rounded-[1.5rem] bg-[#2f3a35] cursor-pointer shadow-[0_20px_60px_rgba(47,58,53,0.18)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(47,58,53,0.22)]" style={{ minHeight: "22rem" }}>
            <img
              src="https://officebanao.com/wp-content/uploads/2023/11/modern-black-conference-room-1024x682.webp"
              alt="Equipo de trabajo"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/90 via-[#2f3a35]/25 to-transparent" />

            {/* Top badge — absolute sobre la imagen */}
            <div className="absolute left-4 top-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm">
              Nuestra esencia
            </div>

            {/* Bottom content — absolute en la parte baja */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <div className="mb-2 inline-flex w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                DMR Rentals
              </div>
              <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
                Confianza + Estrategia + Resultados
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75 md:text-sm">
                Convertimos experiencia inmobiliaria y visión de servicio en una
                propuesta más cercana para propietarios y huéspedes.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/90 opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Ver más <span>→</span>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

export default memo(AboutPreview)