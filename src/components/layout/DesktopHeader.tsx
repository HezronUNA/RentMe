import { Link, useNavigate } from "@tanstack/react-router"
import type { UseNavbar } from "@/hooks/useNavbar"
import { Small } from "@/components/ui/Typography"

type Props = {
  nav: UseNavbar
  scrolled: boolean
}

function isTransparent(nav: UseNavbar, scrolled: boolean) {
  return nav.pathname === "/" && !scrolled
}

function linkClass(nav: UseNavbar, scrolled: boolean, path: string) {
  if (!isTransparent(nav, scrolled)) return nav.getLinkClass(path)

  const active = nav.isActive(path)
  return (
    "relative rounded-full px-4 py-2 transition-colors duration-300 " +
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 " +
    (active
      ? "text-white bg-white/15 font-medium"
      : "text-white hover:text-white hover:bg-white/10")
  )
}

function serviciosLinkClass(nav: UseNavbar, scrolled: boolean) {
  const active = nav.isActive("/servicios") && !nav.isServiciosFromAlojamientos
  if (!isTransparent(nav, scrolled)) {
    return (active ? nav.classes.activeLink : nav.classes.inactiveLink) +
      " rounded-full px-3 py-2 transition-all duration-200 inline-block"
  }
  return (
    "relative rounded-full px-3 py-2 transition-all duration-200 inline-block " +
    "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 " +
    (active
      ? "text-white bg-white/15 font-medium"
      : "text-white/80 hover:text-white hover:bg-white/10")
  )
}



export default function DesktopHeader({ nav, scrolled }: Props) {
  const transparent = isTransparent(nav, scrolled)

  const navigate = useNavigate()
  const handleCTA = () => {
    navigate({ to: "/alojamientos" })
    }

  const pillBg = transparent
    ? "bg-white/05 backdrop-blur-xl"
    : nav.pathname === "/"
      ? "bg-white/85 backdrop-blur-xl shadow-xl"
      : "bg-white/85 backdrop-blur-xl shadow-xl"

  return (
    <div className="hidden md:block">
      <div className="mx-auto max-w-[1300px] mt-2 px-4">
        <div className={`rounded-full px-8 transition-all duration-300 ${pillBg}`}>
          <div className={`flex items-center justify-between transition-all duration-300 ${
            transparent ? "h-16" : "h-16"
          }`}>
            {/* Logo left */}
            <div className="flex-shrink-0">
              <Link to="/" aria-label="Ir al inicio">
                <img
                  src="https://res.cloudinary.com/dxrzwnjee/image/upload/v1778856029/yqzckajrawylryjuefi4.avif"
                  alt="Logo RentME"
                  className={`object-contain transition-all duration-300 ${
                    transparent ? "h-11 w-11 brightness-0 invert" : "h-9 w-9"
                  }`}
                />
              </Link>
            </div>

            {/* Center nav */}
            <nav className="flex items-center gap-4">
              <Link to="/tours" className={linkClass(nav, scrolled, "/tours")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">TOURS</Small>
              </Link>

              <Link to="/ventas" className={linkClass(nav, scrolled, "/ventas")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">VENTAS</Small>
              </Link>

              <Link to="/alojamientos" className={linkClass(nav, scrolled, "/alojamientos")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">ALOJAMIENTOS</Small>
              </Link>

              <Link to="/nosotros" className={linkClass(nav, scrolled, "/nosotros")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">SOBRE NOSOTROS</Small>
              </Link>

              {/* SERVICIOS DROPDOWN */}
              <div className="relative group py-1">
                <Link
                  to="/servicios"
                  className={serviciosLinkClass(nav, scrolled)}
                >
                  <Small className="uppercase tracking-wide whitespace-nowrap text-xs">SERVICIOS</Small>
                </Link>

                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-80 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50 pt-1">
                  <div className="bg-gradient-to-br from-[#52655B]/10 via-[#52655B]/5 to-[#52655B]/10 rounded-2xl shadow-lg backdrop-blur-sm border border-[#52655B]/10 overflow-hidden">
                    <div className="px-6 pb-6 pt-4 space-y-3 transition-opacity duration-150">
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

              <Link to="/administracion" className={linkClass(nav, scrolled, "/administracion")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">ADMINISTRACIÓN</Small>
              </Link>
            </nav>

            {/* CTA right */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={handleCTA}
                className={`rounded-full px-5 py-2 font-medium transition-all duration-300 flex items-center hover:cursor-pointer hover:scale-105 gap-2 text-sm whitespace-nowrap ${
                  transparent
                    ? "border border-white/30 text-white hover:bg-white/10"
                    : "bg-[#52655B] text-white hover:bg-[#52655B]/90 shadow-lg"
                }`}
              >
                Reservar ahora →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


