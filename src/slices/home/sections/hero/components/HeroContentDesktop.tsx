import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/Button'
import type { HeroItem } from '../type'

type Props = {
  left: HeroItem
  right: HeroItem
}

const HeroContentDesktop: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div className="
      relative z-10 hidden md:grid 
      h-full min-h-[480px] 
      w-full max-w-screen-xl mx-auto 
      grid-cols-2 place-items-center 
      gap-8 px-4 md:px-8 text-center
    ">
      <div className="max-w-full md:max-w-[460px] px-2">
        <h1 className="uppercase font-title font-medium text-4xl lg:text-5xl">
          {left.titulo}
        </h1>
        {left.subtitulo && (
          <p className="mt-3 font-body text-lg lg:text-2xl">
            {left.subtitulo}
          </p>
        )}
        <div className="mt-5">
          <Link to="/servicios">
            <Button variant="whiteBorder" className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer">
              {left.textoBoton}
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-full md:max-w-[460px] px-2">
        <h2 className="uppercase font-title font-medium text-4xl lg:text-5xl ">
          {right.titulo}
        </h2>
        {right.subtitulo && (
          <p className="mt-3 font-body text-lg lg:text-2xl">
            {right.subtitulo}
          </p>
        )}
        <div className="mt-5">
          <Link to="/alojamientos">
            <Button variant="whiteBorder" className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer">
              {right.textoBoton}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})

export default HeroContentDesktop
