import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '../../../../../shared/components/Button'
import type { HeroItem } from '../type'
import { H1, P } from '@/shared/components/Typography'

type Props = { left: HeroItem; right: HeroItem }

const HeroContentMobile: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div className="relative z-10 md:hidden h-full">
      {/* Bloque superior (izq) */}
      <div className="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center px-4">
        <div
          className="
            w-[92%] max-w-[360px] rounded-xl
            bg-black/35 backdrop-blur-sm
            p-4 shadow-md
            max-h-[88%] overflow-hidden
            text-white
          "
          aria-label="Información para huéspedes"
        >
          <H1 className="uppercase text-[clamp(20px,6.4vw,28px)] leading-tight text-center">
            {left.titulo}
          </H1>

          {left.subtitulo && (
            <P
              className="
                mt-2 text-[13px] leading-snug text-center
                max-h-24 overflow-hidden
              "
            >
              {left.subtitulo}
            </P>
          )}

          <div className="mt-4 flex justify-center">
            <Link to="/alojamientos" aria-label="Ver alojamientos">
              <Button variant="whiteBorder">{left.textoBoton || 'Ver más'}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bloque inferior (der) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center px-4">
        <div
          className="
            w-[92%] max-w-[360px] rounded-xl
            bg-black/35 backdrop-blur-sm
            p-4 shadow-md
            max-h-[88%] overflow-hidden
            text-white
          "
          aria-label="Información para propietarios"
        >
          <H1 className="uppercase text-[clamp(20px,6.4vw,28px)] leading-tight text-center">
            {right.titulo}
          </H1>

          {right.subtitulo && (
            <P className="mt-2 text-[13px] leading-snug text-center max-h-24 overflow-hidden">
              {right.subtitulo}
            </P>
          )}

          <div className="mt-4 flex justify-center">
            <Link to="/alojamientos" aria-label="Ver alojamientos">
              <Button variant="whiteBorder">{right.textoBoton || 'Ver más'}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

export default HeroContentMobile
