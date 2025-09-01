import { useEffect, useRef } from "react";
import { H2, H3, P } from "@/shared/components/Typography";
import type { AboutSection } from "../type";
import type { LucideIcon } from "lucide-react";

type Props = {
  header: AboutSection;
  cards: AboutSection[];
  icons: LucideIcon[];
  setupCarousel: (ref: React.RefObject<HTMLDivElement>) => void;
};

export default function MobileAboutUs({ header, cards, icons }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let currentIndex = 0;
    
    const scroll = () => {
      if (!carousel) return;
      
      currentIndex = (currentIndex + 1) % cards.length;
      const cardWidth = carousel.offsetWidth * 0.85; // 85% del ancho como definimos en el className
      const scrollPosition = (cardWidth + 16) * currentIndex; // 16px es el margen (mx-2)

      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    };

    // Autoplay cada 5 segundos
    const interval = setInterval(scroll, 5000);

    // Limpiar intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <section className="px-4 py-12">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <H2 className="text-2xl font-semibold tracking-[0.14em] uppercase text-zinc-800">
          {header.title}
        </H2>
        <P className="mt-3 text-sm text-zinc-700 leading-relaxed">
          {header.subtitle}
        </P>
      </div>

      {/* Carrusel de tarjetas */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none relative"
      >
        {cards.map((card, i) => {
          const Icon = icons[i % icons.length];
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
                <H3 className="text-zinc-700 text-lg font-medium">
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
    </section>
  );
}
