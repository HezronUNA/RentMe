// src/slices/aboutUs/sections/whatWeDo/WhatWeDo.tsx
import { useEffect, useRef } from "react";
import { Home, Building2, KeyRound, ClipboardCheck, MessageCircleHeart, Star } from "lucide-react";
import { H2, H3, P } from "@/components/ui/Typography";

export default function WhatWeDo() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Datos de las cards para el carrusel móvil
  const mobileCards = [
    {
      id: 1,
      icon: Star,
      title: "Valorizar tu propiedad",
      subtitle: "Cuidamos tu inversión como si fuera nuestra."
    },
    {
      id: 2,
      icon: Home,
      title: "Reducir tus preocupaciones",
      subtitle: "Nos encargamos de la gestión completa para que disfrutes tu tranquilidad"
    },
    {
      id: 3,
      icon: Building2,
      title: "Maximizar tu rentabilidad",
      subtitle: "Optimizamos cada aspecto de la gestión de tu propiedad."
    },
    {
      id: 4,
      icon: ClipboardCheck,
      title: "Generar reseñas positivas y fidelizar clientes",
      subtitle: "Brindamos un servicio excepcional que inspira confianza y promueve recomendaciones."
    },
    {
      id: 5,
      icon: MessageCircleHeart,
      title: "Garantizar satisfacción total del huésped",
      subtitle: "Atendemos cada detalle para ofrecer una experiencia cómoda, fluida y memorable."
    }
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let currentIndex = 0;
    let cachedWidth = carousel.offsetWidth;

    const ro = new ResizeObserver(() => {
      cachedWidth = carousel.offsetWidth;
    });
    ro.observe(carousel);
    
    const scroll = () => {
      if (!carousel) return;
      currentIndex = (currentIndex + 1) % mobileCards.length;
      const cardWidth = cachedWidth * 0.85;
      const scrollPosition = (cardWidth + 16) * currentIndex;

      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    };

    const interval = setInterval(scroll, 5000);

    return () => {
      clearInterval(interval);
      ro.disconnect();
    };
  }, [mobileCards.length]);

  return (
    <section id="about-us-content" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-28 h-[22rem] w-[22rem] rounded-full bg-[#e7eee9]/45 blur-[80px] md:left-[4%] md:top-24 md:h-[32rem] md:w-[32rem] md:bg-[#e7eee9]/75 md:blur-[105px]" />
        <div className="absolute right-[-3rem] bottom-20 h-[24rem] w-[24rem] rounded-full bg-[#f1e8dc]/50 blur-[85px] md:right-[-6rem] md:bottom-28 md:h-[34rem] md:w-[34rem] md:bg-[#f1e8dc]/80 md:blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
      {/* Versión Desktop */}
      <div className="hidden md:block">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold">
            Gestion Integral Inmobiliaria
          </p>
          <H2 className="sm:max-w-3xl mx-auto mt-3">
            Lo Que Hacemos
          </H2>
          <P className="mt-4 text-base sm:text-lg text-zinc-700 leading-relaxed">
            Ofrecemos soluciones integrales para quienes buscan comprar, vender, o alquilar propiedades en Costa Rica.
          </P>
        </div>

        {/* Grid: en desktop (lg) 3 columnas */}
        <div className="grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Fila 1: cards 0, 1, 3 */}
          <div className="lg:col-start-1 lg:row-start-1">
            <article className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
                <KeyRound className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <P className="text-zinc-700 text-xl font-medium">Alquiler de Propiedades</P>
                <P className="text-zinc-900 text-base leading-relaxed">
                  Publicamos y gestionamos propiedades en alquiler con calendarios sincronizados de múltiples plataformas.
                </P>
              </div>
            </article>
          </div>

          <div className="lg:col-start-2 lg:row-start-1">
            <article className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
                <Home className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <P className="text-zinc-700 text-xl font-medium">Venta de Inmuebles</P>
                <P className="text-zinc-900 text-base leading-relaxed">
                  Conectamos compradores con propiedades excepcionales, facilitando todo el proceso de compra.
                </P>
              </div>
            </article>
          </div>

          <div className="lg:col-start-3 lg:row-start-1">
            <article className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
                <Building2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <P className="text-zinc-700 text-xl font-medium">Gestión Completa</P>
                <P className="text-zinc-900 text-base leading-relaxed">
                  Desde la búsqueda hasta el cierre, nos encargamos de todos los detalles para que tu experiencia sea fluida y sin complicaciones.
                </P>
              </div>
            </article>
          </div>

          {/* Fila 2: card 2 (col-span-2), card 4 */}
          <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2 h-full">
            <article className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
                <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <P className="text-zinc-700 text-xl font-medium">Asesoría Personalizada</P>
                <P className="text-zinc-900 text-base leading-relaxed">
                  Brindamos orientación experta para cada etapa de tu búsqueda o inversión inmobiliaria.
                </P>
              </div>
            </article>
          </div>

          <div className="lg:col-start-3 lg:row-start-2 h-full">
            <article className="group h-full bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white">
                <MessageCircleHeart className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <P className="text-zinc-700 text-xl font-medium">Atención al Cliente</P>
                <P className="text-zinc-900 text-base leading-relaxed">
                  Nuestro equipo está disponible para responder tus consultas y apoyarte en cada decisión.
                </P>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Versión Mobile con Carrusel Autoplay */}
      <div className="md:hidden py-10">
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#52655B]/80 font-semibold">
            Gestion Integral Inmobiliaria
          </p>
          <H2 className="mt-3 mx-auto max-w-xs">
            Lo Que Hacemos
          </H2>
          <P className="mt-3 text-sm text-zinc-700 leading-relaxed max-w-md mx-auto">
            Ofrecemos soluciones integrales para quienes buscan comprar, vender o alquilar propiedades en Costa Rica.
          </P>
        </div>

        {/* Carrusel de tarjetas */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mobileCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className="flex-none w-[85%] mx-2 first:ml-0 last:mr-0 snap-center
                         bg-neutral-50 rounded-2xl border border-zinc-200 shadow-sm p-6 
                         flex flex-col gap-4 hover:shadow-[0_10px_40px_rgb(82,101,91,0.35)] 
                         transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/90 text-white transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <div className="space-y-2">
                  <H3 className="">
                    {card.title}
                  </H3>
                  <P className="text-zinc-900 text-sm leading-relaxed">
                    {card.subtitle}
                  </P>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}


