import { useHero } from '../../hooks/useHero'
import HeroBackground from './components/HeroBackground'
import HeroContentDesktop from './components/HeroContentDesktop'
import HeroContentMobile from './components/HeroContentMobile'
import type { HeroItem } from './type'

export default function Hero() {
  const { items, loading, error } = useHero()

  if (loading) return <div className="py-16 text-center">Cargando...</div>
  if (error) return <div className="py-16 text-center text-red-600">{error}</div>
  if (!items.length) return <div className="py-16 text-center">Sin contenido.</div>

  const left: HeroItem = items[0]
  const right: HeroItem = items[1] || items[0]

  return (
    <section className="relative text-white">
      {/* CONTENEDOR ÚNICO: define altura y contexto de posicionamiento */}
      <div className="relative h-[55vh] min-h-[420px] md:h-[65vh] lg:h-[720px] overflow-hidden">
        {/* Fondo en capa absoluta */}
        <HeroBackground left={left} right={right} />

        {/* Contenido sobre el fondo */}
        <HeroContentMobile left={left} right={right} />
        <HeroContentDesktop left={left} right={right} />
      </div>
    </section>
  )
}
