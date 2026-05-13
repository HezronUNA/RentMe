import { Link } from "@tanstack/react-router"
import type { UseNavbar } from "@/hooks/useNavbar"
import { Small } from "@/components/ui/Typography"

type Props = {
  nav: UseNavbar
}

export default function DesktopHeader({ nav }: Props) {
  const {
    getLinkClass,
  } = nav

  return (
    <div className="mx-auto max-w-screen-2xl hidden md:block">
      <div className="h-24 w-full grid grid-cols-3 items-center px-6">
        {/* Left nav (right-aligned) */}
        <nav className="flex justify-end items-center gap-4">
          <Link to="/tours" className={`${getLinkClass("/tours")}`}>
            <Small className="uppercase tracking-wide">TOURS</Small>
          </Link>

          <Link to="/ventas" className={`${getLinkClass("/ventas")}`}>
            <Small className="uppercase tracking-wide">VENTAS</Small>
          </Link>

          <Link to="/alojamientos" className={`${getLinkClass("/alojamientos")}`}>
            <Small className="uppercase tracking-wide">ALOJAMIENTOS</Small>
          </Link>
        </nav>

        {/* Center logo */}
        <div className="flex justify-center">
          <Link to="/" aria-label="Ir al inicio" className="block">
            <img src="https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png" alt="Logo RentME" className="h-20 w-20 object-contain" />
          </Link>
        </div>

        {/* Right nav (left-aligned) */}
        <nav className="flex justify-start items-center gap-4">
          <Link to="/nosotros" className={`${getLinkClass("/nosotros")}`}>
            <Small className="uppercase tracking-wide">SOBRE NOSOTROS</Small>
          </Link>

          {/* SERVICIOS DROPDOWN - Contenedor unificado */}
          <div className="relative group py-1">
            {/* Botón SERVICIOS */}
            <Link to="/servicios" className={`${nav.isActive("/servicios") && !nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink} rounded-full px-3 py-2 transition-all duration-200 inline-block`}>
              <Small className="uppercase tracking-wide">SERVICIOS</Small>
            </Link>

            {/* Dropdown - Contenedor unificado con hover */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50 pt-1">
              <div className="bg-gradient-to-br from-[#52655B]/10 via-[#52655B]/5 to-[#52655B]/10 rounded-2xl shadow-lg backdrop-blur-sm border border-[#52655B]/10 overflow-hidden">
                
                {/* Items container */}
                <div className="px-6 pb-6 pt-4 space-y-3 transition-opacity duration-150">
                {/* Administración de propiedades */}
                <a
                  href="/servicios#gestion-alojamientos"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white hover:shadow-md transition-colors duration-150"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#52655B] to-[#52655B]/80 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#52655B]">Administración</p>
                    <p className="text-xs text-[#52655B]/60">de propiedades</p>
                  </div>
                </a>

                {/* Venta de propiedades */}
                <a
                  href="/servicios#venta-propiedades"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white hover:shadow-md transition-colors duration-150"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#52655B] to-[#52655B]/80 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0118 0v.75c0 1.657 1.344 3 3 3H21a.75.75 0 00.75-.75V12a9 9 0 00-9-9h-.75a3 3 0 00-3 3v.75a3 3 0 00-3-3H3a9 9 0 000 18h.75a3 3 0 003-3v-.75a9.066 9.066 0 00-3-6.75z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#52655B]">Venta</p>
                    <p className="text-xs text-[#52655B]/60">de propiedades</p>
                  </div>
                </a>

                {/* Fotografía y Video */}
                <a
                  href="/servicios#fotografia-video"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white hover:shadow-md transition-colors duration-150"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#52655B] to-[#52655B]/80 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#52655B]">Fotografía</p>
                    <p className="text-xs text-[#52655B]/60">y Video</p>
                  </div>
                </a>

                {/* Limpieza */}
                <a
                  href="/servicios#limpieza-profesional"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 hover:bg-white hover:shadow-md transition-colors duration-150"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#52655B] to-[#52655B]/80 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#52655B]">Limpieza</p>
                    <p className="text-xs text-[#52655B]/60">profesional</p>
                  </div>
                </a>
              </div>
            </div>
            </div>
          </div>

          <Link to="/administracion" className={`${getLinkClass("/administracion")}`}>
            <Small className="uppercase tracking-wide">ADMINISTRACIÓN</Small>
          </Link>
        </nav>
      </div>
    </div>
  )
}


