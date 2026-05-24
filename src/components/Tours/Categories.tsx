import { H2, P } from "@/components/ui/Typography";
import { useEffect, useRef } from "react";

export default function Categories() {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      name: "Aventura en volcanes",
      description: "Sube al Poás e Irazú. Vistas únicas desde el cráter y paisajes que no olvidarás.",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206667/Qk_dzY9sqs-800_ci8avq.avif"
    },
    {
      id: 2,
      name: "Café & Chocolate",
      description: "Recorre fincas cafetaleras, aprende el proceso y prueba el mejor café de origen.",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206741/photo-1509042239860-f550ce710b93_fgyfey.avif"
    },
    {
      id: 3,
      name: "Naturaleza",
      description: "Teleférico aéreo en el bosque lluvioso, cataratas La Paz y fauna exótica a tu lado.",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206804/photo-1448375240586-882707db888b_gsh2m5.avif"
    },
    {
      id: 4,
      name: "Cultura & Ciudad",
      description: "City tour por San José, mercados, historia y arte urbano con guías locales.",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206868/photo-1519501025264-65ba15a82390_bgvejo.avif"
    },
    {
      id: 5,
      name: "Bienestar",
      description: "Yoga, meditación y masajes a domicilio. Relájate sin salir de tu alojamiento.",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206930/photo-1506126613408-eca07ce68773_romdej.avif"
    }
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
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-[-8rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/40 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/48 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header - Offset a la izquierda */}
        <div className="mb-10 ml-0 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Lo que puedes vivir
          </p>
          <H2 className="max-w-md text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
            Experiencias para cada tipo de viajero
          </H2>
          <P className="max-w-xl text-sm text-gray-600 md:text-base">
            Una selección pensada para inspirar la próxima escapada con categorías reales del catálogo.
          </P>
        </div>

        {/* Categories Mosaic */}
        <div
          ref={containerRef}
          className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6"
        >
          <article
            onClick={() => window.open("https://p.localbird.io/rentmecr-san-jose/discover", "_blank")}
            data-reveal
            className="group relative min-h-[34rem] cursor-pointer overflow-hidden rounded-[2rem] bg-[#2f3a35] text-white shadow-[0_24px_60px_rgba(47,58,53,0.18)] transition-all duration-700 reveal-card hover:-translate-y-1"
            style={{ transitionDelay: "0ms" }}
          >
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f3a35]/88 via-[#2f3a35]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2f3a35] to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
              <div className="absolute left-6 top-6 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm md:left-8 md:top-8">
                Categoría destacada
              </div>
              <div className="max-w-lg space-y-4 pt-16 md:pt-20">
                <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                  {categories[0].name}
                </div>
                <h3 className="text-2xl leading-tight font-semibold md:text-3xl">
                  {categories[0].name}
                </h3>
                <P className="max-w-md text-sm leading-6 text-white/80 md:text-base">
                  {categories[0].description}
                </P>
                <div className="flex items-center gap-3 pt-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    Ir al catálogo
                  </span>
                  <span className="text-sm font-medium text-white/80 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {categories.slice(1).map((category, index) => (
              <article
                key={category.id}
                onClick={() => window.open("https://p.localbird.io/rentmecr-san-jose/discover", "_blank")}
                data-reveal
                className="group relative min-h-[16rem] cursor-pointer overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 reveal-card hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(82,101,91,0.14)]"
                style={{ transitionDelay: `${(index + 1) * 80}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/82 via-[#2f3a35]/30 to-transparent" />

                <div className="relative flex h-full flex-col justify-end p-4">
                  <div className="mb-2 inline-flex w-fit rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                    {category.name}
                  </div>
                  <h3 className="text-sm font-semibold leading-5 text-white md:text-[15px]">
                    {category.name}
                  </h3>
                  <P className="mt-2 max-w-sm text-xs leading-5 text-white/78">
                    {category.description}
                  </P>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/90 opacity-0 transition-all duration-500 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                    Ver detalles
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
