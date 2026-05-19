import { useEffect, useState } from "react"

export interface SectionConfig {
  id: string
  label: string
}

interface UseSectionScrollOptions {
  sections: SectionConfig[]
  scrollThreshold?: number
}

/**
 * Hook para detectar la sección activa durante el scroll
 * y manejar scroll suave a secciones
 */
export function useSectionScroll({
  sections,
  scrollThreshold = 200,
}: UseSectionScrollOptions) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")

  /**
   * Detectar sección activa al scrollear
   */
  useEffect(() => {
    const handleScroll = () => {
      // Iterar de atrás hacia adelante para obtener la última sección visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)

        if (element) {
          const rect = element.getBoundingClientRect()
          // Si el elemento está a menos de scrollThreshold del top, es la sección activa
          if (rect.top <= scrollThreshold) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, scrollThreshold])

  /**
   * Scroll suave a una sección específica
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
    }
  }

  return {
    activeSection,
    scrollToSection,
  }
}
