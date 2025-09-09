import { useHero } from "@/shared/hooks/useHero"


  export function ServiceHero() {
  const { items , loading, error  } = useHero("")

  if (loading) {
    return (
      <div className={`relative py-20 min-h-[50vh] flex items-center bg-teal-600 `}>
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <div className="space-y-6 animate-pulse">
            <div className="h-12 bg-white/20 rounded-lg w-4/5 mx-auto"></div>
            <div className="h-6 bg-white/20 rounded-lg w-3/5 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`relative py-20 min-h-[50vh] flex items-center bg-teal-600 `}>
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <div className="text-white space-y-4">
            <h2 className="text-2xl font-bold">Error al cargar el contenido</h2>
            <p className="text-teal-100">No se pudo cargar la información del hero.</p>
        
          </div>
        </div>
      </div>
    )
  }

  if (!items) {
    return (
      <div className={`relative py-20 min-h-[50vh] flex items-center bg-teal-600 `}>
        <div className="max-w-4xl mx-auto px-4 w-full text-center">
          <p className="text-white text-lg">No hay contenido disponible.</p>
        </div>
      </div>
    )
  }

  return (
    <section
      className="relative py-20 min-h-[50vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: items[4].imagen
          ? `url(${items[4].imagen})`
          : "linear-gradient(135deg, #3b5c50 0%, #94a593 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: items[4].imagen ? "overlay" : undefined,
      }}
    >
      {/* Overlay solo si hay imagen */}
      {items[4].imagen && (
        <div className="absolute inset-0 bg-black/60"></div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full text-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide">
            {items[4].titulo}
          </h1>

          {items[4].subtitulo && (
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-light">
              {items[4].subtitulo}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}