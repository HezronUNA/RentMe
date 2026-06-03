import { useState } from "react";
import { H1, P } from "@/components/ui/Typography";

export default function AdminHero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const bgImage =
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80";

  return (
    <section className="relative text-white">
      <div className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#4f665b] md:h-[60vh] lg:h-[450px]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#6f857a_0%,#52655b_44%,#2f3a35_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%)]" />
        <img
          src={bgImage}
          alt="Administración de propiedades"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            imageLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-[1.03]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#52655B]/10 to-transparent" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
          <div className="max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-white/60 rounded" />
              <span className="text-sm text-white/80 uppercase tracking-wide">Administración · Modalidades</span>
              <div className="h-[1px] w-8 bg-white/60 rounded" />
            </div>

            <H1>
              Elige cómo trabajamos <em className="italic">juntos</em>
            </H1>

            <P className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-body text-white/90 mt-4">
              Tres modalidades diseñadas para distintos perfiles de propietario. Desde apoyo en Airbnb hasta gestión operativa completa.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}
