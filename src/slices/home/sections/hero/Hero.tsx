
import HeroBackground from './components/HeroBackground'
import HeroContentDesktop from './components/HeroContentDesktop'
import HeroContentMobile from './components/HeroContentMobile'
import type { HeroItem } from './type'

export default function Hero() {
  // Contenido estático de los heroes
  const left: HeroItem = {
    id: '0',
    titulo: 'HUÉSPEDES',
    subtitulo: 'Estancias que se sienten como en casa',
    imagen: 'https://i.ibb.co/KxHH5GvT/Vacation-Homes.jpg',
    seccion: 'home',
    link: '/alojamientos',
    textoBoton: 'Ver más'
  }

  const right: HeroItem = {
    id: '1',
    titulo: 'PROPIETARIOS',
    subtitulo: 'Tu propiedad, nuestro compromiso',
    imagen: 'https://i.ibb.co/N60Wpphj/hero-2.jpg',
    seccion: 'home',
    link: '/servicios',
    textoBoton: 'Ver más'
  }

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


