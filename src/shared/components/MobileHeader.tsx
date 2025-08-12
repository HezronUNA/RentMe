import { Link } from "@tanstack/react-router"
import type { UseNavbar } from "@/shared/hooks/useNavbar"
import Logo from "@/shared/assets/RentMe.jpg"

type Props = {
  nav: UseNavbar
}

export default function MobileHeader({ nav }: Props) {
  const {
    open,
    setOpen,
    openDropMobile,
    setOpenDropMobile,
    isAlojaSectionActive,
    getLinkClass,
    isActive,
  } = nav

  return (
    <div className="md:hidden mx-auto max-w-screen-2xl px-4">
      <div className="h-16 flex items-center justify-between">
        <Link to="/" aria-label="Ir al inicio" className="flex items-center gap-2">
          <img src={Logo} alt="Logo RentME" className="h-10 w-10 object-contain" />
        </Link>
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-md hover:bg-neutral-100"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil con submenú */}
      <div className={`overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col gap-1 pb-4">
          <Link to="/ventas" className={getLinkClass("/ventas") + " px-2 py-2 text-base"}>
            VENTAS
          </Link>

          {/* Alojamientos expandible */}
          <div className="px-2 pt-2">
            <button
              type="button"
              className={(isAlojaSectionActive ? nav.classes.activeLink : nav.classes.inactiveLink) + " text-base flex items-center justify-between w-full py-2"}
              aria-haspopup="menu"
              aria-expanded={openDropMobile}
              onClick={() => setOpenDropMobile((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setOpenDropMobile((v) => !v)
                }
              }}
            >
              <span>ALOJAMIENTOS</span>
              <svg
                className={`w-4 h-4 transition-all duration-300 ${openDropMobile ? "rotate-180" : "rotate-0"} ${
                  isAlojaSectionActive ? "text-[#52655B]" : "text-black"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openDropMobile ? "max-h-32" : "max-h-0"}`}>
              <div className="mt-1 ml-3 border-l pl-3 space-y-1 py-2">
                <Link
                  to="/alojamientos"
                  className={getLinkClass("/alojamientos") + " flex items-center gap-2 py-2 text-base hover:text-[#52655B] transition-colors"}
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-200 ${isActive("/alojamientos") ? "text-[#52655B]" : "text-gray-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Huésped</span>
                </Link>

                <Link
                  to="/servicios"
                  onClick={() => nav.setIsServiciosFromAlojamientos(true)}
                  className={(isActive("/servicios") && nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink) + " flex items-center gap-2 py-2 text-base hover:text-[#52655B] transition-colors"}
                >
                  <svg
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive("/servicios") && nav.isServiciosFromAlojamientos ? "text-[#52655B]" : "text-gray-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Propietario</span>
                </Link>
              </div>
            </div>
          </div>

          <Link to="/nosotros" className={getLinkClass("/nosotros") + " px-2 py-2 text-base"}>
            SOBRE NOSOTROS
          </Link>
          <Link
            to="/servicios"
            onClick={() => nav.setIsServiciosFromAlojamientos(false)}
            className={(isActive("/servicios") && !nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink) + " px-2 py-2 text-base"}
          >
            SERVICIOS
          </Link>
        </nav>
      </div>
    </div>
  )
}
