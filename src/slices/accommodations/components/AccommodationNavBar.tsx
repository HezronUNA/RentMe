import { useEffect, useState } from "react";
import { toast } from "sonner";

type SectionId = "fotos" | "detalle" | "servicios" | "ubicacion" | "resenas";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "fotos", label: "Fotos" },
  { id: "detalle", label: "Detalle" },
  { id: "servicios", label: "Servicios" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "resenas", label: "Reseñas" },
];

export function AccommodationNavBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("fotos");

  /**
   * Detectar scroll para mostrar/ocultar navbar
   */
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar navbar después de 80px de scroll
      setIsVisible(window.scrollY > 80);

      // Detectar sección activa
      const sections = SECTIONS.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sections[i].element;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Navegar a una sección
   */
  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  /**
   * Scroll al formulario de reserva
   */
  const handleReserveClick = () => {
    const reservationForm = document.getElementById("reservation-form");
    if (reservationForm) {
      reservationForm.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      toast.error("No se pudo encontrar el formulario de reserva");
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        bg-white border-b border-gray-200
        backdrop-blur-sm bg-white/95
        transition-all duration-500
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="px-4 md:px-8 lg:px-16 py-7">
        <div className="flex items-center justify-between gap-6 w-full max-w-7xl mx-auto">
            {/* Centro: Navegación */}
            <div className="flex items-center gap-8 flex-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-base font-medium transition-colors
                    pb-2 border-b-2
                    ${
                      activeSection === section.id
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

            {/* Derecha: Botón Reservar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReserveClick}
                className="
                  px-8 py-3 rounded-lg
                  bg-[#52655B] text-white
                  font-medium text-base
                  hover:bg-[#3d4d45] transition-colors
                  focus:outline-none focus:ring-2 focus:ring-[#52655B] focus:ring-offset-2
                "
              >
                Reservar
              </button>
            </div>
        </div>
      </div>
    </nav>
  );
}
