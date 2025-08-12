import { Link, useRouterState } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import Logo from "../../shared/assets/RentMe.jpg"

const linkBase =
  "relative transition-colors duration-300 " +
  "after:content-[''] after:absolute after:-bottom-1 after:left-0 " +
  "after:h-[1px] after:bg-[#8B8C6E] after:transition-all after:duration-300"

const inactiveLink = linkBase + " text-black after:w-0 hover:after:w-full hover:text-[#8B8C6E]"
const activeLink   = linkBase + " text-[#8B8C6E] after:w-full font-medium"

export default function Header() {
  const [open, setOpen] = useState(false)            // menú móvil
  const [openDrop, setOpenDrop] = useState(false)    // dropdown Alojamientos (desktop)
  const [openDropMobile, setOpenDropMobile] = useState(false) // dropdown Alojamientos (mobile)
  const [isServiciosFromAlojamientos, setIsServiciosFromAlojamientos] = useState(false) // rastrear contexto
  const router = useRouterState()
  const dropRef = useRef<HTMLDivElement>(null)
  const pathname = router.location.pathname

  useEffect(() => {
    setOpen(false)
    setOpenDrop(false)
    setOpenDropMobile(false)
    // Resetear el contexto de servicios si navegamos a otra ruta que no sea servicios
    if (pathname !== "/servicios") {
      setIsServiciosFromAlojamientos(false)
    }
  }, [router.location.href, pathname])

  // cerrar dropdown por click fuera
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dropRef.current) return
      if (!dropRef.current.contains(e.target as Node)) setOpenDrop(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDrop(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const isActive = (path: string) => pathname === path
  // "Alojamientos" solo se considera activo si estás en /alojamientos
  // O si estás en /servicios pero llegaste desde el dropdown de alojamientos
  const isAlojaSectionActive = pathname.startsWith("/alojamientos") || 
    (pathname === "/servicios" && isServiciosFromAlojamientos)

  const getLinkClass = (path: string) =>
    isActive(path) ? activeLink : inactiveLink

  return (
    <header className="w-full sticky top-0 z-50 bg-neutral-50 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
      {/* Desktop */}
      <div className="mx-auto max-w-screen-2xl hidden md:block">
        <div className="h-32 inline-flex w-full justify-center items-center gap-12">
          {/* Izquierda */}
          <div className="flex items-center justify-start gap-12">
            <Link to="/ventas" className={getLinkClass("/ventas")}>
              VENTAS
            </Link>

            {/* Alojamientos con dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                type="button"
                className={(isAlojaSectionActive ? activeLink : inactiveLink) + " flex items-center gap-2.5 p-2 group"}
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
                ALOJAMIENTOS
                <svg
                  className={`w-4 h-4 transition-all duration-300 ${
                    openDrop ? "rotate-180" : "rotate-0"
                  } ${
                    isAlojaSectionActive || openDrop ? "text-[#8B8C6E]" : "text-black group-hover:text-[#8B8C6E]"
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

              {/* Panel del dropdown */}
              <div
                role="menu"
                aria-label="Opciones de alojamientos"
                className={`absolute left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl bg-white border border-gray-200/50
                           shadow-xl shadow-black/10 backdrop-blur-sm overflow-hidden
                           transition-all duration-300 ease-out origin-top
                           ${openDrop ? 
                             "opacity-100 scale-100 translate-y-0" : 
                             "pointer-events-none opacity-0 scale-95 -translate-y-2"
                           }`}
              >
                <div className="bg-gradient-to-br from-[#8B8C6E]/5 to-transparent p-1">
                  <nav className="flex flex-col">
                    <Link
                      to="/alojamientos"
                      className={`relative px-5 py-4 text-sm font-medium transition-all duration-200 
                                 rounded-lg mx-1 my-0.5 group overflow-hidden
                                 ${isActive("/alojamientos") ? 
                                   "text-[#8B8C6E] bg-[#8B8C6E]/10" : 
                                   "text-gray-700 hover:text-[#8B8C6E] hover:bg-[#8B8C6E]/5"
                                 }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg 
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isActive("/alojamientos") ? "text-[#8B8C6E]" : "text-gray-400 group-hover:text-[#8B8C6E]"
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Huésped</span>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r from-[#8B8C6E]/10 to-transparent 
                                     transition-all duration-300 -translate-x-full group-hover:translate-x-0`} />
                    </Link>
                    
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />
                    
                    <Link
                      to="/servicios"
                      onClick={() => setIsServiciosFromAlojamientos(true)}
                      className={`relative px-5 py-4 text-sm font-medium transition-all duration-200 
                                 rounded-lg mx-1 my-0.5 group overflow-hidden
                                 ${isActive("/servicios") && isServiciosFromAlojamientos ? 
                                   "text-[#8B8C6E] bg-[#8B8C6E]/10" : 
                                   "text-gray-700 hover:text-[#8B8C6E] hover:bg-[#8B8C6E]/5"
                                 }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg 
                          className={`w-4 h-4 transition-colors duration-200 ${
                            isActive("/servicios") && isServiciosFromAlojamientos ? "text-[#8B8C6E]" : "text-gray-400 group-hover:text-[#8B8C6E]"
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Propietario</span>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r from-[#8B8C6E]/10 to-transparent 
                                     transition-all duration-300 -translate-x-full group-hover:translate-x-0`} />
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
            <Link to="/nosotros" className={getLinkClass("/nosotros")}>
              SOBRE NOSOTROS
            </Link>
            <Link 
              to="/servicios" 
              onClick={() => setIsServiciosFromAlojamientos(false)}
              className={isActive("/servicios") && !isServiciosFromAlojamientos ? activeLink : inactiveLink}
            >
              SERVICIOS
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile */}
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

            {/* Alojamientos con dropdown expandible */}
            <div className="px-2 pt-2">
              <button
                type="button"
                className={(isAlojaSectionActive ? activeLink : inactiveLink) + " text-base flex items-center justify-between w-full py-2"}
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
                  className={`w-4 h-4 transition-all duration-300 ${
                    openDropMobile ? "rotate-180" : "rotate-0"
                  } ${
                    isAlojaSectionActive ? "text-[#8B8C6E]" : "text-black"
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
              
              {/* Submenu expandible */}
              <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                openDropMobile ? "max-h-32" : "max-h-0"
              }`}>
                <div className="mt-1 ml-3 border-l pl-3 space-y-1 py-2">
                  <Link 
                    to="/alojamientos" 
                    className={getLinkClass("/alojamientos") + " flex items-center gap-2 py-2 text-base hover:text-[#8B8C6E] transition-colors"}
                  >
                    <svg 
                      className={`w-4 h-4 transition-colors duration-200 ${
                        isActive("/alojamientos") ? "text-[#8B8C6E]" : "text-gray-400"
                      }`}
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
                    onClick={() => setIsServiciosFromAlojamientos(true)}
                    className={(isActive("/servicios") && isServiciosFromAlojamientos ? activeLink : inactiveLink) + " flex items-center gap-2 py-2 text-base hover:text-[#8B8C6E] transition-colors"}
                  >
                    <svg 
                      className={`w-4 h-4 transition-colors duration-200 ${
                        isActive("/servicios") && isServiciosFromAlojamientos ? "text-[#8B8C6E]" : "text-gray-400"
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
              onClick={() => setIsServiciosFromAlojamientos(false)}
              className={(isActive("/servicios") && !isServiciosFromAlojamientos ? activeLink : inactiveLink) + " px-2 py-2 text-base"}
            >
              SERVICIOS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
