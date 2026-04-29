import { H1 } from "@/components/ui/Typography"

export function ServiceHero() {
  // Contenido estático del hero
  const heroData = {
    titulo: 'GESTIONAMOS TU PROPIEDAD COMO SI FUERA NUESTRA',
    subtitulo: 'Descubrí nuestras modalidades de servicio y elegí la que mejor se adapta a tus necesidades.',
    imagen: 'https://i.ibb.co/Kck4KrC2/hero-Service.jpg'
  };

  return (
    <section
      className="relative py-20 min-h-[50vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: heroData.imagen
          ? `url(${heroData.imagen})`
          : "linear-gradient(135deg, #3b5c50 0%, #94a593 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: heroData.imagen ? "overlay" : undefined,
      }}
    >
      {/* Overlay solo si hay imagen */}
      {heroData.imagen && (
        <div className="absolute inset-0 bg-black/60"></div>
      )}

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
