import { Link } from '@tanstack/react-router'
import { useHero } from '../../hooks/useHero'

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

        {/* Izquierda */}
        <div className="absolute inset-y-0 left-0 w-full">
          {left.imagen && (
            <img
              src={left.imagen}
              alt={left.titulo || ''}
              className="absolute inset-0 h-full w-full object-cover
                         [clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]"
            />
          )}
          <div className="absolute inset-0 bg-black/35
                          [clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]" />
        </div>

        {/* Derecha */}
        <div className="absolute inset-y-0 right-0 w-full">
          {right.imagen && (
            <img
              src={right.imagen}
              alt={right.titulo || ''}
              className="absolute inset-0 h-full w-full object-cover
                         [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]"
            />
          )}
          <div className="absolute inset-0 bg-black/35
                          [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]" />
        </div>

        {/* Contenido Izquierdo */}
        <div className="absolute left-0 inset-y-0 w-1/2 flex items-center justify-center text-center px-6 md:px-10">
          <div className="max-w-[420px]">
            <h1 className="uppercase tracking-widest font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {left.titulo}
            </h1>
            {left.subtitulo && (
              <p className="mt-4 text-lg sm:text-xl md:text-2xl tracking-wider">
                {left.subtitulo}
              </p>
            )}
            {left.textoBoton && (
              <Link
                to="/alojamientos"
                className="mt-6 inline-flex items-center justify-center px-7 py-3 rounded-[5px]
                           outline outline-1 outline-offset-[-1px] outline-neutral-50
                           transition hover:bg-white hover:text-zinc-900"
              >
                {left.textoBoton}
              </Link>
            )}
          </div>
        </div>

        {/* Contenido Derecho */}
        <div className="absolute right-0 inset-y-0 w-1/2 flex items-center justify-center text-center px-6 md:px-10">
          <div className="max-w-[420px]">
            <h2 className="uppercase tracking-widest font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {right.titulo}
            </h2>
            {right.subtitulo && (
              <p className="mt-4 text-lg sm:text-xl md:text-2xl tracking-wider">
                {right.subtitulo}
              </p>
            )}
            {right.textoBoton && (
              <Link
                to="/servicios"
                className="mt-6 inline-flex items-center justify-center px-7 py-3 rounded-[5px]
                           outline outline-1 outline-offset-[-1px] outline-neutral-50
                           transition hover:bg-white hover:text-zinc-900"
              >
                {right.textoBoton}
              </Link>
            )}
          </div>
        </div>

        {/* Gradiente general */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </div>
    </section>
  )
}
