import { H2, P } from "@/components/ui/Typography";
import { useEffect, useRef } from "react";

export default function Transfers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const catalogUrl = "https://p.localbird.io/rentmecr-san-jose/discover";

  const includedItems = [
    "Aeropuerto SJO a tu alojamiento",
    "Shuttles privados a tours",
    "Servicio de transporte en Costa Rica",
    "Vehículos cómodos y conductores certificados",
  ];

  const transferOptions = [
    { id: 1, price: "$30", name: "Traslado privado aeropuerto San José" },
    { id: 2, price: "$38", name: "Gran Área Metropolitana" },
    { id: 3, price: "$52", name: "Traslado compartido Liberia" },
    { id: 4, price: "$160", name: "Shuttle privado Costa Rica" },
  ];

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            if (el.classList.contains('is-visible')) return
            const delay = isDesktop ? i * 80 : 0
            setTimeout(() => {
              el.classList.add('is-visible')
              observer.unobserve(el)
            }, delay)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px 60px 0px' }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll<HTMLElement>('[data-reveal]')
      elements.forEach(el => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-[-6rem] top-1/2 h-[27rem] w-[27rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/50 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[25rem] w-[25rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/60 blur-3xl" />
      </div>

      <div ref={sectionRef} className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <article
            data-reveal
            className="rounded-[2rem] border border-[#52655B]/10 bg-white p-6 shadow-[0_16px_42px_rgba(82,101,91,0.08)] transition-all duration-700 reveal-block md:p-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
              Transporte
            </p>
            <H2 className="max-w-lg text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
              Traslados privados incluidos
            </H2>

            <P className="mt-4 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
              No te preocupes por cómo llegar. Ofrecemos traslados privados desde y hacia el Aeropuerto Juan Santamaría y cualquier punto de la Gran Área Metropolitana.
            </P>

            <ul className="mt-6 space-y-3">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#2f3a35] md:text-base">
                  <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#52655B] text-xs font-bold text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.open(catalogUrl, "_blank")}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#52655B]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#52655B] transition-all duration-300 hover:border-[#52655B]/45 hover:bg-[#52655B]/5"
            >
              Ver opciones de transporte
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
          </article>

          <div
            data-reveal
            className="grid gap-4 sm:grid-cols-2 transition-all duration-700 reveal-block"
          >
            {transferOptions.map((option, index) => (
              <article
                key={option.id}
                onClick={() => window.open(catalogUrl, "_blank")}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-[#52655B]/10 bg-gradient-to-br from-white to-[#52655B]/5 p-5 shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-[#52655B]/30 hover:shadow-[0_22px_48px_rgba(82,101,91,0.14)]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="mb-3 inline-flex rounded-full border border-[#52655B]/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#52655B]">
                  Desde
                </div>
                <p className="text-3xl font-semibold leading-none text-[#2f3a35]">
                  {option.price}
                </p>
                <P className="mt-3 text-sm leading-6 text-gray-600">
                  {option.name}
                </P>

                <div className="mt-5 flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[#52655B] opacity-0 transition-all duration-400 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                  Reservar
                  <span className="ml-2">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
