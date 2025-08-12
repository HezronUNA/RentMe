import { Link } from '@tanstack/react-router'
import { useHero } from '../../hooks/useHero'
import { Button } from '@/shared/components/button'

export default function Hero() {
  const { items, loading, error } = useHero()

  if (loading) return <div className="py-16 text-center">Cargando...</div>
  if (error) return <div className="py-16 text-center text-red-600">{error}</div>
  if (!items.length) return <div className="py-16 text-center">Sin contenido.</div>

  const left = items[0]
  const right = items[1] || items[0]

  return (
    <section className="relative text-white">
      <div className="relative h-[70vh] min-h-[520px] md:h-[80vh] lg:h-[896px] overflow-hidden">
        {/* ======= BACKGROUNDS ======= */}
        {/* Mobile: una sola imagen */}
        {left.imagen && (
          <img
            src={left.imagen}
            alt={left.titulo || ''}
            className="absolute inset-0 h-full w-full object-cover md:hidden"
          />
        )}

        {/* Desktop: dos imágenes con clip-path */}
        <div className="hidden md:block absolute inset-0">
          {/* Izquierda */}
          {left.imagen && (
            <img
              src={left.imagen}
              alt={left.titulo || ''}
              className="absolute inset-0 h-full w-full object-cover md:[clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]"
            />
          )}
          <div className="absolute inset-0 bg-black/35 md:[clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]" />
          {/* Derecha */}
          {right.imagen && (
            <img
              src={right.imagen}
              alt={right.titulo || ''}
              className="absolute inset-0 h-full w-full object-cover md:[clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]"
            />
          )}
          <div className="absolute inset-0 bg-black/35 md:[clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]" />
        </div>

        {/* Gradiente general */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        {/* ======= FOREGROUND CONTENT ======= */}
        {/* Grid responsive: 1 col en mobile, 2 cols en md+ */}
        <div className="relative z-10 h-full container mx-auto grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 px-6 md:px-10 text-center">
          {/* Bloque izquierdo */}
          <div className="max-w-[420px] md:max-w-[460px] bg-black/30 md:bg-transparent rounded-xl p-4 md:p-0">
            <h1 className="uppercase tracking-widest font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {left.titulo}
            </h1>
            {left.subtitulo && (
              <p className="mt-4 text-base sm:text-lg md:text-2xl tracking-wider">
                {left.subtitulo}
              </p>
            )}
            <div className="mt-6">
              <Button asChild size="lg" variant="default">
                <Link to="/alojamientos">{left.textoBoton || 'Ver más'}</Link>
              </Button>
            </div>
          </div>

          {/* Bloque derecho */}
          <div className="max-w-[420px] md:max-w-[460px] bg-black/30 md:bg-transparent rounded-xl p-4 md:p-0">
            <h2 className="uppercase tracking-widest font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {right.titulo}
            </h2>
            {right.subtitulo && (
              <p className="mt-4 text-base sm:text-lg md:text-2xl tracking-wider">
                {right.subtitulo}
              </p>
            )}
            <div className="mt-6">
              <Button asChild size="lg" variant="default">
                <Link to="/alojamientos">{right.textoBoton || 'Ver más'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
