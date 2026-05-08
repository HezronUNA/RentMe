import { H2, P } from "@/components/ui/Typography"
import { Link } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"

const PLANES_GESTION = [
  {
    id: '1',
    title: 'Gestión de Alojamientos',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
  },
  {
    id: '2',
    title: 'Limpieza Profesional',
    textbutton: 'Ver más',
    image: 'https://i.ibb.co/kVn27zV1/service-5.jpg'
  },
  {
    id: '3',
    title: 'Asesoría Fiscal Airbnb',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80'
  },
  {
    id: '4',
    title: 'Servicios Facturables',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'
  },
  {
    id: '5',
    title: 'Promoción y Venta/Alquiler',
    textbutton: 'Ver más',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
  },
  {
    id: '6',
    title: 'Fotografía & Video',
    textbutton: 'Ver más',
    image: 'https://res.cloudinary.com/dmq5jbp3z/image/upload/v1762383404/photo-1751107996106-ab89608a49b7_fakdgp.jpg'
  }
]

export default function PlansSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const index = Number(element.dataset.index);
            if (Number.isNaN(index)) return;
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const revealElements = containerRef.current.querySelectorAll<HTMLElement>("[data-reveal='true']");
      revealElements.forEach((element) => observer.observe(element));
    }

    return () => observer.disconnect();
  }, []);

  const getCardSize = (index: number) => {
    const layout = [
      "sm:col-span-2 col-span-1 h-60 sm:h-80",
      "col-span-1 h-60 sm:h-80",
      "col-span-1 h-60 sm:h-80",
      "col-span-1 h-60 sm:h-80",
      "col-span-1 h-60 sm:h-80",
      "sm:col-span-2 col-span-1 h-60 sm:h-80",
    ]
    return layout[index] || "col-span-1 h-60 sm:h-80"
  }

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24 bg-white">
      {/* Blobs de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/40 blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/48 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header centrado */}
        <div className="mb-12 text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Nuestros Servicios
          </p>
          <H2 className="max-w-2xl mx-auto text-2xl leading-tight tracking-normal text-[#2f3a35] md:text-3xl">
            Soluciones Inmobiliarias Integrales
          </H2>
          <P className="max-w-xl mx-auto text-sm text-gray-600 md:text-base">
            Asesoría personalizada en gestión, venta y compra de propiedades en Costa Rica.
          </P>
        </div>

        {/* Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {PLANES_GESTION.map((plan, index) => (
            <Link to="/servicios" key={`${plan.id}-${index}`} className={getCardSize(index)}>
              <article
                data-reveal="true"
                data-index={index}
                className={`group relative h-full cursor-pointer overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_30px_rgba(82,101,91,0.08)] transition-all duration-700 ${
                  visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                } hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(82,101,91,0.14)]`}
                style={{ transitionDelay: visibleCards[index] ? `${index * 90}ms` : "0ms" }}
              >
                {/* Background image */}
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/82 via-[#2f3a35]/30 to-transparent" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-5 md:p-7">
                  <h3 className="text-base font-semibold leading-6 text-white md:text-lg">
                    {plan.title}
                  </h3>

                  <P className="mt-3 max-w-sm text-xs leading-5 text-white/78 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    Accede a nuestros servicios profesionales
                  </P>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white opacity-100 sm:opacity-0 sm:transition-all sm:duration-500 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                      {plan.textbutton}
                    </span>
                    <span className="text-xs font-medium text-white/80 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}