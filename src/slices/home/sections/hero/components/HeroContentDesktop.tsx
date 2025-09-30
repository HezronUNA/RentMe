import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '../../../../../shared/components/Button'
import type { HeroItem } from '../type'
import { H1, P, Small } from '@/shared/components/Typography'

type Props = {
  left: HeroItem
  right: HeroItem
}

const HeroContentDesktop: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div
      className="
        relative z-10 hidden md:grid 
        h-full min-h-[480px] 
        w-full max-w-screen-xl mx-auto 
        grid-cols-2 place-items-center 
        gap-8 px-4 md:px-8 text-center
      "
    >
      {/* Columna izquierda */}
      <div className="max-w-full md:max-w-[460px] px-2">
        <H1 className="uppercase">{left.titulo}</H1>

        {left.subtitulo && (
          <P className="mt-3 text-lg lg:text-2xl">{left.subtitulo}</P>
        )}

        <div className="mt-5">
          <Link to="/servicios">
            <Button
              variant="whiteBorder"
              className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer"
            >
              <Small>
              {left.textoBoton}
              </Small>
            </Button>
          </Link>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="max-w-full md:max-w-[460px] px-2">
        <H1 className="uppercase">{right.titulo}</H1>

        {right.subtitulo && (
          <P className="mt-3 text-lg lg:text-2xl">{right.subtitulo}</P>
        )}

        <div className="mt-5">
          <Link to="/alojamientos">
            <Button
              variant="whiteBorder"
              className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer"
            >
              <Small>
              {right.textoBoton}
              </Small>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})

export default HeroContentDesktop
