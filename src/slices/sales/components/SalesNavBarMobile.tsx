import { useEffect, useState } from "react"
import { useDetailNavigation } from "@/hooks/useDetailNavigation"
import { useSectionScroll, type SectionConfig } from "@/hooks/useSectionScroll"

const SECTIONS: SectionConfig[] = [
  { id: "fotos", label: "Fotos" },
  { id: "detalles", label: "Detalles" },
  { id: "ubicacion", label: "Ubicación" },
]

interface SalesNavBarMobileProps {
  propertyName?: string
}

export function SalesNavBarMobile({ propertyName = "Propiedad" }: SalesNavBarMobileProps) {
  const { handleGoBack, handleShare } = useDetailNavigation({
    backRoute: "/ventas",
    propertyName: propertyName,
  })

  const { scrollToSection } = useSectionScroll({
    sections: SECTIONS,
    scrollThreshold: 200,
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setShowDrawer(true)
      const t = setTimeout(() => {
        document.body.style.overflow = "hidden"
      }, 50)
      return () => clearTimeout(t)
    } else {
      setShowDrawer(false)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  /**
   * Scroll a una sección específica
   */
  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId)
    closeMenu()
  }

  const handleContactScroll = () => {
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "start" })
      window.scrollBy(0, -100)
    }
    closeMenu()
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <div className="mx-auto max-w-[1300px] mt-2 px-4">
          <div className="rounded-full px-4 transition-all duration-300 bg-white/85 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between h-14 gap-4">
              {/* Izquierda: Botón Atrás */}
              <button
                onClick={handleGoBack}
                title="Volver atrás"
                className="
                  p-2 rounded-lg text-gray-700
                  hover:bg-gray-100 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#52655B]
                "
                aria-label="Volver atrás"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Centro: Botón Contactar */}
              <button
                onClick={handleContactScroll}
                className="
                  px-4 py-1.5 rounded-full
                  bg-[#52655B] text-white
                  font-medium text-xs
                  hover:bg-[#3d4d45] transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#52655B] focus:ring-offset-2
                  whitespace-nowrap
                "
              >
                Contactar
              </button>

              {/* Derecha: Compartir + Hamburguesa */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  title="Compartir"
                  className="
                    p-2 rounded-lg text-gray-700
                    hover:bg-gray-100 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[#52655B]
                  "
                  aria-label="Compartir"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.59 13.51l6.83 3.98M15.41 6.49l-6.83 3.98" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  title="Abrir menú"
                  className="
                    p-2 rounded-lg text-gray-700
                    hover:bg-gray-100 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-[#52655B]
                  "
                  aria-label="Abrir menú"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-[200ms] ${
          showDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={closeMenu}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[75vw] max-w-[300px] bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.15)] z-[70] flex flex-col transition-transform duration-[220ms] ease-out ${
          showDrawer
            ? "translate-x-0 visible pointer-events-auto"
            : "translate-x-full invisible pointer-events-none"
        }`}
      >
        {/* Header del drawer */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Secciones</h3>
          <button
            onClick={closeMenu}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-gray-500">
              <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navegación de secciones */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className="block w-full text-left py-3 text-[15px] text-gray-800 hover:text-[#52655B] transition-colors border-b border-gray-100 last:border-0"
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
