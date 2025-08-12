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
   <div className="relative h-[55vh] min-h-[420px] md:h-[65vh] lg:h-[720px] overflow-hidden">

        {/* ===== Fondos para MOBILE (dos mitades horizontales) ===== */}
        {/* Mitad superior: izquierda */}
        {left.imagen && (
          <div className="absolute inset-x-0 top-0 h-1/2 md:hidden">
            <img
              src={left.imagen}
              alt={left.titulo || ''}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        )}
        {/* Mitad inferior: derecha */}
        {right.imagen && (
          <div className="absolute inset-x-0 bottom-0 h-1/2 md:hidden">
            <img
              src={right.imagen}
              alt={right.titulo || ''}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        )}

        {/* ===== Fondos para DESKTOP (triángulos) ===== */}
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

        {/* ===== Contenido (textos/botones) ===== */}
        {/* Mobile: cada bloque dentro de su mitad */}
        <div className="relative z-10 md:hidden h-full">
          {/* Bloque superior (izquierda) */}
          <div className="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center text-center px-6">
            <div className="max-w-[420px] bg-black/30 rounded-xl p-4">
              <h1 className="uppercase tracking-widest font-medium text-3xl leading-tight">
                {left.titulo}
              </h1>
              {left.subtitulo && (
                <p className="mt-3 text-base tracking-wider">{left.subtitulo}</p>
              )}
              <div className="mt-5">
                <Button asChild size="lg">
                  <Link to="/alojamientos">{left.textoBoton || 'Ver más'}</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bloque inferior (derecha) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center text-center px-6">
            <div className="max-w-[420px] bg-black/30 rounded-xl p-4">
              <h2 className="uppercase tracking-widest font-medium text-3xl leading-tight">
                {right.titulo}
              </h2>
              {right.subtitulo && (
                <p className="mt-3 text-base tracking-wider">{right.subtitulo}</p>
              )}
              <div className="mt-5">
                <Button asChild size="lg">
                  <Link to="/alojamientos">{right.textoBoton || 'Ver más'}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: grid 2 columnas como antes */}
        <div className="relative z-10 hidden md:grid h-full container mx-auto grid-cols-2 place-items-center gap-10 px-6 md:px-10 text-center">
          <div className="max-w-[460px]">
            <h1 className="uppercase tracking-widest font-medium text-5xl lg:text-6xl leading-tight">
              {left.titulo}
            </h1>
            {left.subtitulo && (
              <p className="mt-4 text-2xl tracking-wider">{left.subtitulo}</p>
            )}
            <div className="mt-6">
              <Button asChild size="lg">
                <Link to="/alojamientos">{left.textoBoton || 'Ver más'}</Link>
              </Button>
            </div>
          </div>

          <div className="max-w-[460px]">
            <h2 className="uppercase tracking-widest font-medium text-5xl lg:text-6xl leading-tight">
              {right.titulo}
            </h2>
            {right.subtitulo && (
              <p className="mt-4 text-2xl tracking-wider">{right.subtitulo}</p>
            )}
            <div className="mt-6">
              <Button asChild size="lg">
                <Link to="/alojamientos">{right.textoBoton || 'Ver más'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
