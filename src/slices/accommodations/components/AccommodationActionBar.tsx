import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface AccommodationActionBarProps {
  accommodationName: string;
  onReserveClick?: () => void;
}

export function AccommodationActionBar({
  accommodationName,
  onReserveClick,
}: AccommodationActionBarProps) {
  const navigate = useNavigate();

  /**
   * Maneja el scroll suave hacia el formulario de reserva
   */
  const handleReserveClick = () => {
    if (onReserveClick) {
      onReserveClick();
      return;
    }

    const reservationForm = document.getElementById("reservation-form");

    if (reservationForm) {
      reservationForm.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn("Elemento de formulario de reserva no encontrado (id='reservation-form')");
      toast.error("No se pudo encontrar el formulario de reserva");
    }
  };

  /**
   * Maneja el compartir la propiedad
   */
  const handleShare = async () => {
    try {
      const shareData = {
        title: accommodationName,
        text: `Mira este alojamiento: ${accommodationName}`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("¡Enlace copiado al portapapeles!");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      if (error instanceof Error && error.message.includes("Clipboard")) {
        try {
          const input = document.createElement("input");
          input.value = window.location.href;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          document.body.removeChild(input);
          toast.success("¡Enlace copiado al portapapeles!");
        } catch (_err) {
          console.error("Error al copiar enlace:", _err);
          toast.error("No se pudo copiar el enlace");
        }
      } else {
        console.error("Error al compartir:", error);
        toast.error("No se pudo compartir la propiedad");
      }
    }
  };

  /**
   * Maneja el regreso a la página de alojamientos
   */
  const handleGoBack = () => {
    navigate({ to: "/alojamientos" });
  };

  const actions = [
    {
      id: "back",
      label: "Volver atrás",
      onClick: handleGoBack,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "reserve",
      label: "Reservar",
      onClick: handleReserveClick,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5"
        >
          <path
            d="M8 7V3m8 4V3m-9 8h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "share",
      label: "Compartir",
      onClick: handleShare,
      icon: (
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
      ),
    },
  ];

  return (
    <aside
      className="
        fixed left-4 top-1/2 -translate-y-1/2 z-50
        flex flex-col gap-3
        animate-in fade-in slide-in-from-left-4 duration-700
      "
      aria-label="Acciones del alojamiento"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          title={action.label}
          className={`
            group relative grid place-items-center
            bg-[#52655B] text-white rounded-full
            w-12 h-12 shadow-lg
            transition-transform duration-200
            hover:scale-105 focus:scale-105
            focus:outline-none focus:ring-2 focus:ring-[#52655B]/60
          `}
          aria-label={action.label}
        >
          {action.icon}

          {/* Tooltip custom */}
          <span
            className="
              pointer-events-none absolute left-full ml-3
              whitespace-nowrap rounded-md bg-black/80 text-white text-xs px-2 py-1.5
              opacity-0 translate-x-2
              transition-all duration-200
              group-hover:opacity-100 group-hover:translate-x-0
              group-focus:opacity-100 group-focus:translate-x-0
              flex items-center justify-center
            "
            role="tooltip"
          >
            {action.label}
          </span>

          {/* Halo animado */}
          <span
            className="
              absolute inset-0 rounded-full
              ring-0 ring-[#52655B]/40
              transition-all duration-300
              group-hover:ring-8 group-focus:ring-8
            "
            aria-hidden
          />
        </button>
      ))}
    </aside>
  );
}
