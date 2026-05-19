import { useDetailNavigation } from "@/hooks/useDetailNavigation"
import { useSectionScroll, type SectionConfig } from "@/hooks/useSectionScroll"

const SECTIONS: SectionConfig[] = [
  { id: "fotos", label: "Fotos" },
  { id: "detalle", label: "Detalle" },
  { id: "servicios", label: "Servicios" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "resenas", label: "Reseñas" },
]

interface AccommodationNavBarDesktopProps {
  accommodationName?: string
}

export function AccommodationNavBarDesktop({ accommodationName = "Alojamiento" }: AccommodationNavBarDesktopProps) {
  const { handleGoBack, handleReserveClick, handleShare } = useDetailNavigation({
    backRoute: "/alojamientos",
    propertyName: accommodationName,
  })

  const { activeSection, scrollToSection } = useSectionScroll({
    sections: SECTIONS,
    scrollThreshold: 200,
  })

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      <div className="mx-auto max-w-[1300px] mt-2 px-4">
        <div className="rounded-full px-8 transition-all duration-300 bg-white/85 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between h-16 gap-6">
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

            {/* Centro: Navegación */}
            <div className="flex items-center gap-6">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-sm font-medium transition-colors
                    pb-1 border-b-2
                    ${activeSection === section.id
                      ? "text-[#52655B] border-b-[#52655B]"
                      : "text-gray-600 border-b-transparent hover:text-gray-900"
                    }
                  `}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Derecha: Compartir + Reservar */}
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
                onClick={handleReserveClick}
                className="
                  px-6 py-2 rounded-full
                  bg-[#52655B] text-white
                  font-medium text-sm
                  hover:bg-[#3d4d45] transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#52655B] focus:ring-offset-2
                  whitespace-nowrap
                "
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
