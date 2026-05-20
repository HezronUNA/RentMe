import { useDetailNavigation } from "@/hooks/useDetailNavigation"

interface SalesActionBarProps {
  propertyName?: string
  onContactClick?: () => void
}

export function SalesActionBar({ propertyName = "Propiedad", onContactClick }: SalesActionBarProps) {
  const { handleGoBack, handleShare } = useDetailNavigation({
    backRoute: "/ventas",
    propertyName: propertyName,
  })

  /**
   * Maneja el scroll suave hacia el formulario de contacto
   */
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick()
      return
    }

    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      // Habilitar scroll smooth si no está habilitado
      document.documentElement.style.scrollBehavior = "smooth"
      
      // Calcular posición con offset para evitar que quede bajo el navbar
      const elementPosition = contactForm.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 100 // 100px de offset desde la parte superior
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    } else {
      console.warn("Elemento de formulario de contacto no encontrado (id='contact-form')")
    }
  }

  const actions = [
    {
      id: "back",
      label: "Volver atrás",
      onClick: handleGoBack,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contactar",
      onClick: handleContactClick,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "share",
      label: "Compartir",
      onClick: handleShare,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51l6.83 3.98M15.41 6.49l-6.83 3.98" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <aside
      className="
        hidden md:flex
        fixed left-4 top-1/2 -translate-y-1/2 z-50
        flex-col gap-3
        animate-in fade-in slide-in-from-left-4 duration-700
      "
      aria-label="Acciones de la propiedad"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          title={action.label}
          className="
            p-3 rounded-lg
            bg-white hover:bg-gray-50
            text-gray-700 hover:text-[#52655B]
            shadow-lg hover:shadow-xl
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#52655B]
          "
          aria-label={action.label}
        >
          {action.icon}
        </button>
      ))}
    </aside>
  )
}
