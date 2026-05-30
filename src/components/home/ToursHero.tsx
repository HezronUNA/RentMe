import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { H2} from "@/components/ui/Typography";
import { useEffect, useRef } from "react";

interface Tour {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

function ToursHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const catalogUrl = "https://p.localbird.io/rentmecr-san-jose/discover";

  const tours: Tour[] = [
    {
      id: 1,
      category: "Volcanes",
      name: "Tour Volcán Poás",
      description: "Visita uno de los cráteres más accesibles. Ideal para familias.",
      price: "$98",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779206667/Qk_dzY9sqs-800_ci8avq.avif",
    },
    {
      id: 3,
      category: "Aventura",
      name: "Canopy Zipline",
      description: "Adrenalina entre los árboles. Guías expertos.",
      price: "$48",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779904978/image_rzppju.jpg",
    },
    {
      id: 2,
      category: "Café",
      name: "Tour de Café",
      description: "Recorre una finca auténtica y disfruta de degustaciones.",
      price: "$31",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/f_auto,q_auto,w_auto/v1778953024/photo-1495474472287-4d71bcdd2085_tz6q8i.avif",
    },
    {
      id: 4,
      category: "Naturaleza",
      name: "Tram Aéreo",
      description: "Sobrevuela el dosel del bosque tropical en un tram panorámico.",
      price: "$159",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779900616/angela-erick-cWHAW_tjk7Q-unsplashNATURE_shrkq5.jpg",
    },
    {
      id: 5,
      category: "Cultural",
      name: "San José Walking Tour",
      description: "Explora los mercados tradicionales, murales y la escena cafetera.",
      price: "$45",
      image: "https://res.cloudinary.com/dmq5jbp3z/image/upload/v1779900137/cesar-badilla-miranda-YsOw5A7uT8Q-unsplashCIUDAD_bgov6a.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.classList.contains('is-visible')) return;
            setTimeout(() => {
              el.classList.add('is-visible');
              observer.unobserve(el);
            }, i * 80);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll<HTMLElement>('[data-reveal="true"]');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white px-4 py-16 md:px-8 md:py-24" style={{ contain: 'paint layout' }}>
      {/* Blobs de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute left-[-6rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/25 blur-[90px]" />
        <div className="absolute right-[-6rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/25 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#52655B]/80 sm:text-xs">
              Selección destacada
            </p>
            <H2 className="max-w-xl text-xl sm:text-2xl md:text-4xl">
              Tours recomendados para vivir Costa Rica de verdad.
            </H2>
          </div>
          <Link
            to="/tours"
            className="group hidden items-center gap-2 text-sm font-semibold text-[#52655B] sm:flex"
          >
            Ver todos <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Contenedor con Scroll Horizontal en móvil y 5 columnas en Escritorio */}
        <div 
          className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:overflow-visible sm:pb-0 sm:gap-4"
        >
          {tours.map((tour) => {
            var cardClass = "tours-card group relative flex shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[#2f3a35] shadow-md aspect-[10/12] min-w-[62%] sm:aspect-[3/4.2] sm:min-w-0 sm:hover:-translate-y-1.5 sm:shadow-lg"
            return <article
              key={tour.id}
              data-reveal="true"
              className={cardClass}
            >
              <img
                src={tour.image}
                alt={tour.name}
                loading="lazy"
                fetchPriority="low"
                decoding="sync"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 sm:group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a35]/95 via-[#2f3a35]/40 to-transparent" />

              {/* Contenido Miniaturizado */}
              <div className="relative p-4 sm:p-5">
                <div className="mb-1 rounded-full w-fit bg-white/10 px-2 py-0.5 text-[7px] font-bold uppercase tracking-widest text-white border border-white/10 sm:text-[8px]">
                  {tour.category}
                </div>

                <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-xs font-bold leading-tight text-white sm:text-sm">
                    {tour.name}
                  </h3>
                  <span className="text-[10px] font-bold text-white sm:text-xs">{tour.price}</span>
                </div>

                <p className="mb-3 text-[9px] leading-snug text-white/70 line-clamp-2 sm:mb-4 sm:text-[11px]">
                  {tour.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(catalogUrl, "_blank");
                  }}
                  className="w-full rounded-full bg-white/10 py-2 text-[9px] font-bold uppercase tracking-wider text-white border border-white/20 transition-all active:scale-95 sm:py-2 sm:text-[10px] sm:hover:bg-white sm:hover:text-[#2f3a35]"
                >
                  Reservar
                </button>
              </div>
            </article>
          })}
        </div>

        {/* Botón Inferior Móvil */}
        <div className="mt-4 flex justify-center sm:hidden">
            <Link to="/tours" className="text-xs font-bold text-[#52655B] underline underline-offset-4">
                Ver todos los tours
            </Link>
        </div>

        {/* Botón Catálogo Escritorio */}
        <div className="mt-16 hidden justify-center sm:flex">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 rounded-full border border-[#52655B]/20 bg-[#52655B] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#435349]"
          >
            Ver catálogo completo
            <span>→</span>
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

export default memo(ToursHero)