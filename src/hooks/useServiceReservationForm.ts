import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { buildWhatsAppHref, SOCIAL_CONFIG } from "@/utils/socialMediaConfig";
import { createReservaServicio } from "@/services/reservasServicios.service";

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

      await createReservaServicio({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        servicio: formData.servicio,
        mensaje: formData.mensaje,
      });

      const whatsappMessage = buildWhatsappMessage(formData);
      const whatsappLink = buildWhatsAppHref(whatsappPhone, whatsappMessage);
      window.open(whatsappLink, "_blank", "noopener,noreferrer");

      setFormData({
        ...INITIAL_FORM,
        servicio: selectedService,
      });
    } catch (error) {
      console.error("Error creando reserva de servicio:", error);
      setErrorMessage("No pudimos enviar tu solicitud. Intentá de nuevo en unos minutos.");
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
  };
}
