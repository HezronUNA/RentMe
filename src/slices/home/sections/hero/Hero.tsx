import { Skeleton } from '@/shared/components/Skeleton'
import { useHero } from '../../../../shared/hooks/useHero'
import HeroBackground from './components/HeroBackground'
import HeroContentDesktop from './components/HeroContentDesktop'
import HeroContentMobile from './components/HeroContentMobile'
import type { HeroItem } from './type'

export default function Hero() {
  const { items, loading, error } = useHero("")

  if (loading) {
    return (
      <section className="relative text-white">
        <div className="relative h-[55vh] min-h-[420px] md:h-[65vh] lg:h-[640px] overflow-hidden">
          {/* Skeleton background */}
          <div className="absolute inset-0">
            <Skeleton className="h-100 w-full rounded-none" />
          </div>

          {/* Skeleton content overlay */}
          <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-10">
            <div className="max-w-md text-center space-y-4">
              <Skeleton className="h-10 w-3/4 mx-auto" /> {/* título */}
              <Skeleton className="h-6 w-2/3 mx-auto" />  {/* subtítulo */}
              <Skeleton className="h-10 w-32 mx-auto mt-4 rounded-md" /> {/* botón */}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) return <div className="py-16 text-center text-red-600">{error}</div>
  if (!items.length) return <div className="py-16 text-center">Sin contenido.</div>

  const left: HeroItem = items[1]
  const right: HeroItem = items[2] || items[1]

  return (
    <section className="relative text-white">
      <div className="relative h-[55vh] min-h-[420px] md:h-[65vh] lg:h-[640px] overflow-hidden">
        <HeroBackground left={left} right={right} />
        <HeroContentMobile left={left} right={right} />
        <HeroContentDesktop left={left} right={right} />
      </div>
    </section>
  )
}
