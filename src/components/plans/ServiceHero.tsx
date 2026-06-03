import { useState } from "react"
import { H1 } from "@/components/ui/Typography"

export function ServiceHero() {
  const [imageLoaded, setImageLoaded] = useState(false)

  const heroData = {
    titulo: 'GESTIONAMOS TU PROPIEDAD',
    subtitulo: 'Descubrí nuestras modalidades de servicio y elegí la que mejor se adapta a tus necesidades en Costa Rica.',
    imagen: 'https://i.ibb.co/Kck4KrC2/hero-Service.jpg'
  };

  return (
    <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#4f665b] md:h-[60vh] lg:h-[450px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#6f857a_0%,#52655b_44%,#2f3a35_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%)]" />
      <img
        src={heroData.imagen}
        alt="Servicios DMR Rentals"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
          imageLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-[1.03]"
        }`}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 pt-6 text-center md:pt-8 lg:pt-10">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-white/60 rounded" />
            <span className="text-sm text-white/80 uppercase tracking-wide">Servicios</span>
            <div className="h-[1px] w-8 bg-white/60 rounded" />
          </div>
          <H1>
            {heroData.titulo}
          </H1>

          {heroData.subtitulo && (
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-light">
              {heroData.subtitulo}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
