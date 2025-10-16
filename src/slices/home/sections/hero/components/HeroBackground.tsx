import React from 'react'
import type { HeroItem } from '../type';

type Props = { left: HeroItem; right: HeroItem }

const HeroBackground: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div className="absolute inset-0">
      {/* ===== MOBILE: dos mitades ===== */}
      {left.imagen && (
        <div className="absolute inset-x-0 top-0 h-1/2 md:hidden">
          <img src={left.imagen} alt={left.titulo || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      {right.imagen && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 md:hidden">
          <img src={right.imagen} alt={right.titulo || ''} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* ===== DESKTOP: triángulos ===== */}
      <div className="hidden md:block absolute inset-0">
        {left.imagen && (
          <img
            src={left.imagen}
            alt={left.titulo || ''}
            className="absolute inset-0 h-full w-full object-cover md:[clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]"
          />
        )}
        <div className="absolute inset-0 bg-black/40 md:[clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]" />
        {right.imagen && (
          <img
            src={right.imagen}
            alt={right.titulo || ''}
            className="absolute inset-0 h-full w-full object-cover md:[clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]"
          />
        )}
        <div className="absolute inset-0 bg-black/40 md:[clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]" />
      </div>

      {/* Gradiente global más suave */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/10" />
    </div>
  )
})

export default HeroBackground