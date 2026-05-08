import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { buildWhatsAppHref, SOCIAL_CONFIG } from "@/utils/socialMediaConfig";
import { createReservaServicio } from "@/services/reservasServicios.service";
import { sanitizeForStorage } from "@/utils/sanitize";
import { toast } from "sonner";

export type ReservationFormData = {
  nombre: string;
  correo: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

const INITIAL_FORM: ReservationFormData = {
  nombre: "",
  correo: "",
  telefono: "",
  servicio: "",
  mensaje: "",
};

const DEFAULT_SERVICES = [
  "Limpieza profesional",
  "Fotografia y video profesional",
  "Venta de propiedades",
];
const DEFAULT_PLANS = [
  "Coanfitrión en Airbnb",
  "Promoción en mis plataformas",
  "Administración Total",
];

const SERVICE_RATE_LIMIT_WINDOW_MS = 60_000;

function getServiceCooldownKey(email: string, telefono: string) {
  return `service-reserve-last-send:${email.toLowerCase()}:${telefono}`;
}

function getRemainingCooldownMs(key: string) {
  const lastSentAtRaw = localStorage.getItem(key);
  if (!lastSentAtRaw) return 0;

  const lastSentAt = Number(lastSentAtRaw);
  if (!Number.isFinite(lastSentAt)) return 0;

  const elapsed = Date.now() - lastSentAt;
  return Math.max(0, SERVICE_RATE_LIMIT_WINDOW_MS - elapsed);
}

function buildWhatsappMessage(formData: ReservationFormData) {
  return [
    "Hola, me gustaría reservar un servicio.",
    "",
    `Nombre: ${formData.nombre}`,
    `Telefono: ${formData.telefono}`,
    `Correo: ${formData.correo}`,
    `Servicio interesado: ${formData.servicio}`,
    formData.mensaje ? `Consulta: ${formData.mensaje}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function useServiceReservationForm() {
  const selectedService = useMemo(() => {
    const query = new URLSearchParams(window.location.search);
    return query.get("servicio")?.trim() ?? "";
  }, []);

  const [formData, setFormData] = useState<ReservationFormData>({
    ...INITIAL_FORM,
    servicio: selectedService,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappPhone =
    SOCIAL_CONFIG.find((entry) => entry.platform === "whatsapp")?.phone ?? "50683888231";

  const onFieldChange =
    (field: keyof ReservationFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.nombre || !formData.correo || !formData.telefono || !formData.servicio) {
      setErrorMessage("Completá los campos obligatorios para enviar la solicitud.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Sanitize form data before sending
      const safeData = {
        nombre: sanitizeForStorage(formData.nombre) ?? "",
        correo: sanitizeForStorage(formData.correo) ?? "",
        telefono: sanitizeForStorage(formData.telefono) ?? "",
        servicio: sanitizeForStorage(formData.servicio) ?? "",
        mensaje: sanitizeForStorage(formData.mensaje) ?? "",
      };

      const cooldownKey = getServiceCooldownKey(safeData.correo, safeData.telefono);
      const remainingCooldownMs = getRemainingCooldownMs(cooldownKey);

      if (remainingCooldownMs > 0) {
        const remainingSeconds = Math.ceil(remainingCooldownMs / 1000);
        const rateLimitMessage = `Debes esperar ${remainingSeconds} segundos antes de volver a enviar.`;
        setErrorMessage(rateLimitMessage);
        toast.error("⏱️ Límite de solicitudes", {
          description: rateLimitMessage,
          duration: 5000,
        });
        return;
      }

      const nowTs = Date.now();
      localStorage.setItem(cooldownKey, nowTs.toString());

      try {
        await createReservaServicio(safeData);
      } catch (error) {
        const isRateLimitError = error instanceof Error && error.message.includes("rate_limit_exceeded");
        if (!isRateLimitError) {
          localStorage.removeItem(cooldownKey);
        }
        throw error;
      }

      const whatsappMessage = buildWhatsappMessage(formData);
      const whatsappLink = buildWhatsAppHref(whatsappPhone, whatsappMessage);
      window.open(whatsappLink, "_blank", "noopener,noreferrer");

      setFormData({
        ...INITIAL_FORM,
        servicio: selectedService,
      });
    } catch (error) {
      console.error("Error creando reserva de servicio:", error);

      let errorMessage = error instanceof Error ? error.message : "No pudimos enviar tu solicitud. Intentá de nuevo en unos minutos.";
      let isRateLimit = false;

      if (typeof errorMessage === "string" && errorMessage.includes("rate_limit_exceeded")) {
        isRateLimit = true;
        errorMessage = "Demasiadas solicitudes. Por favor espera un minuto antes de intentar de nuevo.";
      }

      setErrorMessage(errorMessage);

      toast.error(isRateLimit ? "⏱️ Límite de solicitudes" : "Error al enviar solicitud", {
        description: errorMessage,
        duration: isRateLimit ? 6000 : 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    errorMessage,
    onFieldChange,
    handleSubmit,
    availableServices: DEFAULT_SERVICES,
    availablePlans: DEFAULT_PLANS
  };
}
