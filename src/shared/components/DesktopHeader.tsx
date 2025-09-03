import { Link } from "@tanstack/react-router"
import type { UseNavbar } from "@/shared/hooks/useNavbar"
import Logo from "@/shared/assets/RentMe.jpg"
import { Small } from "./Typography"

type Props = {
  nav: UseNavbar
}

export default function DesktopHeader({ nav }: Props) {
  const {
    getLinkClass,
    isActive,
    isAlojaSectionActive,
    openDrop,
    setOpenDrop,
    setIsServiciosFromAlojamientos,
    dropRef,
  } = nav

  return (
    <div className="mx-auto max-w-screen-2xl hidden md:block">
      <div className="h-32 inline-flex w-full justify-center items-center gap-12">
        {/* Izquierda */}
        <div className="flex items-center justify-start gap-12">
          <Link to="/ventas" className={`${getLinkClass("/ventas")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">VENTAS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>

          {/* Alojamientos con dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              type="button"
              className={(isAlojaSectionActive ? nav.classes.activeLink : nav.classes.inactiveLink) + " flex items-center gap-2.5 p-2 group relative"}
              aria-haspopup="menu"
              aria-expanded={openDrop}
              onClick={() => setOpenDrop((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setOpenDrop((v) => !v)
                }
              }}
            >
              <Small className="uppercase tracking-wide relative z-10">ALOJAMIENTOS</Small>
              <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
              <svg
                className={`w-4 h-4 transition-all duration-300 ${openDrop ? "rotate-180" : "rotate-0"} ${
                  isAlojaSectionActive || openDrop ? "text-[#52655B]" : "text-black group-hover:text-[#52655B]"} `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Panel dropdown */}
            <div
              role="menu"
              aria-label="Opciones de alojamientos"
              className={`absolute left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl bg-white border border-gray-200/50
                          shadow-xl shadow-black/10 backdrop-blur-sm overflow-hidden
                          transition-all duration-300 ease-out origin-top
                          ${openDrop ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-2"}`}
            >
              <div className="bg-gradient-to-br from-[#52655B]/5 to-transparent p-1">
                <nav className="flex flex-col">
                  <Link
                    to="/alojamientos"
                    className={`relative px-5 py-4 text-sm font-medium transition-all duration-200 
                                rounded-lg mx-1 my-0.5 group overflow-hidden
                                ${isActive("/alojamientos") ? "text-[#52655B] bg-[#52655B]/10" : "text-gray-700 hover:text-[#52655B] hover:bg-[#52655B]/5"}`}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-4 h-4 transition-colors duration-200 ${isActive("/alojamientos") ? "text-[#52655B]" : "text-gray-400 group-hover:text-[#52655B]"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <Small className="tracking-wide">Huésped</Small>
                    </div>
                  </Link>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />

                  <Link
                    to="/servicios"
                    onClick={() => setIsServiciosFromAlojamientos(true)}
                    className={`relative px-5 py-4 text-sm font-medium transition-all duration-200 
                                rounded-lg mx-1 my-0.5 group overflow-hidden
                                ${isActive("/servicios") && nav.isServiciosFromAlojamientos ? "text-[#52655B] bg-[#52655B]/10" : "text-gray-700 hover:text-[#52655B] hover:bg-[#52655B]/5"}`}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isActive("/servicios") && nav.isServiciosFromAlojamientos ? "text-[#52655B]" : "text-gray-400 group-hover:text-[#52655B]"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <Small className="tracking-wide">Propietario</Small>
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <Link to="/" aria-label="Ir al inicio" className="block">
          <img src={Logo} alt="Logo RentME" className="h-28 w-28 object-contain" />
        </Link>

        {/* Derecha */}
        <div className="flex items-center justify-start gap-12">
          <Link to="/nosotros" className={`${getLinkClass("/nosotros")} relative group`}>
            <Small className="uppercase tracking-wide relative z-10">SOBRE NOSOTROS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
          <Link
            to="/servicios"
            onClick={() => nav.setIsServiciosFromAlojamientos(false)}
            className={`${nav.isActive("/servicios") && !nav.isServiciosFromAlojamientos ? nav.classes.activeLink : nav.classes.inactiveLink} relative group`}
          >
            <Small className="uppercase tracking-wide relative z-10">SERVICIOS</Small>
            <span className="absolute inset-0 bg-[#52655B]/10 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left rounded-lg"></span>
          </Link>
        </div>
      </div>
    </div>
  )
}
