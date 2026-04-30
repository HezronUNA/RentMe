import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type { UseNavbar } from "@/hooks/useNavbar"

const Logo = "https://i.ibb.co/fGdD3rxd/Chat-GPT-Image-18-nov-2025-02-02-38-p-m.png"

type Props = {
  nav: UseNavbar
}

export default function MobileHeader({ nav }: Props) {
  const {
    open,
    setOpen,
  } = nav

  const [isAnimating, setIsAnimating] = useState(false)

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

  return (
    <div className="md:hidden w-full">
      {/* Header con logo y hamburguesa */}
      <div className="mx-auto max-w-screen-2xl px-4">
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
              style={{
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {!open ? (
                // Hamburguesa
                <>
                  <path
                    d="M3 6h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500 origin-center"
                    style={{
                      transform: open ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
                    }}
                  />
                  <path
                    d="M3 12h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`transition-all duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <path
                    d="M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-500 origin-center"
                    style={{
                      transform: open ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
                    }}
                  />
                </>
              ) : (
                // X
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
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil fullscreen */}
      {isAnimating && (
        <div 
          className={`fixed inset-0 top-16 z-40 lumiflex-background ${
            open 
              ? "navbar-enter" 
              : "navbar-exit"
          } backdrop-blur-md pointer-events-none`}
          style={{
            background: `
              radial-gradient(circle at 15% 40%, rgba(107, 127, 111, 0.55) 0%, transparent 45%),
              radial-gradient(circle at 85% 80%, rgba(61, 77, 68, 0.45) 0%, transparent 50%),
              radial-gradient(circle at 50% 15%, rgba(82, 101, 91, 0.5) 0%, transparent 45%),
              radial-gradient(circle at 75% 25%, rgba(79, 90, 84, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 25% 75%, rgba(100, 115, 105, 0.45) 0%, transparent 45%),
              linear-gradient(135deg, rgba(245, 245, 245, 0.95) 0%, rgba(250, 250, 248, 0.98) 100%)
            `
          }}
        >
          <nav className="h-full flex flex-col items-center justify-center gap-2 pb-20 pointer-events-auto">
            {/* TOURS */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/tours"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                TOURS
              </Link>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-sm"></div>
            </div>

            {/* VENTAS */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/ventas"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                VENTAS
              </Link>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-sm"></div>
            </div>

            {/* ALOJAMIENTOS */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/alojamientos"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                ALOJAMIENTOS
              </Link>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-sm"></div>
            </div>

            {/* SOBRE NOSOTROS */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/nosotros"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                SOBRE NOSOTROS
              </Link>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-sm"></div>
            </div>

            {/* SERVICIOS */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/servicios"
                onClick={() => {
                  nav.setIsServiciosFromAlojamientos(false)
                  setOpen(false)
                }}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                SERVICIOS
              </Link>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-sm"></div>
            </div>

            {/* ADMINISTRACIÓN */}
            <div className="menu-item flex flex-col items-center gap-2">
              <Link
                to="/administracion"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white hover:text-white/70 transition-all duration-300 tracking-wide py-3 px-8 hover:scale-105 active:scale-95"
              >
                ADMINISTRACIÓN
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}


