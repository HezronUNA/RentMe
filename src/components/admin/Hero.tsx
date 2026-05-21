import { H1, P } from "@/components/ui/Typography";

export default function AdminHero() {

  const bgImage =
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80";

  return (
    <section className="relative text-white">
      <div className="relative h-[70vh] min-h-[400px] md:h-[60vh] lg:h-[450px] flex items-center justify-center overflow-hidden">
        <img
          src={bgImage}
          alt="Administración de propiedades"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
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
