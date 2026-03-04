

import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { H1, P, Small } from '@/components/ui/Typography'

export default function Hero() {
  // Contenido estático del hero
  const leftHero = {
    titulo: 'HUÉSPEDES',
    subtitulo: 'Estancias que se sienten como en casa',
    imagen: 'https://i.ibb.co/KxHH5GvT/Vacation-Homes.jpg',
    link: '/alojamientos',
    textoBoton: 'Ver más'
  }

  const rightHero = {
    titulo: 'PROPIETARIOS',
    subtitulo: 'Tu propiedad, nuestro compromiso',
    imagen: 'https://i.ibb.co/N60Wpphj/hero-2.jpg',
    link: '/servicios',
    textoBoton: 'Ver más'
  }

  return (
    <section className="relative text-white">
      <div className="relative h-[55vh] min-h-[420px] md:h-[65vh] lg:h-[640px] overflow-hidden">
        
        {/* ========== BACKGROUND ========== */}
        <div className="absolute inset-0">
          {/* MOBILE: dos mitades verticales */}
          <div className="absolute inset-x-0 top-0 h-1/2 md:hidden">
            <img 
              src={leftHero.imagen} 
              alt={leftHero.titulo} 
              className="h-full w-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="absolute inset-x-0 bottom-0 h-1/2 md:hidden">
            <img 
              src={rightHero.imagen} 
              alt={rightHero.titulo} 
              className="h-full w-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* DESKTOP: triángulos diagonales */}
          <div className="hidden md:block absolute inset-0">
            <img
              src={leftHero.imagen}
              alt={leftHero.titulo}
              className="absolute inset-0 h-full w-full object-cover [clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]"
            />
            <div className="absolute inset-0 bg-black/40 [clip-path:polygon(0_0,55%_0,45%_100%,0_100%)]" />
            
            <img
              src={rightHero.imagen}
              alt={rightHero.titulo}
              className="absolute inset-0 h-full w-full object-cover [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]"
            />
            <div className="absolute inset-0 bg-black/40 [clip-path:polygon(55%_0,100%_0,100%_100%,45%_100%)]" />
          </div>

          {/* Gradiente global */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/10" />
        </div>

        {/* ========== CONTENT MOBILE ========== */}
        <div className="relative z-10 md:hidden h-full">
          {/* Bloque superior (HUÉSPEDES) */}
          <div className="absolute inset-x-0 top-0 h-1/2 flex items-center justify-center px-4">
            <div
              className="w-[92%] max-w-[360px] rounded-xl border border-white/30 p-4 shadow-md max-h-[88%] overflow-hidden text-white"
              aria-label={`Información para ${leftHero.titulo.toLowerCase()}`}
            >
              <H1 className="uppercase text-[clamp(20px,6.4vw,28px)] leading-tight text-center">
                {leftHero.titulo}
              </H1>

              <P className="mt-2 text-[13px] leading-snug text-center max-h-24 overflow-hidden">
                {leftHero.subtitulo}
              </P>

              <div className="mt-4 flex justify-center">
                <Link to={leftHero.link} aria-label={`Ver ${leftHero.titulo.toLowerCase()}`}>
                  <Button variant="whiteBorder">
                    {leftHero.textoBoton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bloque inferior (PROPIETARIOS) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center px-4">
            <div
              className="w-[92%] max-w-[360px] rounded-xl border border-white/30 p-4 shadow-md max-h-[88%] overflow-hidden text-white"
              aria-label={`Información para ${rightHero.titulo.toLowerCase()}`}
            >
              <H1 className="uppercase text-[clamp(20px,6.4vw,28px)] leading-tight text-center">
                {rightHero.titulo}
              </H1>

              <P className="mt-2 text-[13px] leading-snug text-center max-h-24 overflow-hidden">
                {rightHero.subtitulo}
              </P>

              <div className="mt-4 flex justify-center">
                <Link to={rightHero.link} aria-label={`Ver ${rightHero.titulo.toLowerCase()}`}>
                  <Button variant="whiteBorder">
                    {rightHero.textoBoton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========== CONTENT DESKTOP ========== */}
        <div className="relative z-10 hidden md:grid h-full min-h-[480px] w-full max-w-screen-xl mx-auto grid-cols-2 place-items-center gap-8 px-4 md:px-8 text-center">
          
          {/* Columna izquierda (HUÉSPEDES) */}
          <div className="max-w-full md:max-w-[460px] px-2">
            <H1 className="uppercase">{leftHero.titulo}</H1>

            <P className="mt-3 text-lg lg:text-2xl">{leftHero.subtitulo}</P>

            <div className="mt-5">
              <Link to={leftHero.link}>
                <Button
                  variant="whiteBorder"
                  className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer"
                >
                  <Small>{leftHero.textoBoton}</Small>
                </Button>
              </Link>
            </div>
          </div>

          {/* Columna derecha (PROPIETARIOS) */}
          <div className="max-w-full md:max-w-[460px] px-2">
            <H1 className="uppercase">{rightHero.titulo}</H1>

            <P className="mt-3 text-lg lg:text-2xl">{rightHero.subtitulo}</P>

            <div className="mt-5">
              <Link to={rightHero.link}>
                <Button
                  variant="whiteBorder"
                  className="hover:bg-gray-300 hover:border-gray-300 hover:cursor-pointer"
                >
                  <Small>{rightHero.textoBoton}</Small>
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}