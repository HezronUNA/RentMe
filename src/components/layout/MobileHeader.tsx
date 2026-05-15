import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useIcons } from "@/app/context/useIcons"
import { SOCIAL_CONFIG, buildWhatsAppHref } from "@/utils/socialMediaConfig"
import type { UseNavbar } from "@/hooks/useNavbar"

const Logo = "https://res.cloudinary.com/dxrzwnjee/image/upload/v1778856029/yqzckajrawylryjuefi4.avif"

type Props = {
  nav: UseNavbar
  scrolled: boolean
}

export default function MobileHeader({ nav, scrolled }: Props) {
  const Icons = useIcons()
  const { open, setOpen } = nav
  const navigate = useNavigate()
  const handleCTA = () => {
    navigate({ to: "/alojamientos" })
  }
  const transparent = nav.pathname === "/" && !scrolled

  const [showDrawer, setShowDrawer] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<"propiedades" | "servicios" | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      requestAnimationFrame(() => setShowDrawer(true))
    } else {
      setShowDrawer(false)
      document.body.style.overflow = "unset"
    }
  }, [open])

  const close = () => setOpen(false)

  const toggleAccordion = (name: "propiedades" | "servicios") => {
    setActiveAccordion((prev) => (prev === name ? null : name))
  }

  const hrefFromEntry = (entry: any) => {
    return entry.platform === "whatsapp"
      ? buildWhatsAppHref(entry.phone || "", entry.message)
      : entry.url || "#"
  }

  return (
    <div className="md:hidden">
      {/* Header bar — pill flotante */}
      <div className="relative z-50 mx-auto max-w-[calc(100%-2rem)] mt-3 ">
        <div className={`rounded-full px-5 transition-all duration-300 ease-out ${
          transparent
            ? "bg-white/0 backdrop-blur-none shadow-none"
            : "bg-white/90 backdrop-blur-xl shadow-sm"
        }`}>
          <div className="h-14 flex items-center justify-between">
            <Link to="/" aria-label="Ir al inicio" onClick={close}>
              <img src={Logo} alt="Logo RentMe" className={`h-10 w-10 object-contain transition-all duration-300 ${
                transparent ? "brightness-0 invert" : ""
              }`} />
            </Link>
            {nav.pathname === "/" && (
              <button
                type="button"
                onClick={handleCTA}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer whitespace-nowrap ${
                  transparent
                    ? "bg-white/20 border border-white/30 text-white hover:bg-white/10"
                    : "bg-[#52655B] text-white hover:bg-[#52655B]/90 shadow-lg"
                }`}
              >
                Reservar ahora →
              </button>
            )}
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-full hover:bg-[#52655B]/10 transition-all duration-300 group"
            >
              <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 transition-all duration-500 ${
                transparent ? "text-white" : "text-[#52655B]"
              }`}>
                {open ? (
                  <>
                    <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-[350ms] ${
          showDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={close}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[75vw] max-w-[300px] bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.15)] z-[70] flex flex-col transition-transform duration-[350ms] ease-in-out ${
          showDrawer
            ? "translate-x-0 visible pointer-events-auto"
            : "translate-x-full invisible pointer-events-none"
        }`}
      >
            {/* Logo + Close */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 pt-5 pb-3">
              <img src={Logo} alt="Logo" className="h-10 w-10 object-contain" />
                <button
                type="button"
                onClick={close}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-gray-500">
                  <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-5 py-2">
              {/* 1. Tours */}
              <div className="border-b border-gray-100">
                <Link
                  to="/tours"
                  onClick={close}
                  className="block py-3 text-[15px] text-gray-800 hover:text-[#52655B] transition-colors"
                >
                  Tours
                </Link>
              </div>

              {/* 2. Propiedades (accordion) */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleAccordion("propiedades")}
                  className="flex items-center justify-between w-full py-3 text-[15px] text-gray-800 hover:text-[#52655B] transition-colors"
                >
                  Propiedades
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      activeAccordion === "propiedades" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    activeAccordion === "propiedades" ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="pb-2 pl-4 space-y-1">
                    <Link
                      to="/alojamientos"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Alojamientos
                    </Link>
                    <Link
                      to="/ventas"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Propiedades en Venta
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3. Sobre Nosotros */}
              <div className="border-b border-gray-100">
                <Link
                  to="/nosotros"
                  onClick={close}
                  className="block py-3 text-[15px] text-gray-800 hover:text-[#52655B] transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </div>

              {/* 4. Servicios (accordion) */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleAccordion("servicios")}
                  className="flex items-center justify-between w-full py-3 text-[15px] text-gray-800 hover:text-[#52655B] transition-colors"
                >
                  Servicios
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      activeAccordion === "servicios" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    activeAccordion === "servicios" ? "max-h-80" : "max-h-0"
                  }`}
                >
                  <div className="pb-2 pl-4 space-y-1">
                    <Link
                      to="/administracion"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Administración
                    </Link>
                    <a
                      href="/servicios#limpieza-profesional"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Limpieza Profesional
                    </a>
                    <a
                      href="/servicios#venta-propiedades"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Ventas
                    </a>
                    <a
                      href="/servicios#fotografia-video"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Fotografía y Video
                    </a>
                    <a
                      href="/servicios#desarrollo-tecnologico"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Desarrollo Tecnológico
                    </a>
                    <a
                      href="/servicios#contabilidad-asesoria"
                      onClick={close}
                      className="block py-2 text-[13px] text-gray-600 hover:text-[#52655B] transition-colors"
                    >
                      Contabilidad y Asesoría
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Social icons */}
            <div className="flex-shrink-0 px-5 py-5 border-t border-gray-100">
              <div className="flex justify-center gap-5">
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
                      className="text-gray-600 hover:text-[#52655B] transition-all duration-300 hover:scale-110"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
    </div>
  )
}


