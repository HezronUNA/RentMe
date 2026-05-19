import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

interface DetailNavigationOptions {
  backRoute: string
  reservationFormId?: string
  propertyName?: string
}

export function useDetailNavigation({
  backRoute,
  reservationFormId = "reservation-form",
  propertyName = "Propiedad",
}: DetailNavigationOptions) {
  const navigate = useNavigate()

  /**
   * Navega hacia atrás
   */
  const handleGoBack = () => {
    navigate({ to: backRoute })
  }

  /**
   * Scroll suave al formulario de reserva
   */
  const handleReserveClick = () => {
    const reservationForm = document.getElementById(reservationFormId)
    if (reservationForm) {
      reservationForm.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      console.warn(`Elemento de formulario no encontrado (id='${reservationFormId}')`)
      toast.error("No se pudo encontrar el formulario de reserva")
    }
  }

  /**
   * Compartir propiedad usando Web Share API o copiar enlace
   */
  const handleShare = async () => {
    const url = window.location.href

    const shareData = {
      title: propertyName,
      text: `¡Mira esta propiedad que encontré en DMR Rentals!\n\n${url}`,
      url: url,
    }

    try {
      // Intenta usar Web Share API (mobile)
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copiar enlace
        await navigator.clipboard.writeText(shareData.text)
        toast.success("¡Enlace copiado!")
      }
    } catch (error) {
      // Ignorar AbortError (usuario canceló)
      if (error instanceof Error && error.name === "AbortError") {
        return
      }

      // Si Clipboard API falla, usar method antiguo
      try {
        const input = document.createElement("input")
        input.value = shareData.text
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
        toast.success("¡Enlace copiado!")
      } catch (_err) {
        console.error("Error al copiar enlace:", _err)
        toast.error("No se pudo compartir")
      }
    }
  }

  return {
    handleGoBack,
    handleReserveClick,
    handleShare,
  }
}
