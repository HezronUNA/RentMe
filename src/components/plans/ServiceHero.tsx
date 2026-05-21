import { H1 } from "@/components/ui/Typography"

export function ServiceHero() {
  const heroData = {
    titulo: 'GESTIONAMOS TU PROPIEDAD COMO SI FUERA NUESTRA',
    subtitulo: 'Descubrí nuestras modalidades de servicio y elegí la que mejor se adapta a tus necesidades.',
    imagen: 'https://i.ibb.co/Kck4KrC2/hero-Service.jpg'
  };

  return (
    <section className="relative h-[70vh] min-h-[400px] md:h-[60vh] lg:h-[450px] flex items-center justify-center overflow-hidden">
      <img
        src={heroData.imagen}
        alt="Servicios DMR Rentals"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full text-center">
        <div className="space-y-6">
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
