import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/components/button'
import type { HeroItem } from '../type'

type Props = {
  left: HeroItem
  right: HeroItem
}

 const HeroContentDesktop: React.FC<Props> = React.memo(({ left, right }) => {
  return (
    <div className="relative z-10 hidden md:grid h-full container mx-auto grid-cols-2 place-items-center gap-10 px-6 md:px-10 text-center">
      <div className="max-w-[460px]">
        <h1 className="uppercase tracking-widest font-medium text-5xl lg:text-6xl leading-tight">
          {left.titulo}
        </h1>
        {left.subtitulo && <p className="mt-4 text-2xl tracking-wider">{left.subtitulo}</p>}
        <div className="mt-6">
          <Button className='hover:bg-gray-300 hover:border-gray-300' asChild size="lg">
            <Link to="/alojamientos">{left.textoBoton || 'Ver más'}</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-[460px]">
        <h2 className="uppercase tracking-widest font-medium text-5xl lg:text-6xl leading-tight">
          {right.titulo}
        </h2>
        {right.subtitulo && <p className="mt-4 text-2xl tracking-wider">{right.subtitulo}</p>}
        <div className="mt-6">
          <Button className='hover:bg-gray-300 hover:border-gray-300' asChild size="lg">
            <Link to="/alojamientos">{right.textoBoton || 'Ver más'}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
})

export default HeroContentDesktop
