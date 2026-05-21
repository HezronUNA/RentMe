import { useEffect, useRef, useState } from "react"

export interface SectionConfig {
  id: string
  label: string
}

interface UseSectionScrollOptions {
  sections: SectionConfig[]
  scrollThreshold?: number
}

export function useSectionScroll({
  sections,
  scrollThreshold = 200,
}: UseSectionScrollOptions) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

      if (visible.length > 0) {
        const topMost = visible.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev,
        )
        if (topMost.boundingClientRect.top <= scrollThreshold) {
          setActiveSection(topMost.target.id)
        }
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: `-${scrollThreshold}px 0px -40% 0px`,
      threshold: 0,
    })

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [sections, scrollThreshold])

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
