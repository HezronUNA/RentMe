import { H2, P } from "@/components/ui/Typography";
import { useEffect, useRef } from "react";

export default function FeaturedTours() {
  const containerRef = useRef<HTMLDivElement>(null);

  const catalogUrl = "https://p.localbird.io/rentmecr-san-jose/discover";

  const tours = [
    {
      id: 1,
      category: "Volcanes",
      name: "Tour Volcán Poás — Parque Nacional",
      description:
        "Visita uno de los cráteres más accesibles del mundo. Ideal para familias, con guía incluido y transporte desde San José.",
      price: "$98",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779898924/manfred-madrigal-IHvgTT3b1_o-unsplash_VolcanPoas_cphc7s.jpg",
    },
    {
      id: 2,
      category: "Café & Naturaleza",
      name: "Tour Clásico de Café de Costa Rica",
      description:
        "Recorre una finca cafetalera auténtica, conoce el proceso de cosecha y disfruta de degustaciones. Experiencia familiar.",
      price: "$31",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1778953024/photo-1495474472287-4d71bcdd2085_tz6q8i.avif",
    },
    {
      id: 3,
      category: "Aventura",
      name: "Canopy Zipline en San José",
      description:
        "Adrenalina entre los árboles a pocos minutos de la ciudad. Equipo de seguridad incluido y guías expertos en cada línea.",
      price: "$48",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779904978/image_rzppju.jpg",
    },
    {
      id: 4,
      category: "Naturaleza",
      name: "Tram Aéreo en el Bosque Lluvioso",
      description:
        "Sobrevuela el dosel del bosque tropical en un tram panorámico. Fauna, flora y vistas impresionantes del ecosistema.",
      price: "$159",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779900616/angela-erick-cWHAW_tjk7Q-unsplashNATURE_shrkq5.jpg",
    },
    {
      id: 5,
      category: "Cultural",
      name: "San José Walking Tour — Mercados y Café",
      description:
        "Explora los mercados tradicionales, murales y la escena cafetera local a pie. Historia viva en cada esquina de la capital.",
      price: "$45",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779900137/cesar-badilla-miranda-YsOw5A7uT8Q-unsplashCIUDAD_bgov6a.jpg",
    },
    {
      id: 6,
      category: "Aventura",
      name: "Rafting en el Río Sarapiquí",
      description:
        "Rápidos emocionantes en uno de los ríos más bellos de Costa Rica. Perfecto para grupos y amantes de los deportes acuáticos.",
      price: "$128",
      image:
        "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779901527/outward-bound-costa-rica-Huuf2q9_2cA-unsplashRAITING_1_r5xf3w.jpg",
    },
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

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll<HTMLElement>('[data-reveal]')
      elements.forEach(el => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-[-7rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/45 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/52 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Selección destacada
          </p>
          <H2 className="max-w-2xl text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
            Tours recomendados para vivir Costa Rica de verdad
          </H2>
          <P className="max-w-2xl text-sm text-gray-600 md:text-base">
            Ideas curadas para que explores volcanes, café, ciudad y naturaleza con un enfoque más humano y auténtico.
          </P>
        </div>

        <div ref={containerRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {tours.map((tour) => (
            <article
              key={tour.id}
              data-reveal
              onClick={() => window.open(catalogUrl, "_blank")}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 transform reveal-card hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(82,101,91,0.14)]"
            >
              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#52655B]/10 to-[#52655B]/5 sm:h-40">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/65 via-[#2f3a35]/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                  {tour.category}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-5 text-[#2f3a35] transition-colors duration-500 group-hover:text-[#52655B] sm:text-base">
                    {tour.name}
                  </h3>
                  <div className="shrink-0 rounded-full border border-[#52655B]/10 bg-[#52655B]/5 px-2.5 py-1 text-xs font-semibold text-[#52655B]">
                    desde {tour.price}
                  </div>
                </div>

                <P className="mb-4 text-xs leading-5 text-gray-600 transition-colors duration-500 group-hover:text-gray-700">
                  {tour.description}
                </P>

                <div className="flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#52655B]/80 opacity-0 transition-all duration-500 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                    Ver en catálogo
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(catalogUrl, "_blank");
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#52655B]/20 bg-white px-3 py-2 text-xs font-medium text-[#52655B] transition-all duration-300 hover:border-[#52655B]/40 hover:bg-[#52655B]/5"
                  >
                    Reservar
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
