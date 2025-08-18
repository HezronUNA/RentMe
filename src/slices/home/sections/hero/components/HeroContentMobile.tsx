import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/button'
import type { HeroItem } from '../type';

type Props = { left: HeroItem; right: HeroItem }

const HeroContentMobile: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div className="relative z-10 md:hidden h-full">
      {/* Bloque superior (izq) */}
      <div className="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center px-4">
        <div
          className="
            w-[92%] max-w-[340px] bg-black/30 rounded-lg
            p-3
            /* asegura no salirse de la mitad */
            max-h-[86%] overflow-hidden
            backdrop-blur-[1px]
          "
        >
          <h1
            className="
              uppercase tracking-widest font-medium
              /* clamp de fuente para móviles angostos */
              text-[clamp(18px,6vw,26px)]
              leading-tight
              text-center
            "
          >
            {left.titulo}
          </h1>

          {left.subtitulo && (
            <p
              className="
                mt-2
                text-[13px] leading-snug
                text-center
                /* evita crecer demasiado en SE */
                max-h-24 overflow-hidden
              "
            >
              {left.subtitulo}
            </p>
          )}

          <div className="mt-4 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-9 px-4 text-sm md:h-10 md:px-6" /* botón más compacto en SE */
            >
              <Link to="/alojamientos">{left.textoBoton || 'Ver más'}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bloque inferior (der) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center px-4">
        <div
          className="
            w-[92%] max-w-[340px] bg-black/30 rounded-lg
            p-3
            max-h-[86%] overflow-hidden
            backdrop-blur-[1px]
          "
        >
          <h2
            className="
              uppercase tracking-widest font-medium
              text-[clamp(18px,6vw,26px)]
              leading-tight
              text-center
            "
          >
            {right.titulo}
          </h2>

          {right.subtitulo && (
            <p className="mt-2 text-[13px] leading-snug text-center max-h-24 overflow-hidden">
              {right.subtitulo}
            </p>
          )}

          <div className="mt-4 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-9 px-4 text-sm md:h-10 md:px-6"
            >
              <Link to="/alojamientos">{right.textoBoton || 'Ver más'}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HeroContentMobile
