import { useHero } from "@/shared/hooks/useHero";
import { SearchBox } from "./SearchBox";

export function SalesHero() {
  const { items, loading, error } = useHero("sales");

  if (loading) {
    return (
      <div className="relative py-16 md:py-24 lg:py-32 min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center bg-teal-600">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 sm:h-10 md:h-12 bg-white/20 rounded-lg w-4/5 mx-auto" />
            <div className="h-4 sm:h-5 md:h-6 bg-white/20 rounded-lg w-3/5 mx-auto" />
            <div className="h-[120px] sm:h-[100px] md:h-20 bg-white/20 rounded-lg max-w-[900px] w-[95%] mx-auto mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative py-20 min-h-[50vh] flex items-center bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <div className="text-white space-y-4">
            <h2 className="text-2xl font-bold">Error al cargar el contenido</h2>
            <p className="text-teal-100">No se pudo cargar la información del hero.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="relative py-20 min-h-[50vh] flex items-center bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <p className="text-white text-lg">No hay contenido disponible.</p>
        </div>
      </div>
    );
  }

  // ✅ Buscar por id "6" (string). Si no aparece, usar el primero.
  const heroData = items.find((x) => x.id === "6") ?? items[0];

  return (
    <section
      className="relative py-12 md:py-16 min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] flex items-start overflow-hidden"
      style={{
        backgroundImage: heroData.imagen
          ? `url(${heroData.imagen})`
          : "linear-gradient(135deg, #3b5c50 0%, #94a593 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: heroData.imagen ? "overlay" : undefined,
      }}
    >
      {heroData.imagen && <div className="absolute inset-0 bg-black/60" />}

      <div className="relative z-10 w-full px-4 pt-6 md:pt-8">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide text-center">
              {heroData.titulo}
            </h1>

            {heroData.subtitulo && (
              <p className="text-base lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-light text-center">
                {heroData.subtitulo}
              </p>
            )}
          </div>

          {/* Desktop Search Box */}
          <div className="hidden lg:flex justify-center mt-6">
            <SearchBox variant="desktop" />
          </div>

          {/* Mobile Search Box */}
          <div className="lg:hidden mt-4">
            <SearchBox variant="mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
