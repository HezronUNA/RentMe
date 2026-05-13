import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useIcons } from "@/app/context/useIcons"
import { SOCIAL_CONFIG, buildWhatsAppHref } from "@/utils/socialMediaConfig"
import type { UseNavbar } from "@/hooks/useNavbar"

const Logo = "https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png"

type Props = {
  nav: UseNavbar
}

export default function MobileHeader({ nav }: Props) {
  const Icons = useIcons()
  const {
    open,
    setOpen,
  } = nav

  const [isAnimating, setIsAnimating] = useState(false)
  const [serviciosDropdownOpen, setServiciosDropdownOpen] = useState(false)

  // Deshabilitar scroll cuando el navbar está abierto
  useEffect(() => {
    if (open) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 400)
      document.body.style.overflow = "unset"
      return () => clearTimeout(timer)
    }
  }, [open])

  const hrefFromEntry = (entry: any) => {
    return entry.platform === "whatsapp"
      ? buildWhatsAppHref(entry.phone || "", entry.message)
      : entry.url || "#"
  }

  return (
    <div className="md:hidden w-full relative">
      {/* Header con logo y hamburguesa */}
      <div className="mx-auto max-w-screen-2xl px-4 relative z-50">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" aria-label="Ir al inicio" onClick={() => setOpen(false)}>
            <img src={Logo} alt="Logo RentMe" className="h-14 w-14 object-contain" />
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-[#52655B]/10 transition-all duration-300 group"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-7 w-7 text-[#52655B] transition-all duration-500"
            >
              {open ? (
                // X cuando está abierto
                <>
                  <path
                    d="M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <path
                    d="M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </>
              ) : (
                // Hamburguesa cuando está cerrado
                <>
                  <path
                    d="M3 6h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <path
                    d="M3 12h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <path
                    d="M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil fullscreen */}
      {isAnimating && (
        <div 
          className={`fixed inset-0 z-40 ${
            open 
              ? "navbar-enter" 
              : "navbar-exit"
          } pointer-events-auto`}
          style={{
            background: 'linear-gradient(135deg, rgba(245, 245, 245, 0.98) 0%, rgba(235, 235, 238, 0.99) 100%)'
          }}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
          <nav className="h-full flex flex-col items-center justify-between gap-2 pt-32 pb-12 px-8 overflow-y-auto">
            {/* Items del menú */}
            <div className="flex flex-col items-center gap-4 flex-1 w-full">
              {/* TOURS */}
              <div className="menu-item flex flex-col items-center gap-2 w-full">
                <Link
                  to="/tours"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                >
                  TOURS
                </Link>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent shadow-sm"></div>
              </div>

              {/* VENTAS */}
              <div className="menu-item flex flex-col items-center gap-2 w-full">
                <Link
                  to="/ventas"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                >
                  VENTAS
                </Link>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent shadow-sm"></div>
              </div>

              {/* ALOJAMIENTOS */}
              <div className="menu-item flex flex-col items-center gap-2 w-full">
                <Link
                  to="/alojamientos"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                >
                  ALOJAMIENTOS
                </Link>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent shadow-sm"></div>
              </div>

              {/* SOBRE NOSOTROS */}
              <div className="menu-item flex flex-col items-center gap-2 w-full">
                <Link
                  to="/nosotros"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                >
                  SOBRE NOSOTROS
                </Link>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent shadow-sm"></div>
              </div>

              {/* SERVICIOS DROPDOWN */}
              <div className="menu-item flex flex-col items-center gap-0 w-full">
                {/* Botón SERVICIOS con flecha */}
                <div className="flex items-center gap-2 w-full justify-center">
                  <Link
                    to="/servicios"
                    onClick={() => {
                      nav.setIsServiciosFromAlojamientos(false)
                      setOpen(false)
                    }}
                    className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                  >
                    SERVICIOS
                  </Link>
                  <button
                    onClick={() => setServiciosDropdownOpen(!serviciosDropdownOpen)}
                    className="p-1 text-black hover:text-black/70"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        serviciosDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                </div>

                {/* Separador */}
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent shadow-sm"></div>

                {/* Contenedor del Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 w-full ${
                    serviciosDropdownOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="w-full py-2 flex flex-col items-center gap-0">
                    {/* Administración */}
                    <a
                      href="/servicios#gestion-alojamientos"
                      onClick={() => {
                        nav.setIsServiciosFromAlojamientos(false)
                        setOpen(false)
                        setServiciosDropdownOpen(false)
                      }}
                      className="text-lg font-medium text-black/70 hover:text-black/90 transition-all duration-200 tracking-wide py-2 hover:scale-105 active:scale-95"
                    >
                      Administración
                    </a>

                    {/* Venta */}
                    <a
                      href="/servicios#venta-propiedades"
                      onClick={() => {
                        nav.setIsServiciosFromAlojamientos(false)
                        setOpen(false)
                        setServiciosDropdownOpen(false)
                      }}
                      className="text-lg font-medium text-black/70 hover:text-black/90 transition-all duration-200 tracking-wide py-2 hover:scale-105 active:scale-95"
                    >
                      Venta
                    </a>

                    {/* Fotografía */}
                    <a
                      href="/servicios#fotografia-video"
                      onClick={() => {
                        nav.setIsServiciosFromAlojamientos(false)
                        setOpen(false)
                        setServiciosDropdownOpen(false)
                      }}
                      className="text-lg font-medium text-black/70 hover:text-black/90 transition-all duration-200 tracking-wide py-2 hover:scale-105 active:scale-95"
                    >
                      Fotografía
                    </a>

                    {/* Limpieza */}
                    <a
                      href="/servicios#limpieza-profesional"
                      onClick={() => {
                        nav.setIsServiciosFromAlojamientos(false)
                        setOpen(false)
                        setServiciosDropdownOpen(false)
                      }}
                      className="text-lg font-medium text-black/70 hover:text-black/90 transition-all duration-200 tracking-wide py-2 hover:scale-105 active:scale-95"
                    >
                      Limpieza
                    </a>
                  </div>
                </div>
              </div>

              {/* ADMINISTRACIÓN */}
              <div className="menu-item flex flex-col items-center gap-2">
                <Link
                  to="/administracion"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-black hover:text-black/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
                >
                  ADMINISTRACIÓN
                </Link>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center gap-6 w-full items-center">
              {SOCIAL_CONFIG.map((social) => {
                const Icon = Icons[social.platform as keyof typeof Icons]
                const href = hrefFromEntry(social)
                const label = social.label ?? social.platform

                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="text-black hover:text-black/70 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </div>
          </nav>
          </div>
        </div>
      )}
    </div>
  )
}


