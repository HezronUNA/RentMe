import { Link, useNavigate } from "@tanstack/react-router"
import { useRef, useState, useEffect } from "react"
import type { UseNavbar } from "@/hooks/useNavbar"
import { Small } from "@/components/ui/Typography"
import { Building2, Camera, Sparkles, Briefcase, ArrowRight, LayoutGrid } from "lucide-react"

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

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

              <Link to="/alojamientos" className={linkClass(nav, scrolled, "/alojamientos")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">ALOJAMIENTOS</Small>
              </Link>

              <Link to="/nosotros" className={linkClass(nav, scrolled, "/nosotros")}>
                <Small className="uppercase tracking-wide whitespace-nowrap text-xs">SOBRE NOSOTROS</Small>
              </Link>

              {/* SERVICIOS DROPDOWN (estructura basada en ejemplo proporcionado, colores originales preservados) */}
              <div className="relative py-1" ref={dropdownRef}>
                {/* Trigger */}
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  className={serviciosLinkClass(nav, scrolled) + (dropdownOpen ? (transparent ? " !text-white !bg-white/15" : " !text-[#2f3a35] !bg-[#52655B]/10") : "")}
                >
                  <Small className="uppercase tracking-wide whitespace-nowrap text-xs flex items-center gap-1">
                    SERVICIOS
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Small>
                </button>

                {/* Content (mimicking DropdownMenuContent) */}
                <div
                  role="menu"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[280px] z-50 origin-top transition-all duration-300 ease-out ${
                    dropdownOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none"
                  }`}
                >
                  {/* (Label removed as requested) */}

                  {/* Panel body */}
                  <div className={`rounded-[20px] mt-2 p-0.5 bg-white ring-1 ring-[#52655B]/10 border border-[#e9efe9] shadow-[0_18px_36px_rgba(82,101,91,0.07)] backdrop-blur-sm overflow-hidden`}>
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#f3f2ee] border-b border-[#52655B]/08">
                      <div className="bg-[#52655B] rounded-[9px] w-7 h-7 flex items-center justify-center shrink-0">
                        <Briefcase size={15} color="#c8d9d0" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#52655B]">Nuestros servicios</p>
                        <p className="text-[11px] text-[#8a9e95]">Soluciones para propietarios</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col divide-y divide-[#e6efe6]">
                      {[
                        { label: "Administración", sub: "de propiedades", href: "/servicios#gestion-alojamientos", icon: Building2 },
                        { label: "Fotografía", sub: "y Video", href: "/servicios#fotografia-video", icon: Camera },
                        { label: "Limpieza", sub: "profesional", href: "/servicios#limpieza-profesional", icon: Sparkles },
                      ].map((item, index) => {
                        const IconComp = item.icon
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setDropdownOpen(false)}
                            role="menuitem"
                            tabIndex={0}
                            style={{ transitionDelay: dropdownOpen ? `${index * 45}ms` : "0ms" }}
                            className="group/item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md border border-transparent transition-all duration-200 ease-out hover:bg-[#52655B]/5 hover:border-[#52655B]/10"
                          >
                            <div className="w-[34px] h-[34px] rounded-[10px] bg-[#52655B]/08 flex items-center justify-center shrink-0 transition-colors duration-150 group-hover/item:bg-[#52655B]/15">
                              <IconComp size={17} color="#52655B" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#52655B]">{item.label}</p>
                              <p className="text-xs text-[#52655B]/60 mt-0.5">{item.sub}</p>
                            </div>
                            <ArrowRight size={14} color="#8a9e95" className="opacity-0 transition-all duration-150 group-hover/item:opacity-100 group-hover/item:translate-x-[2px]" />
                          </Link>
                        )
                      })}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#52655B]/09 mx-3 my-0.5" />

                    {/* Footer */}
                    <div className="mx-1.5 mb-1.5">
                      <Link
                        to="/servicios"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center justify-between w-full rounded-xl border border-[#52655B]/13 bg-[#52655B]/04 px-3.5 py-2.5 transition-colors duration-150 hover:bg-[#52655B]/09"
                      >
                        <div className="flex items-center gap-2">
                          <LayoutGrid size={15} color="#52655B" />
                          <span className="text-[11px] font-medium text-[#52655B] tracking-wide">Ver todos los servicios</span>
                        </div>
                        <ArrowRight size={13} color="#a0b5a8" />
                      </Link>
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