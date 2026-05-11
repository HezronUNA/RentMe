import { Link } from '@tanstack/react-router'
import { H1 } from '@/components/ui/Typography'

export default function Hero() {
  const leftHero = {
    badge: 'Para huéspedes',
    titulo1: 'Estancias',
    titulo2: 'como en casa',
    subtitulo: 'Alojamientos seleccionados con atención al detalle para que tu estadía sea perfecta.',
    imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
    link: '/alojamientos',
    textoBoton: 'Ver alojamientos',
  }

  const rightHero = {
    badge: 'Para propietarios',
    titulo1: 'Tu propiedad,',
    titulo2: 'nuestro cuidado',
    subtitulo: 'Gestionamos tu inmueble con profesionalismo y transparencia.',
    imagen: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=85',
    link: '/servicios',
    textoBoton: 'Ver servicios',
  }

  const stats = [
    { num: '+10', label: 'Propiedades' },
    { num: '★',   label: 'Calificación' },
    { num: '100%', label: 'Satisfacción' },
    { num: 'CR',  label: 'Costa Rica'  },
  ]

  const btnClass =
    'inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 md:px-6 md:py-3 md:text-sm'

  const badgeClass =
    'inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm'

  return (
    <section className="relative text-white">

      {/* ════════════════ MOBILE ════════════════ */}
      <div className="md:hidden">
        {/* Panel Huéspedes */}
        <div className="relative h-[34vh] min-h-[200px] overflow-hidden">
          <img src={leftHero.imagen} alt={leftHero.badge} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2f3a35]/60 via-[#2f3a35]/30 to-[#2f3a35]/80" />
          <div className="relative flex h-full flex-col px-4 py-3">
            <div className={badgeClass}>{leftHero.badge}</div>
            <div className="mt-auto pb-4 text-center flex flex-col items-center">
              <H1 className="text-white leading-tight tracking-tight text-[1.7rem]">
                {leftHero.titulo1}<br />{leftHero.titulo2}
              </H1>
              <p className="mt-1.5 max-w-[220px] text-[10px] leading-4 text-white/75">{leftHero.subtitulo}</p>
            </div>
            <Link to={leftHero.link} className="mt-auto flex justify-start">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20">
                {leftHero.textoBoton} →
              </button>
            </Link>
          </div>
        </div>

        {/* Panel Propietarios */}
        <div className="relative h-[34vh] min-h-[200px] overflow-hidden">
          <img src={rightHero.imagen} alt={rightHero.badge} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2f3a35]/60 via-[#2f3a35]/30 to-[#2f3a35]/80" />
          <div className="relative flex h-full flex-col px-4 py-3">
            <div className="flex justify-end">
              <div className={badgeClass}>{rightHero.badge}</div>
            </div>
            <div className="mt-auto pb-4 text-center flex flex-col items-center">
              <H1 className="text-white leading-tight tracking-tight text-[1.7rem]">
                {rightHero.titulo1}<br />{rightHero.titulo2}
              </H1>
              <p className="mt-1.5 max-w-[220px] text-[10px] leading-4 text-white/75">{rightHero.subtitulo}</p>
            </div>
            <Link to={rightHero.link} className="mt-auto flex justify-end">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20">
                {rightHero.textoBoton} →
              </button>
            </Link>
          </div>
        </div>
        {/* ... stats móvil igual ... */}
      </div>

      {/* ════════════════ DESKTOP ════════════════ */}
      <div className="relative hidden h-[70vh] overflow-hidden md:block lg:h-[680px]">

        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative overflow-hidden group">
            <img src={leftHero.imagen} alt={leftHero.badge} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2f3a35]/85 via-[#2f3a35]/45 to-transparent" />
          </div>
          <div className="relative overflow-hidden group">
            <img src={rightHero.imagen} alt={rightHero.badge} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#2f3a35]/85 via-[#2f3a35]/45 to-transparent" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/15" />
        <div className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/90">DMR</span>
        </div>

        <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
          <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">DMR Rentals</p>
        </div>

        <div className="absolute inset-0 z-10 grid grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="flex flex-col p-8 lg:p-12 h-full">
            <div className={badgeClass}>{leftHero.badge}</div>
            
            {/* Texto bajado manualmente con mt-32 (ajusta este número si lo quieres más abajo aún) */}
            <div className="mt-32 flex flex-col items-center text-center">
              <H1 className="text-white leading-tight tracking-tight lg:text-5xl">
                {leftHero.titulo1}<br />{leftHero.titulo2}
              </H1>
              <p className="mt-6 max-w-[320px] text-sm leading-6 text-white/70">
                {leftHero.subtitulo}
              </p>
            </div>

            <div className="mt-auto flex justify-start pb-16 lg:pb-20">
              <Link to={leftHero.link}>
                <button className={btnClass}>{leftHero.textoBoton} →</button>
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col p-8 lg:p-12 items-end h-full">
            <div className={badgeClass}>{rightHero.badge}</div>

            {/* Texto bajado manualmente con mt-32 */}
            <div className="mt-32 w-full flex flex-col items-center text-center">
              <H1 className="text-white leading-tight tracking-tight lg:text-5xl">
                {rightHero.titulo1}<br />{rightHero.titulo2}
              </H1>
              <p className="mt-6 max-w-[320px] text-sm leading-6 text-white/70">
                {rightHero.subtitulo}
              </p>
            </div>

            <div className="mt-auto flex justify-end pb-16 lg:pb-20">
              <Link to={rightHero.link}>
                <button className={btnClass}>{rightHero.textoBoton} →</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center border-t border-white/15 bg-white/[0.07] px-4 py-3 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white md:text-xl">{s.num}</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/55 md:text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}