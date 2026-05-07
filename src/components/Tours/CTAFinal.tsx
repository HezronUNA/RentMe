import { H2, P } from "@/components/ui/Typography";
import { useEffect, useRef, useState } from "react";

export default function CTAFinal() {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-white" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#e7eee9]/55 blur-3xl" />
        <div className="absolute right-[-8rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#f1e8dc]/65 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#52655B]/10" />
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#52655B]/10" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <article
          ref={blockRef}
          className={`relative overflow-hidden rounded-[2rem] border border-[#52655B]/20 bg-white/85 px-6 py-12 text-center shadow-[0_20px_50px_rgba(82,101,91,0.10)] backdrop-blur-sm transition-all duration-700 md:px-12 md:py-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#52655B]/8 to-transparent" />

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#52655B]">
            Cierre de experiencia
          </p>

          <H2 className="mx-auto max-w-3xl text-3xl leading-tight tracking-normal text-[#2f3a35] md:text-5xl">
            ¿Listo para tu <em className="font-medium italic text-[#52655B]">aventura</em>?
          </H2>

          <div className="mx-auto mt-5 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#52655B]/55 to-transparent" />

          <P className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#4b5c54] md:text-lg">
            Reserva tu tour directamente con nuestros socios de confianza. Atención personalizada 24/7 para que tu estadía sea perfecta.
          </P>

          <button
            onClick={() => window.open("https://p.localbird.io/rentmecr-san-jose/discover", "_blank")}
            className="group relative mt-8 inline-flex items-center gap-3 rounded-full border border-[#52655B] bg-[#52655B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(82,101,91,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3f4f47] hover:shadow-[0_18px_32px_rgba(82,101,91,0.45)] md:mt-10 md:px-8 md:py-4 md:text-base"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
            Explorar todos los tours
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </article>
      </div>
    </section>
  );
}
